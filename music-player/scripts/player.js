// todo: auto play, shuffle, repeat, pause button toggle

const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const songSlider = document.getElementById("slider-song");

const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");
const shuffleSong = document.getElementById("shuffle-song");
const repeatSongButton = document.getElementById("repeat-song");

const songs = [
    {
        image: "./images/album-art1.jpg",
        name: "Deck the Halls",
        artist: "John Parry",
        audio: "./music/deck-the-halls.mp3"
    },
    {
        image: "./images/album-art2.jpg",
        name: "Jingle Bells",
        artist: "James Lord Pierpont",
        audio: "./music/jingle-bells.mp3"
    },
    {
        image: "./images/album-art3.jpg",
        name: "Joy to the World",
        artist: "Isaac Watts",
        audio: "./music/joy-to-the-world.mp3"
    }
]

const audio = document.createElement("audio");
audio.id = "music-player";

let currentSongIndex = 0;
let repeatSong = false;
// initializes first song to prevent defaults from loading
updateSong();

repeatSongButton.addEventListener("click", () => {
    if (!repeatSong) {
        repeatSong = true;
        repeatSongButton.style.color = "red";
    } else {
        repeatSong = false;
        repeatSongButton.style.color = "black";
    }
})

const playPauseIcon  = function() {
    if (audio.paused) {
        playpauseButton.classList.remove("fa-circle-pause");
        playpauseButton.classList.add("fa-circle-play");
    } else {
        playpauseButton.classList.remove("fa-circle-play");
        playpauseButton.classList.add("fa-circle-pause");
    }
}

playpauseButton.addEventListener("click", () => {
    if (!audio.paused) {
        audio.pause();
        playPauseIcon();
    } else {
        audio.play();
        playPauseIcon();
    }
});

shuffleSong.addEventListener("click", () => {
    let randomIndex = Math.floor(Math.random() * songs.length);
    currentSongIndex = randomIndex;
    updateSong();
    audio.play();
});

prevSongButton.addEventListener("click", () => {
    
    if (currentSongIndex == 0) {
        return;
    }
    currentSongIndex --;;
    updateSong();
    audio.play();
});

nextSongButton.addEventListener("click", () => {
    if (currentSongIndex == songs.length - 1) {
        return;
    }
    currentSongIndex ++;
    updateSong();
    audio.play();
});

function updateSong() {
    const song = songs[currentSongIndex];
    songImage.src = song.image;
    songName.innerText = song.name;
    songArtist.innerText = song.artist;
    audio.src = song.audio;
    audio.onloadedmetadata = () => {
        songSlider.value = 0;
        songSlider.max = audio.duration;
    }
};

songSlider.addEventListener("change", () => {
    audio.currentTime = songSlider.value;
});

function moveSlider() {
    songSlider.value = audio.currentTime;

    if (repeatSong && audio.currentTime == audio.duration) {
        audio.currentTime = 0;
        setTimeout(() => {audio.play()}, 1500);
    }

    if (audio.currentTime == audio.duration) {
        if (currentSongIndex < songs.length - 1) {
            currentSongIndex ++;
            updateSong();
            setTimeout(() => {audio.play()}, 1500);
        }
    }
};

setInterval(moveSlider, 1000);

const SNOWFLAKE_COUNT = 100;
const snowflakesContainer = document.getElementById('snowflakes-container');

let createSnowFlake = function() {
    let snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Set random position, size, and duration
    snowflake.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    snowflake.style.width = `${Math.random() * 5 + 2}px`; // Random size
    snowflake.style.height = snowflake.style.width;
    snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`; // Random fall speed (duration)
    snowflake.style.opacity = Math.random(); // Random opacity

    snowflakesContainer.appendChild(snowflake);

    // Remove snowflake when animation ends to prevent infinite elements
    snowflake.addEventListener('animationiteration', () => {
        // Reset position to top with new random properties for an infinite loop
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
        snowflake.style.opacity = Math.random();
        snowflake.style.transform = 'translateY(0vh)'; // Explicitly reset Y position
    });
}

// Create the specified number of snowflakes
for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
    createSnowFlake();
}