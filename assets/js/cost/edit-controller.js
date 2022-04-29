; (function ($) {
    $(document).on('ready', function () {
        var tableSelector = '.js-po-item-table',
            inputKeys = ['description', 'qty', 'unit_price'],
            invoiceValueSelector = '.js-invoice-value',
            amountRemainingSelector = '.js-amount-remaining',
            inputClass = 'form-control';

        function getTable() {
            return $(tableSelector);
        }

        function getTableRows() {
            return $('tbody tr', getTable());
        };

        function isInputCell(header) {
            return inputKeys.includes(header);
        };

        function createInputsForRow(row, rowIndex) {
            var cells = $('td', row);
            var lastCell = cells.last();
            // Get this from the adapted table template attribute in status-link-attribute-value
            var rowId = $(row).data('valueId');

            cells.each(function (cellIndex, cell) {
                let $cell = $(cell);
                let headerKey = $cell.data('code');
                let cellValue = $cell.data('value');

                // Hacky way to get the id and deleted flags into the row.
                if (headerKey === 'remove') {
                    // Add the items required to identify the row
                    let $idElement = $(document.createElement('input'));
                    $idElement.attr('type', 'hidden');
                    $idElement.attr('name', 'po_items[' + rowIndex + '][id]');
                    $idElement.val(rowId);

                    $cell.append($idElement);

                    let $removeElement = $(document.createElement('input'));
                    $removeElement.attr('type', 'hidden');
                    $removeElement.attr('name', 'po_items[' + rowIndex + '][removed]');
                    $removeElement.val('0');

                    $cell.append($removeElement);
                }

                if (!isInputCell(headerKey)) {
                    return true;
                }

                let $input = $(document.createElement('input'));
                $input.addClass(inputClass);
                $input.val(cellValue);

                // Parse these manually using the po_items key
                $input.attr('name', 'po_items[' + rowIndex + '][' + headerKey + ']');

                $cell.append($input);

            });
        };

        // Add inputs t


        // Create inputs for all items
        function init() {
            getTableRows().each(function (rowIndex, row) {
                createInputsForRow(row, rowIndex);
            });
        }

        init();


        function addEvents() {
            $(invoiceValueSelector).on('keyup.impresario', function (ev) {
                var invoiceValue = parseFloat($(invoiceValueSelector).val()),
                    remainingInitial = parseFloat(editData['amountRemaining']);

                if (isNaN(invoiceValue)) {
                    invoiceValue = 0;
                }

                var remaining = remainingInitial - invoiceValue;

                if (!isNaN(remaining)) {
                    remaining = Math.max(0, Math.round(remaining * 100) / 100);
                    $(amountRemainingSelector).val("£" + remaining);
                } else {
                    $(amountRemainingSelector).val('- -');
                }
            });


        }
    });
}(jQuery));