;(function($) {
    $(document).on('ready', function () {
        var dataSelector = '.js-invoice-data',
            formSelector = '.js-invoice-form',
            invoiceValueSelector = '.js-invoice-value',
            amountRemainingSelector = '.js-amount-remaining',
            editData = JSON.parse($(dataSelector).val());

        if (editData) {
            addEvents();
        }

        function addEvents()
        {
            $(invoiceValueSelector).on('keyup.impresario', function(ev){
                var invoiceValue = parseFloat($(invoiceValueSelector).val()),
                    remainingInitial = parseFloat(editData['amountRemaining']);
				
                if(isNaN(invoiceValue)){
                    invoiceValue = 0;
                }

                var	remaining = remainingInitial - invoiceValue;

                console.log(editData, remainingInitial, invoiceValue);

                if(!isNaN(remaining)){
                    remaining = Math.round(remaining * 100) / 100;
                    $(amountRemainingSelector).val("£" + remaining.toFixed(2));
                }else{
                    $(amountRemainingSelector).val('- -');
                }
            });

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