;(function($){
    $(document).on('ready', function(){
        function calculateProfit() {
            var sell = parseFloat($('.js-net-sell').val()),
                cost = parseFloat($('.js-net-cost').val());



            if(isNaN(sell) || isNaN(cost)){
                $('.js-profit-calculate').val('- -');
                $('.js-gp-calculate').val('- -');
                return;
            }

            var profit = sell - cost;

            $('.js-profit-calculate').val("£" + Math.round(profit * 100)/100);
            $('.js-gp-calculate').val((Math.round((profit / sell) * 10000)/100) + '%');
        }

        $('.js-net-sell, .js-net-cost').on('keyup', function(){
            calculateProfit();
        });

        calculateProfit();
    });
}(jQuery));