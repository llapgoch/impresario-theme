;(function($){
	$(document).on('ready', function(){
		var dateDefaults = {
			maxDate:0,
			dateFormat: 'dd/mm/yy'
		};

		$('.js-date-picker:not(.js-is-locked)').each(function(){
			var $this = $(this);
			var config = $this.data('dateSettings') || {};
			$this.datepicker($.extend({}, dateDefaults, config));
		});

		widthLess992();
	});


	var widthLess992 = function(){

		if ($(window).width() < 992) {
			//make sidebar collapsed
			$('#sidebar').addClass('collapsed');
			$('#navigation').find('.dropdown.open').removeClass('open');
			$('#navigation').find('.dropdown-menu.animated').removeClass('animated');

			//move content if navigation is collapsed
			if ($('#sidebar').hasClass('collapsed')) {
				$('#content').animate({left: "0px",paddingLeft: "55px"},150);
			} else {
				$('#content').animate({paddingLeft: "55px"},150);
			};
		}

		else {
			//make navigation not collapsed
			$('#sidebar').removeClass('collapsed');

			//move content if navigation is not collapsed
			if ($('#sidebar').hasClass('collapsed')) {
				$('#content').animate({left: "210px",paddingLeft: "265px"},150);
			} else {
				$('#content').animate({paddingLeft: "265px"},150);
			};
		}

	};

	var widthLess768 = function(){
		if ($(window).width() < 768) {
			//paste top navbar objects to sidebar
			if($('.collapsed-content .search').length === 1) {
				$('#main-search').appendTo('.collapsed-content .search');
			}
			if($('.collapsed-content li.user').length === 0) {
				$( ".collapsed-content li.search" ).after($( "#current-user" ));
			}
		}

		else {
			//show content of top navbar
			$('#current-user').show();

			//remove top navbar objects from sidebar
			if($('.collapsed-content .search').length === 2) {
				$( ".nav.refresh" ).after($( "#main-search" ));
			}
			if($('.collapsed-content li.user').length === 1) {
				$( ".quick-actions >li:last-child" ).before($( "#current-user" ));
			}
		}
	}

	/**************************************/
	/* run this function after page ready */
	/**************************************/


	// widthLess768();

	/***************************************/
	/* run this functions if window resize */
	/***************************************/

	$(window).resize(function() {
		widthLess992();
		// widthLess768();
	});
}(jQuery));