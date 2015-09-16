$(function () {

	$('.arrow-right').on('click', function(e) {
		nextPage();
	});

	$('.arrow-left').on('click', function(e) {
		previousPage();
	});



	// Handle key events
	$(document).keydown(function(e) {
		switch(e.which) {
			case 37: // left
				previousPage();
			break;

			case 38: // up
				previousPage();
			break;

			case 39: // right
				nextPage();
			break;

			case 40: // down
				nextPage();
			break;


			default: return; 
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});



	var nextPage = function() {
		var upperPage = getUpperPage();
		upperPage.addClass('switching')
		upperPage.css('z-index', parseInt(upperPage.css('z-index')) - 3);
		updateZIndex(1);
		window.setTimeout(function() {upperPage.removeClass('switching');}, 1000);
		
	}

	var previousPage = function() {
		var bottomPage = getBottonPage();
		bottomPage.css('z-index', parseInt(bottomPage.css('z-index')) + 3);
		updateZIndex(-1);
	}

	var getUpperPage = function() {
		var pages = $(".page");
		
		var upperPage;
		var maxZIndex = 0;

		$.each(pages, function(index, element){
			if (maxZIndex < $(this).css('z-index')) {
				upperPage = $(this);
				maxZIndex = $(this).css('z-index');
			}
		});

		return upperPage;
	}

	var getBottonPage = function() {
		var pages = $(".page");
		
		var bottomPage;
		var minZIndex = 999999;

		$.each(pages, function(index, element){
			if (minZIndex > $(this).css('z-index')) {
				bottomPage = $(this);
				minZIndex = $(this).css('z-index');
			}
		});

		return bottomPage;

	}

	var updateZIndex = function(diff) {
		var pages = $(".page")
		$.each(pages, function(index, element){
			$(this).css('z-index', parseInt($(this).css('z-index')) + diff);
		});
	};


		



});