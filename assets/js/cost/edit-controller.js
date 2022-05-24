; (function ($) {
    $(document).on('ready', function () {
        var formSelector = '.js-cost-form',
            tableSelector = '.js-po-item-table',
            inputKeys = ['description', 'qty', 'unit_price'],
            inputClass = 'form-control',
            removeClass = 'btn btn-red btn-sm js-po-remove',
            removeButtonSelector = '.js-po-remove',
            removeInputClass = 'remove-status',
            createNewButtonSelector = '.js-po-item-create',
            poTotalInputSelector = '.js-po-total-value',
            amountRemainingSelector = '.js-amount-remaining-value',
            amountInvoicedSelector = '.js-amount-invoiced-value',
            statusSelector = '.js-status',
            createInvoiceButtonSelector = '.js-invoice-create-button',
            poItemValueAlert = 10000;

        function getTable() {
            return $(tableSelector);
        };

        function calculatePOItemTotals() {
            // Loop over all rows, calculate the totals. Use -- if anything is invalie
            var visibleRows = getTableRows(true);
            var total = 0;
            var amountInvoiced = parseFloat($(amountInvoicedSelector).data('actual-value'));
            amountInvoiced = isNaN(amountInvoiced) ? 0 : amountInvoiced;

            visibleRows.each(function (i, item) {
                var qty = parseFloat($('.type-qty', item).val());
                var unitPrice = parseFloat($('.type-unit_price', item).val());
                var rowTotal = qty * unitPrice;
                var totalCell = $('[data-code=total]', item);

                if (!isNaN(rowTotal) && qty > 0) {
                    rowTotal = Math.round(rowTotal * 100) / 100;
                    total += rowTotal;

                    totalCell.html("£" + rowTotal);
                } else {
                    totalCell.html('- -');
                }
            });

            // Store the actual value as an attribute so we can access quickly before saving.
            // The value check will change at some point to be server side so do here for now
            var amountRemaining = total - amountInvoiced;
            getPOTotalInput()
                .val("£" + total)
                .data('actual-value', total);

            getAmountRemainingInput().val("£" + amountRemaining.toFixed(2));
        }

        function getTableRows(visibleOnly = false) {
            var append = visibleOnly ? ':not(.d-none)' : '';
            return $('tbody tr' + append, getTable());
        };

        function isInputCell(header) {
            return inputKeys.includes(header);
        };

        function getRemoveButtons() {
            return $(removeButtonSelector, getTable());
        }

        function getPOTotalInput() {
            return $(poTotalInputSelector);
        }

        function getAmountRemainingInput() {
            return $(amountRemainingSelector);
        }

        function createInputsForRow(row, rowIndex = null) {
            var cells = $('td', row);
            // Get this from the adapted table template attribute in status-link-attribute-value
            var rowId = $(row).data('valueId');
            // Use the highest number of existing rows if rowIndex isn't provided
            var rowIndex = rowIndex === null ? getTableRows().length : rowIndex;

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
                $input.attr('maxlength', 255);
                $input.addClass('type-' + headerKey);

                $cell.append($input);

            });
        };


        // Create inputs for all items
        function init() {
            getTableRows().each(function (rowIndex, row) {
                createInputsForRow(row, rowIndex);
            });

            updateRemoveVisibilities();
            calculatePOItemTotals();
            updateStatus();
        };

        function getRowForChild(child) {
            return $(child).closest('tr');
        };

        function removeRow(row) {
            $('.' + removeInputClass, row).val(1);
            row.addClass('d-none');

            updateRemoveVisibilities();
            calculatePOItemTotals();
        };

        function updateRemoveVisibilities() {
            // hide if only one row is available    
            if (getTableRows(true).length > 1) {
                getRemoveButtons().removeClass('d-none');
            } else {
                getRemoveButtons().addClass('d-none');
            }
        };

        function createNewItem() {
            // Get the first row, remove table contents, add new
            $tableRow = getTableRows().first();

            if (!$tableRow) {
                return;
            }

            $clone = $tableRow.clone();
            $('td', $clone).html('')
                .data('value', '');

            $clone.removeClass('d-none')
                .data('valueId', null);

            createInputsForRow($clone);
            $('tbody', getTable()).append($clone);

            updateRemoveVisibilities();
            calculatePOItemTotals();
        };

        function updateStatus() {
            if ($(statusSelector).val() === 'closed') {
                $(createInvoiceButtonSelector).addClass('d-none');
            } else {
                $(createInvoiceButtonSelector).removeClass('d-none');
            }
        }

        init();
        addEvents();

        function addEvents() {
            var $document = $(document);
            $document.on('click', removeButtonSelector, function (ev) {
                if (confirm('Are you sure you want to remove this item?')) {
                    removeRow(getRowForChild(ev.currentTarget));
                }
            });

            $document.on('click', createNewButtonSelector, function (ev) {
                createNewItem();
            });

            $document.on('keyup', tableSelector + ' .type-qty', function (ev) {
                calculatePOItemTotals();
            });

            $document.on('keyup', tableSelector + ' .type-unit_price', function (ev) {
                calculatePOItemTotals();
            });

            $document.on('change', statusSelector, function (ev) {
                updateStatus();
            });

            // When the table has been replaced on save, re-run the init to create inputs
            $document.on('block.replacer.item.after.cost.item.list.table', init);
        }

        $(formSelector).on('submit.impresario', function (ev) {
            var poValue = parseFloat(getPOTotalInput().data('actual-value'));

            if (!isNaN(poValue) && poValue >= poItemValueAlert) {
                if (!confirm('The total PO Item value exceeds £10,000. Are you sure you want to proceed?')) {
                    ev.preventDefault();
                    // Note: ev.isPropagationStopped check added to the form validator widget to stop submissions.
                    ev.stopPropagation();

                    return false;
                }
            }
        });
    });
}(jQuery));