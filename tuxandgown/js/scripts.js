/************************************************************************
*Original Author: Brandon Swan
*Date Created: 08/26/2022
*Version: 0.1
*Date Last Modified: 08/26/2022
*Modified by: Brandon Swan
*Modification log: 

    Version 0.0 - 08/26/2022 - Added prompt to website.
    Version 0.1 - 09/08/2022 - Added clearContactForm and clearNewsletter Function
    Version 0.2 - 09/22/2022 - Added carousel, commented out slideshow. Created $vanilla so I can use jQuery shortcut selector and to help separate vanilla JS and jQuery.
    Version 0.3 - 09/28/2022 - Form validation for Contact and Newsletter signup

    
***
******************************************************************** */

"use strict";


const $vanilla = (selector) => document.querySelector(selector);

const focusAndSelect = (selector) => {
  const elem = $vanilla(selector);
  elem.focus();
  elem.select();
};


/* Contact Form Validation */
$("#contact #submit").click( evt => {
	
	let isValid = true;

	// validate the name entry 
	const name = $("#name").val().trim(); 
	if (name == "") {
		$("#name").next().text("Name field is required.");
		$("#name").addClass("warning-red");
		isValid = false;
	} else {
		$("#name").next().text("* Name");
		$("#name").removeClass("warning-red");
	}
	$("#name").val(name);

	const phone = $("#phone").val().trim(); 
	if (phone == "") {
		$("#phone").next().text("Phone field is required.");
		$("#phone").addClass("warning-red");
		isValid = false;
	} else {
		$("#phone").next().text("* Phone");
		$("#phone").removeClass("warning-red");
	}
	$("#phone").val(phone);

	// validate the email addresses
	const emailPattern = 
		/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
	const email_1 = $("#email").val().trim();
	if (email_1 == "") {
		$("#email").next().text("Email field is required.");
		$("#email").addClass("warning-red");
		isValid = false;
	} else if ( !emailPattern.test(email_1) ) {
		$("#email").next().text("Must be a valid email address.");
		$("#email").addClass("warning-red");
		isValid = false;
	} else {
		$("#email").next().text("* Email Address");
		$("#email").removeClass("warning-red");
	}
	$("#email").val(email_1);

	const email_2 = $("#email-verify").val().trim();
	if (email_2 == "") { 
		$("#email-verify").next().text("Verify email address field is required.");
		$("#email-verify").addClass("warning-red");
		isValid = false; 
	} else if (email_1 != email_2) { 
		$("#email-verify").next().text("Email addresses must match.");
		$("#email-verify").addClass("warning-red");
		isValid = false;
	} else {
		$("#email-verify").next().text("* Verify Email Address");
		$("#email-verify").removeClass("warning-red");
	}
	$("#email-verify").val(email_2);
   
   
	if (isValid == false) {
		evt.preventDefault();
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
	
	$("#name").next().text("* Name");
	$("#phone").next().text("* Phone");
	$("#email").next().text("* Email Address");
	$("#email-verify").next().text("* Verify Email Address");
	
	$("#name").focus();
};



/* Newsletter Validation */
$("#newsletter #subscribe").click( evt => {
	let isValid = true;

	// validate the first name entry 
	const name = $("#newsletter-name").val().trim(); 
	if (name == "") {
		$("#newsletter-name").next().text("Name field is required.");
		$("#newsletter-name").addClass("warning-red");
		isValid = false;
	} else {
		$("#newsletter-name").next().text("* Name");
		$("#newsletter-name").removeClass("warning-red");
	}
	$("#newsletter-name").val(name);

	// validate the email addresses
	const emailPattern = 
		/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
	const email_1 = $("#newsletter-email").val().trim();
	if (email_1 == "") {
		$("#newsletter-email").next().text("Email field is required.");
		$("#newsletter-email").addClass("warning-red");
		isValid = false;
	} else if ( !emailPattern.test(email_1) ) {
		$("#newsletter-email").next().text("Must be a valid email address.");
		$("#newsletter-email").addClass("warning-red");
		isValid = false;
	} else {
		$("#newsletter-email").next().text("* Email Address");
		$("#newsletter-email").removeClass("warning-red");
	}
	$("#newsletter-email").val(email_1);

	const email_2 = $("#newsletter-email-verify").val().trim();
	if (email_2 == "") { 
		$("#newsletter-email-verify").next().text("Verify email address field is required.");
		$("#newsletter-email-verify").addClass("warning-red");
		isValid = false; 
	} else if (email_1 != email_2) { 
		$("#newsletter-email-verify").next().text("Email addresses must match.");
		$("#newsletter-email-verify").addClass("warning-red");
		isValid = false;
	} else {
		$("#newsletter-email-verify").next().text("* Verify Email Address");
		$("#newsletter-email-verify").removeClass("warning-red");
	}
	$("#newsletter-email-verify").val(email_2);
   
	if (isValid == false) {
		evt.preventDefault();
	}
});

// Clear Newsletter Form

const clearNewsletterForm = () => {
	$("#newsletter-name").val('');
	$("#newsletter-email").val('')
	$("#newsletter-email-verify").val('')
	
	$("#newsletter-name").removeClass("warning-red");
	$("#newsletter-email").removeClass("warning-red");
	$("#newsletter-email-verify").removeClass("warning-red");
	
	$("#newsletter-name").next().text("* Name");
	$("#newsletter-email").next().text("* Email Address");
	$("#newsletter-email-verify").next().text("* Verify Email Address");
	
	$vanilla("#newsletter-name").focus();
};



/* Appointment Validation */
$("#appointment #test").click( evt => {
	
	let isValid = true;

	// validate the name entry 
	const name = $("#party-name").val().trim(); 
	if (name == "") {
		$("#party-name").next().text("Party Name is required.");
		$("#party-name").addClass("warning-red");
		isValid = false;
	} else {
		$("#party-name").next().text("* Party Name");
		$("#party-name").removeClass("warning-red");
	}
	$("#party-name").val(name);

	const phone = $("#apt-phone").val().trim(); 
	if (phone == "") {
		$("#apt-phone").next().text("Phone field is required.");
		$("#apt-phone").addClass("warning-red");
		isValid = false;
	} else {
		$("#apt-phone").next().text("* Phone");
		$("#apt-phone").removeClass("warning-red");
	}
	$("#apt-phone").val(phone);

	// validate the email addresses
	const emailPattern = 
		/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
	const email = $("#apt-email").val().trim();
	if (email == "") {
		$("#apt-email").next().text("Email field is required.");
		$("#apt-email").addClass("warning-red");
		isValid = false;
	} else if ( !emailPattern.test(email) ) {
		$("#apt-email").next().text("Must be a valid email address.");
		$("#apt-email").addClass("warning-red");
		isValid = false;
	} else {
		$("#apt-email").next().text("* Email Address");
		$("#apt-email").removeClass("warning-red");
	}
	$("#apt-email").val(email);
   
	const attendees = $("#apt-attendees").val().trim(); 
	if (attendees == "") {
		$("#apt-attendees").next().text("Attendees field is required.");
		$("#apt-attendees").addClass("warning-red");
		isValid = false;
	} else if (isNaN(attendees)) {
		$("#apt-attendees").next().text("Attendees field must be a number.");
		$("#apt-attendees").addClass("warning-red");
	}
	else {
		$("#apt-attendees").next().text("* Number of Attendees");
		$("#apt-attendees").removeClass("warning-red");
	}
	$("#apt-attendees").val(attendees);


	const date = $("#apt-date").val().trim(); 
	if (date == "") {
		$("#apt-date").next().text("Appointment Date is required.");
		$("#apt-date").addClass("warning-red");
		isValid = false;
	} else {
		$("#apt-date").next().text("* Appointment Date");
		$("#apt-date").removeClass("warning-red");
	}
	$("#apt-date").val(date);

	const time = $("#apt-time").val().trim(); 
	if (time == "") {
		$("#apt-time").next().text("Appointment Time is required.");
		$("#apt-time").addClass("warning-red");
		isValid = false;
	} else {
		$("#apt-time").next().text("* Appointment Time");
		$("#apt-time").removeClass("warning-red");
	}
	$("#apt-time").val(time);

   
	if (isValid == true) {
		$("#appointment").submit();
	}	
});

/* Clear Appointment Form */
const clearAppointmentForm = () => {
	$("#party-name").val('');
	$("#apt-phone").val('');
	$("#apt-email").val('')
	$("#apt-attendees").val('')
	$("#apt-date").val('')
	$("#apt-time").val('')
	$("#apt-message").val('')
	
	$("#party-name").removeClass("warning-red");
	$("#apt-phone").removeClass("warning-red");
	$("#apt-email").removeClass("warning-red");
	$("#apt-attendees").removeClass("warning-red");
	$("#apt-date").removeClass("warning-red");
	$("#apt-time").removeClass("warning-red");
	
	$("#party-name").next().text("* Party Name");
	$("#apt-phone").next().text("* Phone");
	$("#apt-email").next().text("* Email Address");
	$("#apt-attendees").next().text("* Number of Attendees");
	$("#apt-date").next().text("* Appointment Date");
	$("#apt-time").next().text("* Appointment Date");
	
	$("#party-name").focus();
};



/*
// Slideshow

const imageCache = [];
let imageCounter = 0;
let timer = null;
let image = null;

const mainImage = $("#main_image"); // the img element for the show
const caption = $("#caption"); // the h2 element for the caption

const runSlideShow = function () {
  imageCounter = (imageCounter + 1) % imageCache.length;
  image = imageCache[imageCounter];
  mainImage.src = image.src;
  mainImage.alt = image.alt;
  caption.textContent = image.alt;
};


const links = $("#image_list").querySelectorAll("a");

// process image links
for (let link of links) {
// Preload image and copy title properties
image = new Image();
image.src = link.href;
image.alt = link.title;

// add image to array
imageCache[imageCache.length] = image;
}

Other method?

Find all input in form#contact and set text and textarea to empty

const clearContactForm = () => {
	
	let x = document.getElementById("contact").querySelectorAll("input");
	let i;
	for (i = 0; i < x.length; i++) {
		if(x[i].type == "text" || x[i].type == "textarea") {
			return x[i].value = "";
		}
	}
};

Clear Form with .reset();
document.getElementById("myForm").reset();

function incompleteAlert() {
    window.alert("This website is a work in progress and some items will not function.");
}
 Future Form validation
const joinMailList = function {
    // objectName.methodName(parameters)
    // window.alert("This is a test of the alert method");
    // 
}
*/

