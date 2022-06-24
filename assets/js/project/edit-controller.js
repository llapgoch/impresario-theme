; (function ($) {
    $(document).on('ready', function () {
        var rebateControlSelector = '.js-rebate-control',
            rebatePercentageSelector = '.js-rebate-percentage'


        addEvents();
        updateRebateControl();

        function addEvents() {
            var $document = $(document);
            $document.on('change', rebateControlSelector, function (ev) {
                updateRebateControl();
            });
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
        }
    });
}(jQuery));