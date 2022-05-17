;(function($) {
    /* Warns the user if the current record is changed by another user and offers a reload */
    $.widget('impresario.recordMonitor', {
        defaultElement: null,
        options: {
            id: null,
            endpoint: '',
            timestamp: null,
            interval: 7000,
            changeMessage: 'The record you are viewing has been changed by another user.\nWould you like to reload it? (You will lose any unsaved changes)'
        },
        timeoutId: null,
        request: null,
        polling: true,

        _create:function(){
            if(!this.options.endpoint || !this.options.timestamp || ! this.options.id){
                throw "Endpoint, timestamp and id required in options";
            }

            this.poll();
        },

        cancelTimeout: function(){
            if(this.timeoutId){
                window.clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
            return this;
        },

        poll: function(){
            var self = this;
            
            this.cancelTimeout();

            if(!this.polling){
                return;
            }

            this.timeoutId = window.setTimeout(function(){
                self.doRequest();
            }, this.options.interval);

            return this;
        },

        disable: function(){
            this.polling = false;
            this.cancelTimeout();
            return this._super();

        },

        enable: function(){
            this.polling = true;
            this.poll();
            return this._super();
        },

        processResponseData: function(responseData){
            if(responseData.data.updated){
                this.disable();
                
                if(window.confirm(this.options.changeMessage)){
                    window.location.reload();
                }
            }

            return this;
        },

        doRequest: function(){
            var self = this;

            if(this.request){
                try {
                    this.request.abort();
                } catch (e){
                    // For darling IE
                }
            }
            
            this.request = $.ajax(
                this.options.endpoint, {
                    method: 'POST',
                    data: {
                        'timestamp':this.options.timestamp,
                        'id': this.options.id
                    },
                    success: function(responseData){
                        self.processResponseData(responseData)
                    },
                    complete: function(){
                        self.poll();
                    }
                }
            );
            
            return this;
        }

    });
}(jQuery));