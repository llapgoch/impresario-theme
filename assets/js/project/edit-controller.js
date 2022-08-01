; (function ($) {
    $(document).on('ready', function () {
        var rebateControlSelector = '.js-rebate-control',
            rebatePercentageSelector = '.js-rebate-percentage',
            rebateAmountSelector = '.js-rebate-amount',
            netSellSelector = '.js-net-sell',
            actualCostSelector = '.js-actual-cost',
            actualProfitSelector = '.js-actual-profit ',
            actualMarginSelector = '.js-actual-margin';



        addEvents();
        updateRebateControl();

        function addEvents() {
            var $document = $(document);
            $document.on('change', rebateControlSelector, function (ev) {
                updateRebateControl();
            });

            $(rebatePercentageSelector).on('keyup', function(ev){
                calculateRebate();
            });

        }

        function calculateRebate() {
            var netSell = parseFloat($(netSellSelector).data('actual-value'));
            var $rebateEl = $(rebatePercentageSelector);
            var $actualCostEl = $(actualCostSelector);
            var $rebateAmountEl = $(rebateAmountSelector);
            var $actualProfitEl = $(actualProfitSelector);
            var $actualMarginEl = $(actualMarginSelector);
            var costItemTotal = parseFloat($actualCostEl.data('item-total'));

            var rebateOriginalValue = $rebateEl.val();
            var rebateValue = parseFloat(rebateOriginalValue);
            var rebateOriginalFloatValue = rebateValue;


            if(isNaN(netSell)) {
                netSell = 0;
            }

            if(isNaN(rebateValue)) {
                rebateValue = 0;
            }

            if(isNaN(costItemTotal)) {
                costItemTotal = 0;
            }

            rebateValue = Math.max(0, Math.min(rebateValue, 100));
            // round to 2dp
            rebateValue = Math.floor(rebateValue * 100, 2) / 100;

            // Clamp & reset the rebate percentage, if entered
            if(rebateValue !== rebateOriginalFloatValue && rebateOriginalValue !== '') {
                $rebateEl.val(rebateValue);
            }

            var rebateAmount = netSell * (rebateValue / 100);
            // Round up - 2 decimal places
            rebateAmount = Math.ceil(rebateAmount * 100) / 100;
            var totalActualCost = (rebateAmount + costItemTotal);

            // Calculate actual profit
            var actualProfit = netSell - totalActualCost;
            var actualMargin = 0;
            
            
            if(netSell > 0) {
                actualMargin = (actualProfit / netSell) * 100;
                actualMargin = Math.round(actualMargin * 100) / 100;
            }

            $rebateAmountEl.val("£" + (rebateAmount.toFixed(2)));
            $actualCostEl.val("£" + (totalActualCost.toFixed(2)));
            $actualProfitEl.val("£" + (actualProfit.toFixed(2)));
            $actualMarginEl.val(actualMargin + "%");
            
        }

        function updateRebateControl() {
            var isSelected = $(rebateControlSelector).val() === '1';
            var $rebateInput = $(rebatePercentageSelector);
            if (isSelected) {
                $rebateInput.removeAttr('readonly')
            } else {
                $rebateInput.attr('readonly', 'readonly')
                    .val('0.00');

            }

            calculateRebate();
        }
    });
}(jQuery));