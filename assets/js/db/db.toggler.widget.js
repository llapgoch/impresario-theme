;(function($){
	/* Definition constants */
	window.Db = window.Db || {};
	var Static = window.Db.Toggler = {};

	Static.WIDGET_ID = "db.dbtoggler";
	Static.TRIGGER_TYPE_DIRECT = 'direct-only';
	Static.TRIGGER_TYPE_ALL = 'all';
	Static.ACTION_ACTIVATE = 'activate';
	Static.ACTION_DEACTIVATE = 'deactivate';
	Static.ACTION_TOGGLE = 'toggle';
	Static.INSTANCE_NAME = 'dbDbtoggler';

	// An array of all processed elements to prevent infinite loops
	Static.processed = [];

	// To reinitialise at a later point, use window.Db.Toggler.init();
	// Only initialise on elements which have been explicitly given a class of js-db-toggler an action,
	// or triggers for activate or deactivate
	Static.init = function(){
		$('.js-db-toggler, [data-db-toggler-action], ' +
			'[data-db-toggler-trigger-activate], ' +
			'[data-db-toggler-trigger-deactivate]').dbtoggler();
	};

	/* Initialisation */
	$(function() {
		Static.init();
	});


	/* Widget Definition*/
	$.widget(Static.WIDGET_ID, $.db.base, {
		options: {
			dataPrepend: 'dbToggler',
			dataAction: 'action',
			dataGroup: 'group',
			dataTrigger: 'trigger', // Type of event
			dataTriggerType: 'triggerType', // direct-only (only for this element) or all (allow bubbling)
			dataCascade: 'cascade',
			dataTarget: 'target',
			dataStateful: 'stateful',
			dataClosestContainer: 'closestContainer',
			/* A target to callback to and execute the action, but don't chain on its targets or cascades */
			dataTargetCallback: 'targetCallback',
			dataTriggerActivate: 'triggerActivate',
			dataTriggerDeactivate: 'triggerDeactivate',
			dataActiveInitial: 'activeInitial',
			dataKeyboardClose: 'keyboardClose',
			dataKeyboardCloseKeyCode: 'keyboardCloseKeyCode',
			dataDeactivateDelay: 'deactivateDelay',
			dataActivateDelay: 'activateDelay',

			triggerType: 'all',
			trigger: 'click',
			triggerActivate: '', // E.g. 'mouseenter'
			triggerDeactivate: '', // E.g. 'mouseleave'
			closestContainer: null, // A closest() container to look within for target selectors
			action: '',
			targetCallback: '',
			stateful: true,
			target: '',
			activeInitial: false,
			keyboardClose: false,
			keyboardCloseKeyCode: 27
		},

		// Initialise as jQuery arrays in constructor
		$targetElements: null,
		$targetCallbackElements: null,
		$cascadeElements: null,
		$groupElements: null,

		_create: function(){
			this._super();

			this.$targetElements = $([]);
			this.$targetCallbackElements = $([]);
			this.$cascadeElements = $([]);
			this.$groupElements = $([]);

			this._addEvents();

			if(this.getLocalOption(this.options.dataActiveInitial)){
				this.activate();
			}
		},

		_addEvents: function(){
			var self = this,
				events = {},
				documentEvents = {},
				action = this.getLocalOption(this.options.dataAction),
				triggerOn = this.getLocalOption(this.options.dataTrigger),
				triggerDeactivate = this.getLocalOption(this.options.dataTriggerDeactivate),
				triggerActivate = this.getLocalOption(this.options.dataTriggerActivate),
				triggerType = this.getLocalOption(this.options.dataTriggerType),
				keyboardClose = this.getLocalOption(this.options.dataKeyboardClose),
				keyboardCloseKeyCode = this.getLocalOption(this.options.dataKeyboardCloseKeyCode);


			// Explicitly require a data attribute of action to init this form of event
			if(action) {
				events[triggerOn] = function (ev) {
					if(triggerType == Static.TRIGGER_TYPE_DIRECT && (self.element.is(ev.target) === false)){
						return;
					}

					ev.preventDefault();

					self.performAction(action);
				};
			}

			if(triggerActivate) {
				events[triggerActivate] = function (ev) {
					if(triggerType == Static.TRIGGER_TYPE_DIRECT && (self.element.is(ev.target) === false)){
						return;
					}

					ev.preventDefault();
					self.activate();
				};
			}

			if(triggerDeactivate) {
				events[triggerDeactivate] = function (ev) {
					if(self.options.triggerType == Static.TRIGGER_TYPE_DIRECT && ev.target !== self.element){
						return;
					}
					ev.preventDefault();
					self.deactivate();
				};
			}

			// Add events for this element
			this._on(this.element, events);


			// Document events -- add the keyboard event to close if it's been set
			if(keyboardClose){
				documentEvents.keyup = function (ev) {
					if(ev.keyCode == keyboardCloseKeyCode){
						this.deactivate();
					}
				};
			}

			this._on( document,  documentEvents);
		},

		_getTargets: function(){
			return $(this.getLocalOption(this.options.dataTarget), this._getClosestContainer()).add(this.$targetElements);
		},

		_getTargetCallbackElements: function(){
			return $(this.getLocalOption(this.options.dataTargetCallback), this._getClosestContainer()).add(this.$targetCallbackElements);
		},

		_getGroupItems: function(){
			if(!this.getLocalOption(this.options.dataGroup)){
				return this.$groupElements;
			}

			return $(this._getGlobalDataSelector(this.options.dataGroup, this.getLocalOption(this.options.dataGroup)), this._getClosestContainer()).add(this.$groupElements);
		},

		// Cascades can be used by data-db-toggler-cascade, and can also be type based such
		// as data-db-toggle-cascade-activate and data-db-toggle-cascade-deactivate
		_getCascades: function(type){
			var cascade = this.getLocalOption(this.options.dataCascade) || '';

			if(type){
				var cascadeType = this.getLocalOption(this.options.dataCascade + '-' + type);

				if(cascadeType){
					cascade = cascade ? ", " + cascadeType : cascadeType;
				}
			}

			return $(cascade, this._getClosestContainer()).add(this.$cascadeElements);
		},

		_getClosestContainer: function(){
			var closestContainer = this.getLocalOption(this.options.dataClosestContainer);

			if(!closestContainer){
				return document;
			}

			var $container = this.element.closest(closestContainer);

			if($container.length){
				return $container;
			}

			return document;
		},

		// Create a toggle instance on the element if one doesn't exist, default the trigger to null so it
		// does not listen for events, unless overridden by data-db-toggler-trigger
		_getInstance: function($el){

			if(!$el.data(Static.INSTANCE_NAME)){
				$el.dbtoggler({
					trigger: null
				});
			}

			return $el.data(Static.INSTANCE_NAME);
		},

		_removeActiveClass: function () {
			this._removeClass(this.getActiveClass());
		},

		_addActiveClass: function () {
			this._addClass(this.getActiveClass());
		},

		_addInactiveClass: function () {
			this._addClass(this.getInactiveClass());
		},

		_removeInactiveClass: function () {
			this._removeClass(this.getInactiveClass());
		},

		_isStateful: function(){
			return this.getLocalOption(this.options.dataStateful);
		},


		/******************************************
		 * Public methods
		 ******************************************/

		activate: function(partOfChain, cascade, delay){
			this.performAction(Static.ACTION_ACTIVATE, partOfChain, cascade, delay);
		},

		deactivate: function(partOfChain, cascade, delay){
			this.performAction(Static.ACTION_DEACTIVATE, partOfChain, cascade, delay);
		},

		toggle: function(){
			this.performAction(Static.ACTION_TOGGLE);
		},

		isActive: function(){
			return this.element.hasClass(this.getActiveClass());
		},

		addTargetElement: function($el){
			this.$targetElements = this.$targetElements.add($el);
		},

		addGroupElements: function($els){
			this.$groupElements = this.$groupElements.add($els);
		},

		removeTargetElement: function($el){
			this.$targetElements = this.$targetElements.not($($el));
		},

		addCascadeElement: function($el){
			this.$cascadeElements = this.$cascadeElements.add($($el));
		},

		removeCascadeElement: function($el){
			this.$cascadeElements = this.$cascadeElements.not($($el));
		},

		addTargetCallbackElement: function($el){
			this.$targetCallbackElements = this.$targetCallbackElements.add($($el));
		},

		removeTargetCallbackElement: function($el){
			this.$targetCallbackElements = this.$targetCallbackElements.not($($el));
		},

		destroy: function(){
			this._super();
			this._removeActiveClass();
			this._removeInactiveClass();
		},

		performAction: function(type, partOfChain, cascade, delay){
			var self = this,
				stateful = this._isStateful(),
				thisType = type,
				group;


			// Default to true for cascades
			cascade = cascade === false ? false : true;
			delay = isNaN(parseInt(delay, 10)) ? null : parseInt(delay, 10);

			if(!partOfChain){
				Static.processed = [];
			}

			if(Static.processed.indexOf(this.element) !== -1){
				return;
			}

			// Add this element to the processed chain so we don't get an infinite loop
			Static.processed.push(this.element);

			if(!type){
				type = this.options.action;
			}

			// Flip the actions if we're toggling, but only for this instance -- each element down the chain
			// should also toggle
			if(type == Static.ACTION_TOGGLE){
				thisType = this.isActive() ? Static.ACTION_DEACTIVATE : Static.ACTION_ACTIVATE;
			}


			if(thisType == Static.ACTION_ACTIVATE){
				if(delay === null) {
					delay = this.getLocalOption(this.options.dataActivateDelay);
				}

				// Deal with groups
				$(this._getGroupItems()).each(function(){
					var $this = $(this);

					// Don't do anything for *this* element, we're only interested in
					// deactivating other members of the group
					if($this.is(self.element)){
						return true;
					}

					// Don't cascade when deactivating group items otherwise targets
					// which should remain active will be deactivated

					self._getInstance($this).deactivate(true, true, 0);
				});
			}

			if(thisType == Static.ACTION_DEACTIVATE && delay === null){
				delay = this.getLocalOption(this.options.dataDeactivateDelay);
			}

			delay = isNaN(delay) ? 0 : delay;

			var action = function(){
				if(thisType == Static.ACTION_ACTIVATE){
					if(stateful) {
						self._addActiveClass();
						self._removeInactiveClass();
					}

				}else{
					if(stateful) {
						self._removeActiveClass();
						self._addInactiveClass();
					}
				}

				// TODO: Consider merging cascades and targets (they appear to be synonymous) into something like 'chain'
				if(cascade) {
					var totalElements = self._getTargets().toArray().concat(self._getCascades(type).toArray());

					$(totalElements).each(function () {
						var $this = $(this);

						self._getInstance($this).performAction(type, true);
					});
				}

				// data-db-toggler-target-callback allows a selector to be chained, without it having its targets
				// or cascades also called. Most useful for group items to call back to a button or link
				var $targetCallback = self._getTargetCallbackElements();

				$targetCallback.each(function(){
					var $this = $(this);

					self._getInstance($this).performAction(type, true, false);
				});

				self._trigger(thisType);
			};

			if(delay == 0) {
				action();
			}else{
				this._delay(action, delay);
			}
		}
	});
}(jQuery));