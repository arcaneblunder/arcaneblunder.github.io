"use strict";

/************************************************************************
*Original Author: Angela Giese
*Date Created: 10/03/2022
*Version: 0.1
*Original Codepen URL: https://codepen.io/angelagiese/pen/xPVgPv
*Date Last Modified: 08/26/2022
*Modified by: Brandon Swan
*Modification log: 

    Version 0.1 - 10/03/2022 - Implemented Angela's code into website.

***
******************************************************************** */


let filterActive;

function filterCategory(cat1, cat2, cat3) {
		
	// reset results list
	$('.filter-cat-results .f-cat').removeClass('active');
	
	// the filtering in action for all criteria
	let selector = ".filtering .f-cat";
	if (cat1 !== 'cat-all') {
		 selector = '[data-cat=' + cat1 + "]";
	}
	if (cat2 !== 'cat-all') {
		selector = selector + '[data-cat2=' + cat2 + "]";
	}
	if (cat3 !== 'cat-all') {
		selector = selector + '[data-cat3=' + cat3 + "]";
	}
	
	// show all results
	$(selector).addClass('active');

	// reset active filter
	filterActive = cat1;
}

// start by showing all items
$('.filtering .f-cat').addClass('active');

// call the filtering function when selects are changed
$('.filtering select').change(function() {
	
	filterCategory($('.filtering select.cat1').val(), $('.filtering select.cat2').val(), $('.filtering select.cat3').val());
	
});

