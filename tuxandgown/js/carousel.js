/************************************************************************
*Original Author: Brandon Swan
*Date Created: 09/22/2022
*Version: 0.1
*Date Last Modified: 09/22/2022
*Modified by: Brandon Swan
*Modification log: 

    Version 0.1 - 09/22/2022 - Created carousel.js
    Version 0.2 - 09/xx/2022 - 

    
***
******************************************************************** */

"use strict";

/* ToDO

Count div panels and use that for #testimonial-list length in the future
https://www.w3schools.com/jsref/prop_element_childelementcount.asp

Multi click animations

https://stackoverflow.com/questions/16165470/prevent-multiple-clicks-until-animation-is-done-jquery
*/

$(document).ready( () => {

    const slider = $("#testimonial-list");      // slider = ul element
	
	// Note: -900 for the right button so there are no blank spots; carousel starts over.
	// For - 600, clicking on left button takes to the end of carousel with no blank spots

    // the click event handler for the right button
    $("#right-button").click( () => { 

        // get value of current left property
        const leftProperty = parseInt(slider.css("left"));
        
        // determine new value of left property
        let newLeftProperty = 0;
        if (leftProperty - 300 > -900) {
            newLeftProperty = leftProperty - 300;
        }
        
        // use the animate function to change the left property
        slider.animate({left: newLeftProperty}, 1000, "linear");    
    }); 
    
    // the click event handler for the left button
    $("#left-button").click( () => {
    
        // get value of current left property
        const leftProperty = parseInt(slider.css("left"));
        
        // determine new value of left property
        let newLeftProperty = 0;
        if (leftProperty < 0) {
            newLeftProperty = leftProperty + 300;
        }
        else {
            newLeftProperty = -600;
        }
        
        // use the animate function to change the left property
        slider.animate({left: newLeftProperty}, 1000, "linear");
    });

});