;(function($){
    var UPLOAD_COMPONENT_SELECTOR = '.js-file-uploader-component';
    var ITEM_DELETER_WIDGET = 'itemDeleter';

    $(document).on('ready.impresariofileuploadhelper', function(){
        var uploaderSelector = '.js-file-uploader-component',
            uploadTableSelector = '.js-table-updater-file',
            deleteSelector = '.js-delete-confirm';

        function initialise(){
            if($.fn.itemDeleter){
                $(uploadTableSelector).on('block-replacer-before', function(ev, params){
                    if(params['newBlock']){
                        $(deleteSelector ,params['newBlock']).itemDeleter();
                    }
                });
            }
        }
       
        initialise();
    });
}(jQuery));