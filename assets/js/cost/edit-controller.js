; (function ($) {
    $(document).on('ready', function () {
        var tableSelector = '.js-po-item-table',
            inputKeys = ['description', 'qty', 'unit_price'],
            invoiceValueSelector = '.js-invoice-value',
            amountRemainingSelector = '.js-amount-remaining',
            inputClass = 'form-control',
            removeClass = 'btn btn-red btn-sm js-po-remove',
            removeButtonSelector = '.js-po-remove',
            removeInputClass = 'remove-status';

        function getTable() {
            return $(tableSelector);
        };

        function getTableRows() {
            return $('tbody tr', getTable());
        };

        function isInputCell(header) {
            return inputKeys.includes(header);
        };

        function createInputsForRow(row, rowIndex) {
            var cells = $('td', row);
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
                    $idElement.attr('type', 'hidden')
                        .attr('name', 'po_items[' + rowIndex + '][id]')
                        .val(rowId);

                    $cell.append($idElement);

                    let $removeElement = $(document.createElement('input'));
                    $removeElement.attr('type', 'hidden')
                        .attr('name', 'po_items[' + rowIndex + '][removed]')
                        .addClass(removeInputClass)
                        .val('0');

                    $cell.append($removeElement);

                    let $removeButton = $(document.createElement('button'));
                    $removeButton.html('Remove')
                        .addClass(removeClass)
                        .attr('type', 'button');

                    $cell.append($removeButton);
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


        // Create inputs for all items
        function init() {
            getTableRows().each(function (rowIndex, row) {
                createInputsForRow(row, rowIndex);
            });
        };

        function getRowForChild(child) {
            return $(child).closest('tr');
        };

        function removeRow(row) {
            $('.' + removeInputClass, row).val(1);
            row.addClass('d-none');

            updateRemoveVisibilities();
        };

        function updateRemoveVisibilities() {
            // hide if only one row is available
        }

        init();
        addEvents();


        function addEvents() {
            $(document).on('click', removeButtonSelector, function (ev) {
                if (confirm('Are you sure you want to remove this item?')) {
                    removeRow(getRowForChild(ev.currentTarget));
                }
            });
            // $(invoiceValueSelector).on('keyup.impresario', function (ev) {
            //     var invoiceValue = parseFloat($(invoiceValueSelector).val()),
            //         remainingInitial = parseFloat(editData['amountRemaining']);

            //     if (isNaN(invoiceValue)) {
            //         invoiceValue = 0;
            //     }

            //     var remaining = remainingInitial - invoiceValue;

            //     if (!isNaN(remaining)) {
            //         remaining = Math.max(0, Math.round(remaining * 100) / 100);
            //         $(amountRemainingSelector).val("£" + remaining);
            //     } else {
            //         $(amountRemainingSelector).val('- -');
            //     }
            // });


        }
    });
}(jQuery));