;(function($){
	$(document).on('ready', function(){
		function calculateQuoteProfit() {
			var sell = parseFloat($('.js-net-sell').val());
			var cost = parseFloat($('.js-net-cost').val());

			if(isNaN(sell) || isNaN(cost)){
				return $('.js-profit-calculate').val('- -');
			}

			$('.js-profit-calculate').val("£" + Math.max(0, sell - cost));
		}

		$('.js-net-sell, .js-net-cost').on('keyup', function(){
			calculateQuoteProfit();
		});

		calculateQuoteProfit();
	});
}(jQuery));