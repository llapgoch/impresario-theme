;(function($){
    var DEFAULT_INIT_SELECTOR = '.js-action-switcher';

    $.widget('impresario.actionSwitcher', {
        options: {
            jsDataKey: 'jsData',
            formContainerSelector: '.js-action-form',
            actionDataKey: 'action',
            actionFormElementSelector: '[name=action]',
            defaultAction: 'edit'
        },
        jsData: null,
        action: null,

        _create: function() {
            this._super();
            this.jsData = this.element.data(this.options.jsDataKey);

            if(!this.jsData || !this.jsData[this.options.actionDataKey]){
                throw 'Action switcher must have action defined in its data array'
            }

            if(!this.getFormContainer().length){
                throw 'Action switcher is not in defined form container selector';
            }

            if(!this.getActionElement().length){
                throw 'Action element could not be found';
            }

            this.action = this.jsData[this.options.actionDataKey];
            this.addEvents();
        },

        addEvents: function() {
            var events = {},
                self = this;

            events['click'] = function (ev) {
                ev.preventDefault();
                self.switchAction();
                self.submitForm();
            };

            $(this.getFormContainer()).on('formvalidatorsubmitcancel', function(){
                self.resetAction();
            });

            this._on(events);
            return this;
        },

        getFormContainer: function() {
            return this.element.closest(this.options.formContainerSelector);
        },

        getActionElement: function() {
            return $(this.options.actionFormElementSelector, this.getFormContainer());
        },

        switchAction: function() {
            this.getActionElement().val(this.action);
            return this;
        },

        submitForm: function () {
            this.getFormContainer().submit();
            return this;
        },

        resetAction: function() {
            this.getActionElement().val(this.options.defaultAction);
        }

    });

    function initialise(){
        $(DEFAULT_INIT_SELECTOR).actionSwitcher();
    }

    $(function() {
        initialise();
    });
}(jQuery));