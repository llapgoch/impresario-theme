;(function($){
	$(document).on('ready', function(){
		var statusSelector = '.js-status',
			dataSelector = '.js-enquiry-data',
			formSelector = '.js-enquiry-form',
			dateCompletedSelector = '.js-date-completed',
			engineerSelector = '.js-engineer',
			editData = JSON.parse($(dataSelector).val());

		if(editData) {
			addSubmitEvent();
		}

		function addSubmitEvent(){
			$(formSelector).on('submit.impresario', function (ev) {
				if (editData['completedStatus'] == $(statusSelector).val()
					&& editData['hasQuote'] == false
					&& $(dateCompletedSelector).val() && $(engineerSelector).val()){

					if(confirm('This will create a quote for the enquiry, are you sure?') == false){
						ev.preventDefault();
					}
				}
			});
		}
	});
}(jQuery));