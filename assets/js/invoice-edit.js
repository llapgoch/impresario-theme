;(function($) {
	$(document).on('ready', function () {
		var dataSelector = '.js-invoice-data',
			formSelector = '.js-invoice-form',
			invoiceValueSelector = '.js-invoice-value',
			editData = JSON.parse($(dataSelector).val());

		if (editData) {
			addSubmitEvent();
		}

		function addSubmitEvent()
		{
			$(formSelector).on('submit.impresario', function(ev){
				var invoiceValue = parseFloat($(invoiceValueSelector).val()),
					amountRemaining = parseFloat(editData['amountRemaining']);

				if(!isNaN(amountRemaining) && invoiceValue > amountRemaining){
					if(!confirm('The invoice value is greater than the amount remaining. Are you sure you want to proceed?')){
						ev.preventDefault();
					}
				}
			});
		}
	});
}(jQuery));