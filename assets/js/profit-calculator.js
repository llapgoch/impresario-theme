;(function($){
	$(document).on('ready', function(){
		function calculateQuoteProfit() {
			var sell = parseFloat($('.js-net-sell').val());
			var cost = parseFloat($('.js-net-cost').val());

			if(isNaN(sell) || isNaN(cost)){
				$('.js-profit-calculate').val('- -');
				$('.js-gp-calculate').val('- -');
				return;
			}

			var profit = Math.max(0, sell - cost);

			$('.js-profit-calculate').val("£" + profit);

			if(profit && cost) {
				$('.js-gp-calculate').val(Math.round((profit / cost) * 100) / 100);
			}else{
				$('.js-gp-calculate').val('- -');
			}
		}

		$('.js-net-sell, .js-net-cost').on('keyup', function(){
			calculateQuoteProfit();
		});

		calculateQuoteProfit();
	});
}(jQuery));