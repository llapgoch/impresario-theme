;(function($) {
    var DEFAULT_INIT_SELECTOR = '.js-validate-form';
    
    $.widget('impresario.formValidator', {
        options: {
            jsDataKey: 'jsData',
            endpointValidateSaveDataKey: 'endpointValidateSave',
            endpointSaveDataKey: 'endpointSave',
            idElementSelectorDataKey: 'idElementSelector',
            idDataKey: 'idKey',
            errorContainerSelector: '.js-error-container',
            validateErrorMessage: 'An error occurred during form submission, please try again',
            errorClass: 'form-input-error',
            idResultDataKey: 'id',
            scrollTime: 500,
            scrollPadding: 50,
            loaderClass: 'js-show-loader',
            initiatorLoaderClass: 'js-show-loader'
        },
        jsData: null,
        request: null,
        idElementSelector: null,
        idKey: null,
        endpointSave: '',
        endpointValidateSave: '',
        isValidated: false,
        serializedData: null,
        redirectUrl: null,

        _create: function()
        {
            this.jsData = this.element.data(this.options.jsDataKey);

            if(!this.jsData
				|| !this.jsData[this.options.endpointValidateSaveDataKey]
				|| !this.jsData[this.options.idDataKey]
				|| !this.jsData[this.options.idElementSelectorDataKey]){
                throw 'Form Validator must have an ID element selector, validate and save endpoint defined in jsData'
            }

            this.endpointSave = this.jsData[this.options.endpointSaveDataKey];
            this.endpointValidateSave = this.jsData[this.options.endpointValidateSaveDataKey];
            this.idElementSelector = this.jsData[this.options.idElementSelectorDataKey]

            if(!this.getIdElement().length){
                throw 'id Element could not be found';
            }

            this.serializeFormData();
            this.addEvents();
        },

        getIdElement: function()
        {
            return $(this.idElementSelector, this.element);
        },

        serializeFormData: function()
        {
            this.serializedData = this.getSerializedFormData();
            return this;
        },

        getSerializedFormData: function()
        {
            return $(':not([readonly])', this.element).serialize();
        },

        hasFormChanged: function()
        {
            return this.getSerializedFormData() !== this.serializedData;
        },

        addEvents: function()
        {
            var self = this,
                events = {};

            events['submit'] = function(ev){
                // Go no further if the event was stopped up the chain
                if(ev.isPropagationStopped()) {
                    return;
                }

                self.removeErrors();
                self.addLoader();

                if(!self.isValidated) {
                    ev.preventDefault();
                    self.doValidateSaveRequest();
                }
            };

            // Trigger this event on the form to re-serialise the data (E.g. after adding fields with JS)
            events['updateFormData'] = function(ev) {
                self.serializeFormData();
            }

            this._on(events);

            // Add events to all link elements
            $('a').on('click.impresarioformvalidator', function(ev){
                var $this = $(this),
                    href = $this.attr('href');

                // Don't do anything for local links
                if(href && href.indexOf('#') == 0){
                    return;
                }

                if(self.hasFormChanged()){
                    if(window.confirm('Would you like to save your changes before leaving this page?')){
                        ev.preventDefault();
                        self.redirectUrl = href;
                        self.doValidateSaveRequest();
                    }
                }
            });
        },

        removeErrors: function()
        {
            $('*', this.element).removeClass(this.options.errorClass);
        },

        doValidateSaveRequest: function()
        {
            this.doRequest(this.endpointValidateSave);
            return this;
        },

        doSaveRequest: function()
        {
            if(!this.endpointSave) {
                throw new Error('endpointSave not defined');
            }
            
            this.doRequest(this.endpointSave);
            return this;
        },

        addLoader: function()
        {
            this.element.addClass(this.options.loaderClass);
        },

        removeLoader: function()
        {
            this.element.removeClass(this.options.loaderClass);
        },

        doRequest: function(endpoint)
        {
            var self = this;

            if(this.request){
                try {
                    this.request.abort();
                } catch (e){
                    // For darling IE
                }
            }

            // Provided by the serialize object plugin
            var formData = $(this.element).serializeObject();

            this.request = $.ajax(
                endpoint, {
                    method: 'POST',
                    data: {'formValues':formData, navigatingAway: this.redirectUrl !== null ? 1 : 0},
                    complete: function(request){
                        if(request.status == 200
							&& request.responseJSON && request.responseJSON['data']){
                            self.processResponse(request.responseJSON['data'])
                        }else{
                            alert(self.options.validateErrorMessage);
                            self.removeLoader();
                        }
                    }
                }
            );
        },

        scrollToForm: function()
        {
            $('body,html').animate(
                {'scrollTop': $(this.element).offset().top - this.options.scrollPadding},
                this.options.scrollTime
            );
        },

        processResponse: function(jsonData)
        {
            if(jsonData['hasErrors']){
                this.scrollToForm();

                var fields = jsonData['errorFields'];

                for(var i in fields){
                    if(!fields.hasOwnProperty(i)){
                        continue;
                    }

                    $('[name="' + i + '"]', this.element).addClass(this.options.errorClass);
                }

                this._trigger('submitcancel');
                this.removeLoader();
                this.redirectUrl = null;

                return this;
            }

            // Set the form field ID to the saved entity's ID
            if(jsonData[this.options.idDataKey]){
                this.getIdElement().val(jsonData[this.options.idDataKey]);
            }

            if(jsonData['confirm']){
                if(window.confirm(jsonData['confirm'])){
                    this.doSaveRequest();
                }else{
                    this._trigger('submitcancel');
                    this.removeLoader();
                    this.redirectUrl = null;
                }

                return this;
            }

            if(this.redirectUrl){
                window.location.href = this.redirectUrl;
                return this;
            }

            if(jsonData['redirect']){
                window.location.href = jsonData['redirect'];
                return this;
            }

            this.serializeFormData();
            this.redirectUrl = null;
            this.removeLoader();
        }
    });

    function initialise(){
        $(DEFAULT_INIT_SELECTOR).formValidator();
    }

    $(function() {
        initialise();
    });
}(jQuery));