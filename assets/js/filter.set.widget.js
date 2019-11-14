;(function($){
    var DEFAULT_INIT_SELECTOR = '.js-filter-set';

    $.widget('impresario.filterSet', {
        options: {
            jsDataKey: 'jsData',
            tableUpdaterSelectorKey: 'tableUpdaterSelector',
            elementSelector: '.js-filter-item',
            tableUpdaterWidgetName: 'dbwpcoreTableUpdater'
        },
        jsData: null,
        action: null,

        _create: function() {
            this._super();
            this.jsData = this.element.data(this.options.jsDataKey);

            if(!this.jsData || !this.jsData[this.options.tableUpdaterSelectorKey]){
                throw 'Filter set must have a linked table updater'
            }
           
            this.addEvents();
        },

        getTableUpdaterElement: function() {
            return $(this.jsData[this.options.tableUpdaterSelectorKey]);
        },

        addEvents: function() {
            var events = {},
                self = this;

            events['change ' + this.options.elementSelector] = function (ev) {
                ev.preventDefault();
                this.updateFilters(true);
            };

            events['keyup ' + this.options.elementSelector] = function (ev) {
                ev.preventDefault();
                this.updateFilters(true);
            };

            events['reset'] = function (ev) {
                this.updateFilters(true);
            };

            $(document).on('tableupdaterbeforeupdate', this.jsData[this.options.tableUpdaterSelectorKey], function(){
                self.updateFilters(false);
            });
           
            this._on(events);
            return this;
        },

        getFilterData: function()
        {
            return this.element.serializeJSON();
        },

        getTableUpdaterWidget: function()
        {
            var updater = this.getTableUpdaterElement().data(this.options.tableUpdaterWidgetName);
           
            if(!updater){
                throw 'Table updater widget not found'
            }

            return updater;
        },

        updateFilters: function(triggerUpdate) {
            var updater = this.getTableUpdaterWidget();
            triggerUpdate = triggerUpdate === false ? false : true;
            
            if(triggerUpdate){
                updater.gotoPage(1, false);
            }

            updater.addCustomData('filters', this.getFilterData(), triggerUpdate);
        }

    });

    function initialise(){
        $(DEFAULT_INIT_SELECTOR).filterSet();
    }

    $(function() {
        initialise();
    });
}(jQuery));