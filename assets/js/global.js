;(function($){
	$(document).on('ready', function(){
		var dateDefaults = {
			maxDate:0,
			dateFormat: 'dd/mm/yy'
		};

		// Change function of navigation on mobile
		if(window.dbaker.isMobile()){
			$('.navbar .nav-item.dropdown .nav-link').each(function(){
				var $this = $(this);

				$this.attr('data-db-toggler-target', $this.data('dropdownTarget'))
					.attr('data-db-toggler-action', 'click')
					.attr('data-db-toggler-action', 'toggle')
					.attr('data-db-toggler-group', "navMenuItem");

			})
		}else{
			$('.navbar .nav-item.dropdown').each(function(){
				var $this = $(this);

				$this.attr('data-db-toggler-trigger-activate', "mouseenter")
					.attr('data-db-toggler-trigger-deactivate', "mouseleave")
					.attr('data-db-toggler-active-class', "show")
					.attr('data-db-toggler-deactivate-delay', "500")
					.attr('data-db-toggler-group', "navMenuItem")
					.attr('data-db-toggler-target', $this.data('dropdownTarget'));
			});
		}

		$('.js-date-picker:not(.js-is-locked)').each(function(){
			var $this = $(this);
			var config = $this.data('dateSettings') || {};
			$this.datepicker($.extend({}, dateDefaults, config));
		});

		$('.js-flip-card').on('mouseover', function(){
			$(this).addClass('flip');
		});

		$('.js-flip-card').on('mouseleave', function(){
			$(this).removeClass('flip');
		});

		$('.js-form-basic').on('submit.impresario', function(){
			$(this).addClass('js-show-loader');
		});

		$('.js-quote-form').on('submit.impresario', function(ev){
			var $this = $(this);
			if($('[name="action"]', $this).val() == 'revise'){
				if(!confirm('Are you sure you want to create a new revision?')){
					ev.preventDefault();
					ev.cancelBubble();
				}
			}
		});

	});

	$(document).on('blockReplacerComplete', function(){
		$('.js-modal-auto-show').modal('show').removeClass('js-modal-auto-show')
	});

}(jQuery));