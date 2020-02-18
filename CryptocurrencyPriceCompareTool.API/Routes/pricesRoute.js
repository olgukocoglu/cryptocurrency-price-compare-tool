var request = require('request');
var Helpers = require('../Helpers/PriceHelper')

module.exports = app => {
  app.get('/GetPrices', async (req, res) => {
    var _this = this;
    var env = process.env;
    
    request(env.BITTREX_URL, (error, response, body) => {
      if (error || response.statusCode != 200)
        _this.bittrexPrices = 'error';
      else
        _this.bittrexPrices = JSON.parse(body).result;
      if (_this.poloniexPrices && _this.binancePrices) {
        returnResults();
      }
    });

    request(env.POLONIEX_URL, (error, response, body) => {
      if (error)
        _this.poloniexPrices = 'error';
      else {
        _this.poloniexPrices = JSON.parse(body);
        if (_this.poloniexPrices.error)
          _this.poloniexPrices = 'error';
      }
      if (_this.bittrexPrices && _this.binancePrices) {
        returnResults();
      }
    });

    request(env.BINANCE_URL, (error, response, body) => {
      if (error || response.statusCode != 200)
        _this.binancePrices = 'error';
      else
        _this.binancePrices = JSON.parse(body);
      if (_this.bittrexPrices && _this.poloniexPrices) {
        returnResults();
      }
    });

    function returnResults () {
      var combinedPrices = Helpers.CombinePrices(_this.bittrexPrices, _this.poloniexPrices, _this.binancePrices);
      Helpers.AddPercentages(combinedPrices);
      Helpers.SortByName(combinedPrices);
      return res.send(combinedPrices);
    }
  });
};