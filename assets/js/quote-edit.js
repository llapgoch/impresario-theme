;(function($){
	$(document).on('ready', function(){
		var statusSelector = '.js-status',
			dataSelector = '.js-quote-data',
			formSelector = '.js-quote-form',
			dateCompletedSelector = '.js-date-completed',
			completedById = '.js-completed-by-id',
			editData = JSON.parse($(dataSelector).val());

		if(editData) {
			addSubmitEvent();
		}

		function addSubmitEvent(){
			$(formSelector).on('submit.impresario', function (ev) {
				if (editData['completedStatus'] == $(statusSelector).val()
					&& parseInt(editData['hasProject'], 10) == 0
					&& $(dateCompletedSelector).val() && $(completedById).val()){

					if(confirm('This will create a new project for the quote, are you sure?') == false){
						ev.preventDefault();
					}
				}
			});
		}
	});
}(jQuery));