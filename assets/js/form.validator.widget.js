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
			scrollPadding: 50
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
				|| !this.jsData[this.options.endpointSaveDataKey]
				|| !this.jsData[this.options.endpointValidateSaveDataKey]
				|| !this.jsData[this.options.idDataKey]
				|| !this.jsData[this.options.idElementSelectorDataKey]){
				throw 'Form Validator must have an ID element selector, validate and save endpoint defined in jsData'
			}

			this.endpointSave = this.jsData[this.options.endpointSaveDataKey];
			this.endpointValidateSave = this.jsData[this.options.endpointValidateSaveDataKey];
			this.idElementSelector = this.jsData[this.options.idElementSelectorDataKey]

			if(!this.getIdElement().size()){
				throw 'id Element could not be found';
			}

			this.serializeFormData();
			this.addEvents();
		},

		getIdElement()
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
				self.removeErrors();

				if(!self.isValidated) {
					ev.preventDefault();
					self.doValidateSaveRequest();
				}
			};

			this._on(events);

			// Add events to all link elements
			$('a').on('click.impresarioformvalidator', function(ev){
				var $this = $(this),
					href = $this.attr('href');

				// Don't do anything for local links
				if(href.indexOf('#') == 0){
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
			this.doRequest(this.endpointSave);
			return this;
		},

		doRequest: function(endpoint)
		{
			var self = this,
				formData = {};

			if(this.request){
				try {
					this.request.abort();
				} catch (e){
					// For darling IE
				}
			}

			$($(this.element).serializeArray()).each(function(i){
				formData[this.name] = this.value;
			});

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

				return this;
			}

			// Set the form field ID to the saved entity's ID
			if(jsonData[this.options.idDataKey]){
				this.getIdElement().val(jsonData[this.options.idDataKey]);
			}

			if(jsonData['confirm']){
				if(window.confirm(jsonData['confirm'])){
					this.doSaveRequest();
					return this;
				}
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
		}
	});

	function initialise(){
		$(DEFAULT_INIT_SELECTOR).formValidator();
	}

	$(document).on('ready.impresariovalidator', function(){
		initialise();
	});
}(jQuery));