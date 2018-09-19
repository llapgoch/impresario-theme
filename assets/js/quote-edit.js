;(function($){
	$(document).on('ready', function(){
		var tenderStatusSelector = '.js-tender-status',
			dataSelector = '.js-quote-data',
			formSelector = '.js-quote-form',
			dateCompletedSelector = '.js-date-completed',
			netCostSelector = '.js-net-cost',
			netSellSelector = '.js-net-sell',
			completedById = '.js-completed-by-id',
			editData = JSON.parse($(dataSelector).val());

		if(editData) {
			addSubmitEvent();
		}

		function addSubmitEvent(){
			$(formSelector).on('submit.impresario', function (ev) {
				var confirmMessages = [];

				if(editData['netCost'] !== null && editData['netSell'] !== null
					&& $(netSellSelector).val() && $(netSellSelector).val()){
					if((parseFloat(editData['netCost']) !== parseFloat($(netCostSelector).val())) ||
						parseFloat(editData['netSell']) !== parseFloat($(netSellSelector).val())){
						confirmMessages.push('This will create a new revision of the quote.');
					}
				}

				if (editData['completedTenderStatus'] == $(tenderStatusSelector).val()
					&& editData['hasProject'] == 0
					&& $(dateCompletedSelector).val() && $(completedById).val()){
						confirmMessages.push('This will {{also}} create a new project for the quote.');
				}

				if(confirmMessages.length){
					$(confirmMessages).each(function (i) {
						confirmMessages[i] = confirmMessages[i].replace('{{also}}', confirmMessages.length > 1 ? 'also' : '');
					});

					if(confirm(confirmMessages.join("\r") + "\rWould you like to proceed?") == false){
						ev.preventDefault();
					}
				}
			});
		}
	});
}(jQuery));