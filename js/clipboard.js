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

	// Handle unload event
	$( window ).unload(function() {
		savePages();
	});


	var nextPage = function() {
		var upperPage = getUpperPage();
		$(".rear-page").addClass('switching')
		window.setTimeout(function() {$(".rear-page").removeClass('switching');}, 500);
		upperPage.css('z-index', parseInt(upperPage.css('z-index')) - 3);
		updateZIndex(1);

		
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

	var savePages = function() {
		if(window.localStorage){
			for (i=1; i<4; i++){
				localStorage.setItem("page" + i, $('.page' + i + ' textarea').val());
			}
		}
	};

	var loadPages = function() {
		if(window.localStorage) {
			for (i=1; i<4; i++){
				if (localStorage.getItem('page' + i) != 'null') {
					$('.page' + i + ' textarea').text(localStorage.getItem('page' + i));
				}
			}
		}
	};

	loadPages();

});