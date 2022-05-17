;(function($){
    var UPLOAD_COMPONENT_SELECTOR = '.js-file-uploader-component',
        TABLE_UPDATER_WIDGET = 'dbwpcoreTableUpdater',
        UPLOAD_CONTAINER_SELECTOR = '.js-file-upload-container',
        DELETE_SELECTOR = '.js-delete-confirm-file',
        UPLOAD_TABLE_SELECTOR = '.js-table-updater-file'

    $(function() {
        function applyBlockReplacerEvent(items) {
            $(items).on('block-replacer-before', function(ev, params){
                if(params['newBlock']){
                    if($.fn.itemDeleter){
                        var $deleteItems = $(DELETE_SELECTOR ,params['newBlock']);
                        $deleteItems.itemDeleter();
                        applyDeleteEvent($deleteItems);
                    }
                    applyBlockReplacerEvent(params['newBlock']);
                }
            });
        }

        // Update the table when an item's been deleted
        function applyDeleteEvent(items){
            $(items).on('itemdeletersuccess', function(){
                var tableUpdaterWidget = $(this).closest(UPLOAD_TABLE_SELECTOR).data(TABLE_UPDATER_WIDGET);

                if(tableUpdaterWidget){
                    tableUpdaterWidget.update();
                }
            });
        }

        // Update the table when an item has been uploaded
        function applyUploadEvent(){
            $(UPLOAD_COMPONENT_SELECTOR).on('fileuploadersuccess', function(){
                var $uploaderContainer = $(this).closest(UPLOAD_CONTAINER_SELECTOR),
                    tableUpdaterWidget = $(UPLOAD_TABLE_SELECTOR, $uploaderContainer).data(TABLE_UPDATER_WIDGET);

                if(tableUpdaterWidget){
                    tableUpdaterWidget.gotoPage(1).update();
                }
            });
        }

        applyBlockReplacerEvent($(UPLOAD_TABLE_SELECTOR));
        applyDeleteEvent($(DELETE_SELECTOR));
        applyUploadEvent();
    });
}(jQuery));