;(function($){
	$(document).on('ready', function(){
		var dateDefaults = {
			maxDate:0,
			dateFormat: 'dd/mm/yy'
		};

		$('.js-date-picker').each(function(){
			var $this = $(this);
			var config = $this.data('dateSettings') || {};
			$this.datepicker($.extend({}, dateDefaults, config));
		});

		$('.js-delete-confirm').on('submit.impresario', function(){
			return confirm('Are you sure you want to delete this?');
		})
	});
}(jQuery));