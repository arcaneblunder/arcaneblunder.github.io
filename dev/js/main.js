"use strict";

const $vanilla = (selector) => document.querySelector(selector);

const focusAndSelect = (selector) => {
  const elem = $vanilla(selector);
  elem.focus();
  elem.select();
};

/* Form Patterns and Functions for Validation*/

const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
/* https://andrewwoods.net/blog/2018/name-validation-regex/*/
const namePattern = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$/;
/* email validation */

// validate the email addresses - https://www.w3resource.com/javascript/form/email-validation.php
const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;


/* Contact Form Validation */
$("#contact-form #submit").click( evt => {
	
	evt.preventDefault();
	let isValid = true;

	// validate the name entry 
	const name = $("#name").val().trim(); 
	if (name == "") {
		$("#name").next().text("Name field is required.");
		$("#name").addClass("warning");
		isValid = false;
	}
	else if (name.length > 255) {
		$("#name").next().text("Too many characters in Name field.");
		$("#name").addClass("warning");
	}
	else if (!namePattern.test(name)) {
		$("#name").next().text("Numbers not allowed in name field.");
		$("#name").addClass("warning");
	}
	else {
		$("#name").next().text("* Name");
		$("#name").removeClass("warning");
	}
	$("#name").val(name);

	const phone = $("#phone").val().trim(); 
	if (phone == "") {
		$("#phone").next().text("Phone field is required.");
		$("#phone").addClass("warning");
		isValid = false;
	} else if (!phonePattern.test(phone)) {
		$("#phone").next().text("Phone format is invalid.");
		$("#phone").addClass("warning");
	}
	else {
		$("#phone").next().text("* Phone");
		$("#phone").removeClass("warning");
	}
	$("#phone").val(phone);


	const email = $("#email").val().trim();
	const parts = email.split("@");
	
	if (email == "") {
		$("#email").next().text("Email Address field is required.");
		$("#email").addClass("warning");
		isValid = false;
	}
	else if ( !emailPattern.test(email) ) {
		$("#email").next().text("Must be a valid email address.");
		$("#email").addClass("warning");
		isValid = false;
	} else if (parts[0].length > 64) {
		$("#email").next().text("Too many characters before @.");
		$("#email").addClass("warning");
		isValid = false;
	}
	else if (parts[1].length > 255) {
		$("#email").next().text("Too many characters after @");
		$("#email").addClass("warning");
		isValid = false;
	}
	else {
		$("#email").before().text("* Email Address");
		$("#email").removeClass("warning");
	}
	
	$("#email").val(email);
  
   
	if (isValid == true) {
		$("#contact-form").submit();
	}
});

// Check for click events on the navbar burger icon
$(".navbar-burger").click(function() {

	// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
	$(".navbar-burger").toggleClass("is-active");
	$(".navbar-menu").toggleClass("is-active");

	$(".navbar-item").click(function(event) {
		$(".navbar-burger").removeClass("is-active");
		$(".navbar-menu").removeClass("is-active");
	});

});



// For smooth transition between sections
$(".navbar-start a").on('click', function(event) {
	
	// Make sure this.hash has a value before overriding default behavior
	if (this.hash !== "") {
		// Prevent default anchor click behavior
		event.preventDefault();

		// Store hash
		let hash = this.hash;
		

		// Using jQuery's animate() method to add smooth page scroll
		// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 800, function(){
			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
		});
	} // End if
});


// https://dev.to/nikhilroy2/how-to-create-javascript-scrollspy-vanilla-js-tutorial-35o9
let menuSection = document.querySelectorAll('.navbar-start a');

menuSection.forEach(v=> {
  v.onclick = (()=> {
   setTimeout(()=> {
      menuSection.forEach(j=> j.classList.remove('active'))
    v.classList.add('active')
  },300)
   })
})

// for window scrolldown event

window.onscroll = (()=> {
  let mainSection = document.querySelectorAll('section');

  mainSection.forEach((v,i)=> {
    let rect = v.getBoundingClientRect().y
    if(rect < window.innerHeight - 200){
      menuSection.forEach(v=> v.classList.remove('active'))
      menuSection[i].classList.add('active')
    }
  })
})

// Dark Mode - https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
		
const btn = document.querySelector("#mode-swap");
// Select the theme preference from localStorage
const currentTheme = localStorage.getItem("theme");

// Check for localStorage. If empty, return standard text.
if (!localStorage.getItem("text")) {
	$("#mode-swap").text("Click for Dark Mode");
}

// If the current theme in localStorage is "dark"...
if (currentTheme == "dark") {
  // ...then use the .dark-theme class
  document.body.classList.add("dark");
}

// Listen for a click on the button 
btn.addEventListener("click", function() {
	let theme = "light";
	let text = "Click for Dark Mode";
	$("#mode-swap").text("Click for Dark Mode")
	
	// Toggle the .dark-theme class on each click | Toggle text for button
	document.body.classList.toggle("dark");
	// Let's say the theme is equal to light

	// If the body contains the .dark-theme class...
	if (document.body.classList.contains("dark")) {
	// ...then let's make the theme dark
		theme = "dark";
		text = "Click for Light Mode";
		$("#mode-swap").text("Click for Light Mode");
	}

	// Then save the choice in localStorage
	localStorage.setItem("theme", theme);
	localStorage.setItem("text", text);
	
	if (localStorage.getItem("text", text)) {
		$("#mode-swap").text(text);
	}
});

// For donut chart.js			

const ctx = document.getElementById('myChart');

new Chart(ctx, {
	type: 'doughnut',
	data: {
		labels: ['HTML', 'CSS', 'Javascript', 'Sass', 'Vue.js', 'C#', 'PHP', 'React'],
		datasets: [{
			label: 'Skills by Comparison',
			data: [100, 80, 60, 50, 30, 20, 20, 20],
			backgroundColor: [
				'rgb(255, 99, 132)',
				'rgb(54, 162, 235)',
				'rgb(255, 205, 86)',
				'rgb(125, 125, 125)',
				'rgb(56, 80, 200)',
				'rgb(200, 56, 80)',
				'rgb(80, 200, 56)',
				'rgb(18, 160, 164)'
			],
			hoverOffset: 4
		}]
	},
	options: {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
				fontColor: "white",
			},
			title: {
				display: true,
				text: 'Current Skills'
			}
		}
	},
});
