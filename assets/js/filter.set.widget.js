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
                this.updateFilters();
            };

            events['keyup ' + this.options.elementSelector] = function (ev) {
                ev.preventDefault();
                this.updateFilters();
            };
           
            this._on(events);
            return this;
        },

        getFilterData: function()
        {
            return this.element.serializeJSON();
        },

        updateFilters: function() {
            var updater = this.getTableUpdaterElement().data(this.options.tableUpdaterWidgetName);
            
            if(!updater){
                throw 'Table updater widget not found'
            }

            updater.addCustomData('filters', this.getFilterData());
        }

    });

    function initialise(){
        $(DEFAULT_INIT_SELECTOR).filterSet();
    }

    $(function() {
        initialise();
    });
}(jQuery));