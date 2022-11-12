/************************************************************************
*Original Author: Brandon Swan
*Date Created: 11/09/2022
*Version: 0.1
*Date Last Modified: 11/09/2022
*Modified by: Brandon Swan
*Modification log: 

    Version 0.0 - 11/09/2022 - Created file. Added ScrollTrigger base for testing later.
    Version 0.1 - 11/12/2022 - Added loader from tutorial by stackabuse.com/loading-animation-vanilla-javascript. Added contact form validation


    
***
******************************************************************** */

"use strict";


/* Loader */

const loaderContainer = document.querySelector('.loader-container');

window.addEventListener('load', () => {
    $(loaderContainer).delay(500).fadeOut(500);
	AOS.init({
	  // Global settings:
	  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
	  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
	  initClassName: 'aos-init', // class applied after initialization
	  animatedClassName: 'aos-animate', // class applied on animation
	  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
	  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
	  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
	  throttleDelay: 10, // the delay on throttle used while scrolling the page (advanced)
	  

	  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	  offset: 220, // offset (in px) from the original trigger point
	  delay: 250, // values from 0 to 3000, with step 50ms
	  duration: 350, // values from 0 to 3000, with step 50ms
	  easing: 'ease', // default easing for AOS animations
	  once: false, // whether animation should happen only once - while scrolling down
	  mirror: true, // whether elements should animate out while scrolling past them
	  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

	});
});

/* Collapse Navbar on click https://www.codeply.com/p/uWBbtTSsle */
/* Only works when initializing in mobile - do more research to fix */
const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false})
if ($(window).width() < 961) {
	navLinks.forEach((l) => {
		l.addEventListener('click', () => { bsCollapse.toggle() })
	})
}



document.addEventListener("DOMContentLoaded", () => {
  $("#contact .clear").click(clearContactForm);
});

/* Form Patterns and Functions for Validation*/

const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

/* https://andrewwoods.net/blog/2018/name-validation-regex/*/
const namePattern = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$/;
/* email validation */

// validate the email addresses - https://www.w3resource.com/javascript/form/email-validation.php
const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;


/* Contact Form Validation */
$("#contact #submit").click( evt => {
	
	let isValid = true;

	// validate the name entry 
	const name = $("#name").val().trim(); 
	if (name == "") {
		$("label[for='name']").next().text("Name field is required.");
		$("#name").addClass("warning-red");
		isValid = false;
	}
	else if (name.length > 255) {
		$("label[for='name']").next().text("Too many characters in Name field.");
		$("#name").addClass("warning-red");
	}
	else if (!namePattern.test(name)) {
		$("label[for='name']").next().text("Numbers not allowed in name field.");
		$("#name").addClass("warning-red");
	}
	else {
		$("label[for='name']").next().text("");
		$("#name").removeClass("warning-red");
	}
	$("#name").val(name);

	const phone = $("#phone").val().trim(); 
	if (phone == "") {
		$("label[for='phone']").next().text("Phone field is required.");
		$("#phone").addClass("warning-red");
		isValid = false;
	} else if (!phonePattern.test(phone)) {
		$("label[for='phone']").next().text("Phone format is invalid.");
		$("#phone").addClass("warning-red");
	}
	else {
		$("label[for='phone']").next().text("");
		$("#phone").removeClass("warning-red");
	}
	$("#phone").val(phone);


	const email_1 = $("#email").val().trim();
	const parts = email_1.split("@");
	
	if (email_1 == "") {
		$("label[for='email']").next().text("Email Address field is required.");
		$("#email").addClass("warning-red");
		isValid = false;
	}
	else if ( !emailPattern.test(email_1) ) {
		$("label[for='email']").next().text("Must be a valid email address.");
		$("#email").addClass("warning-red");
		isValid = false;
	} else if (parts[0].length > 64) {
		$("label[for='email']").next().text("Too many characters before @.");
		$("#email").addClass("warning-red");
		isValid = false;
	}
	else if (parts[1].length > 255) {
		$("label[for='email']").next().text("Too many characters after @");
		$("#email").addClass("warning-red");
		isValid = false;
	}
	else {
		$("label[for='email']").next().text("");
		$("#email").removeClass("warning-red");
	}
	
	$("#email").val(email_1);

	const email_2 = $("#email-verify").val().trim();
	if (email_2 == "") { 
		$("label[for='email-verify']").next().text("Verify Email Address field is required.");
		$("#email-verify").addClass("warning-red");
		isValid = false; 
	} else if (email_1 != email_2) { 
		$("label[for='email-verify']").next().text("Email addresses must match.");
		$("#email-verify").addClass("warning-red");
		isValid = false;
	} else {
		$("label[for='email-verify']").next().text("");
		$("#email-verify").removeClass("warning-red");
	}
	$("#email-verify").val(email_2);
   
   
	if (isValid == true) {
		$("#contact").submit();
	}
});

// Clear Contact Form
const clearContactForm = () => {
	
	$("#name").val('');
	$("#phone").val('')
	$("#email").val('');
	$("#email-verify").val('')

	$("#name").removeClass("warning-red");
	$("#phone").removeClass("warning-red");
	$("#email").removeClass("warning-red");
	$("#email-verify").removeClass("warning-red");
	
	$("label[for='name']").next().text("");
	$("label[for='phone']").next().text("");
	$("label[for='email']").next().text("");
	$("label[for='email-verify']").next().text("");
	
	$("#name").focus();
};

/* ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
	scrollTrigger: {
		trigger: ".box",
		toggleActions: "restart none none none"
	},
	x: 400,
	rotation: 360,
	duration: 3
});
*/
