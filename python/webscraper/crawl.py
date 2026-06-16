from urllib.parse import urlparse, urljoin
from bs4 import BeautifulSoup, Tag
from typing import TypedDict
import requests
import asyncio
import aiohttp


class PageData(TypedDict):
    url: str
    heading: str
    first_paragraph: str
    outgoing_links: list[str]
    image_urls: list[str]


def normalize_url(url):
    parsed = urlparse(url)

    _hostname = parsed.hostname or ""
    hostname = _hostname.lower()
    _path = parsed.path or "/"
    path = _path.lower()

    # Remove trailing slash unless it's the root path
    if path != "/" and path.endswith("/"):
        path = path[:-1]

    return hostname + path



def get_heading_from_html(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")

    # Try <h1> first
    h_tag = soup.find("h1")
    if isinstance(h_tag, Tag):
        return h_tag.get_text(strip=True)

    # Fallback to <h2>
    h_tag = soup.find("h2")
    if isinstance(h_tag, Tag):
        return h_tag.get_text(strip=True)

    return ""

def get_first_paragraph_from_html(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")

    # Prefer <main> if present
    main_tag = soup.find("main")
    if isinstance(main_tag, Tag):
        p = main_tag.find("p")
        if isinstance(p, Tag):
            return p.get_text(strip=True)

    # Fallback: first <p> anywhere
    p = soup.find("p")
    if isinstance(p, Tag):
        return p.get_text(strip=True)

    return ""

def get_urls_from_html(html, base_url):
    soup = BeautifulSoup(html, "html.parser")
    results = []
    links = soup.find_all("a")
    for link in links:
        href = link.get("href")
        if href is not None:
            absolute_value = urljoin(base_url, href)
            results.append(absolute_value)

    return results

def get_images_from_html(html, base_url):
    soup = BeautifulSoup(html, "html.parser")
    results = []
    img_tags = soup.find_all("img")
    for img in img_tags:
        src = img.get("src")
        if src is not None:
            absolute_value = urljoin(base_url, src)
            results.append(absolute_value)

    return results

def extract_page_data(html: str, page_url: str) -> PageData:
    return {
        "url": page_url,
        "heading": get_heading_from_html(html),
        "first_paragraph": get_first_paragraph_from_html(html),
        "outgoing_links": get_urls_from_html(html, page_url),
        "image_urls": get_images_from_html(html, page_url),
    }

def get_html(url):
    try:
        response = requests.get(url, headers={"User-Agent": "BootCrawler/1.0"})
    except Exception as e:
        raise Exception(f"network error: {e}")

    if response.status_code >= 400:
        raise Exception(f"got HTTP error: {response.status_code}")
    if "text/html" not in response.headers.get("content-type", ""):
        raise Exception(f"got content type error: {response.status_code}")

    return response.text

def crawl_page(base_url, current_url=None, page_data=None):
    if current_url is None:
        current_url = base_url

    if page_data is None:
        page_data = {}

    parsed_a = urlparse(base_url)
    parsed_b = urlparse(current_url)

    if parsed_a.netloc != parsed_b.netloc:
        print("Domains do not match!")
        return page_data

    normalized_url = normalize_url(current_url)

    if normalized_url in page_data:
        return page_data

    print(f"crawling {current_url}")
    html = safe_get_html(current_url)
    if html is None:
        return page_data

    page_data[normalized_url] = extract_page_data(html, current_url)

    urls = get_urls_from_html(html, base_url)
    for url in urls:
        page_data = crawl_page(base_url, url, page_data)

    return page_data

class AsyncCrawler:
    def __init__(self, base_url, max_concurrency, max_pages):
        self.base_url = base_url
        self.base_domain = urlparse(base_url).netloc
        self.page_data = {}
        self.lock = asyncio.Lock()
        self.max_concurrency = max_concurrency
        self.max_pages = max_pages
        self.semaphore = asyncio.Semaphore(self.max_concurrency)
        self.session = None
        self.should_stop = False
        self.all_tasks = set()

    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.session.close()

    async def add_page_visit(self, normalized_url):
        async with self.lock:
            if self.should_stop:
                return False
            if normalized_url in self.page_data:
                return False
            if len(self.page_data) >= self.max_pages:
                self.should_stop = True
                print("Reached maximum number of pages to crawl.")
                for task in self.all_tasks:
                    task.cancel()
                return False
            return True

    async def get_html(self, url):
        try:
            # 1. Use 'async with' to make a GET request using self.session
            async with self.session.get(url) as response:
                # 2. Check if the response status is an error (greater than 399)
                if response.status > 399:
                    return None

                # 3. Check if the content-type header contains "text/html"
                content_type = response.headers.get("content-type", "")
                if "text/html" not in content_type:
                    return None

                # 4. Await and return the text of the response
                return await response.text()

        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None

    async def crawl_page(self, current_url):
        if self.should_stop:
            return
        current_url_obj = urlparse(current_url)
        if current_url_obj.netloc != self.base_domain:
            return
        normalized_url = normalize_url(current_url)

        its_new = await self.add_page_visit(normalized_url)
        if not its_new:
            return

        async with self.semaphore:
            html = await self.get_html(current_url)
            if html is None:
                return
            info = extract_page_data(html, current_url)

            # Use the lock ONLY to safely write to our shared page_data dictionary
            async with self.lock:
                self.page_data[normalized_url] = info

            next_urls = get_urls_from_html(html, self.base_url)

        # We are now outside the semaphore block (8 spaces of indentation)
        tasks = []
        for next_url in next_urls:
            task = asyncio.create_task(self.crawl_page(next_url))
            tasks.append(task)
            # add this line:
            self.all_tasks.add(task)
        if tasks:
            try:
                await asyncio.gather(*tasks, return_exceptions=True)
            finally:
                for task in tasks:
                    self.all_tasks.discard(task)

    async def crawl(self):
        await self.crawl_page(self.base_url)
        return self.page_data

async def crawl_site_async(base_url: str, max_concurrency: int, max_pages: int):
    async with AsyncCrawler(base_url, max_concurrency, max_pages) as crawler:
        return await crawler.crawl()