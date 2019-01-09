;(function($){
    var UPLOAD_COMPONENT_SELECTOR = '.js-file-uploader-component';
    var ITEM_DELETER_WIDGET = 'itemDeleter';

    $(document).on('ready.impresariofileuploadhelper', function(){
        var uploaderSelector = '.js-file-uploader-component',
            uploadTableSelector = '.js-table-updater-file',
            deleteSelector = '.js-delete-confirm';

        function initialise(){
            /*  This is nasty, but is this way because: tableupdatersucces fires before 
                the ajaxSuccess global method which replaces the HTML and reinits the widget
                (therefore the complete event won't fire on the element). Set the interval so 
                that the HTML has been replaced and we can initialise on the new element */
            if($.fn.itemDeleter){
                $(uploadTableSelector).on('tableupdatersuccess', function(){
                    window.setTimeout(function(){
                        jQuery(deleteSelector).itemDeleter();
                        initialise();
                    }, 10);
                });
            }
        }
       
        initialise();
    });
}(jQuery));