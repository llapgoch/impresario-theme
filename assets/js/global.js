;(function($){
	$(document).on('ready', function(){
		var defaults = {
			maxDate:0,
			dateFormat: 'dd/mm/yy'
		};

		$('.js-date-picker').each(function(){
			var $this = $(this);
			var config = $this.data('dateSettings') || {};

			console.log(this);
			$this.datepicker($.extend({}, defaults, config));
		});
	});
}(jQuery));