;(function($){
	var DEFAULT_INIT_SELECTOR = '.js-delete-confirm';

	$.widget('impresario.itemDeleter', {
		options: {
			jsDataKey: 'jsData',
			endpointDataKey: 'endpoint',
			typeKey: 'type',
			returnUrlKey: 'returnUrl'
		},
		jsData: null,
		request: null,
		endpoint: '',
		type: '',
		returnUrl: '',

		_create: function(){
			this._super();
			this.jsData = this.element.data(this.options.jsDataKey);

			if(!this.jsData || !this.jsData[this.options.endpointDataKey] || !this.jsData[this.options.returnUrlKey]){
				throw 'Deleter must have endpoint and returnUrl in its data array'
			}

			this.endpoint = this.jsData[this.options.endpointDataKey];
			this.type = this.jsData[this.options.typeKey];
			this.returnUrl = this.jsData[this.options.returnUrlKey];
			
			this.addEvents();
		},
		
		addEvents: function() {
			var events = {},
				self = this;
			
			events['click'] = function (ev) {
				ev.preventDefault();

				if(!confirm('Are you sure you want to remove this' + (this.type ? ' ' + this.type.toLowerCase() : '') + '?')){
					return;
				}

				self.callRemove();
			};

			this._on(events);
		},

		callRemove: function() {
			var self = this;

			if(this.request){
				try {
					this.request.abort();
				} catch (e){
					// For darling IE
				}
			}

			this.request = $.ajax(
				this.endpoint, {
					complete: function(request){
						if(request.status == 200){
							window.location = self.returnUrl;
						}
					},
					error: function(request){
						if(request.status !== 0) {
							alert(self.options.updateErrorMessage);
						}
					}
				}
			);
		}
	});

	function initialise(){
		$(DEFAULT_INIT_SELECTOR).itemDeleter();
	}

	$(document).on('ready.impresarioitemdeleter', function(){
		initialise();
	});
}(jQuery));