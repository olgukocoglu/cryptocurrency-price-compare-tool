module.exports = {
  CombinePrices: function (bittrexPrices, poloniexPrices, binancePrices) {
    var combinedPrices = [];

    if (bittrexPrices !== 'error') {
      bittrexPrices.forEach(bittrexPrice => {
        combinedPrices.push({ name: bittrexPrice.MarketName, bittrex: bittrexPrice.Last });
      });
    }

    var priceTagExists = false;
    if (poloniexPrices !== 'error') {
      for (var poloniexPriceTag in poloniexPrices) {
        poloniexPriceTagFixed = poloniexPriceTag.replace('_', '-');
        priceTagExists = false;

        for (var i = 0; i< combinedPrices.length; i++) {
          combinedPrice = combinedPrices[i]
          if (combinedPrice.name === poloniexPriceTagFixed) {
            combinedPrice.poloniex = poloniexPrices[poloniexPriceTag].last;
            priceTagExists = true;
            break;
          }
        };

        if (!priceTagExists)
          combinedPrices.push({ name: poloniexPriceTagFixed, poloniex: poloniexPrices[poloniexPriceTag].last });
      };
    }

    if (binancePrices !== 'error') {
      binancePrices.forEach(binancePrice => {
        priceTagExists = false;
        binancePrice.symbol = FixBinancePriceTag(binancePrice.symbol)
        
        for (var i = 0; i< combinedPrices.length; i++) {
          combinedPrice = combinedPrices[i]
          if (combinedPrice.name === binancePrice.symbol) {
            combinedPrice.binance = binancePrice.price;
            priceTagExists = true;
            break;
          }
        };
        
        if (!priceTagExists)
          combinedPrices.push({ name: binancePrice.symbol, binance: binancePrice.price });
      });
    }

    return combinedPrices;

    function FixBinancePriceTag(binancePriceTag) {
      baseCurrencyTags = ['BTC', 'ETH', 'USDT', 'USDC', 'USD', 'PAX', 'BNB', 'TRY'];
      for (var i = 0; i< baseCurrencyTags.length; i++) {
        var baseCurrencyIndex = binancePriceTag.indexOf(baseCurrencyTags[i]);
        if (baseCurrencyIndex > 0) {
          binancePriceTag = binancePriceTag.slice(baseCurrencyIndex) + '-' + binancePriceTag.slice(0, baseCurrencyIndex);
          return binancePriceTag;
        }
      };
      return binancePriceTag
    }
  },

  AddPercentages: function (data) {
    for (i = 0; i < data.length; i++) {
      values = Object.values(data[i]);
      percentage = 0;

      for (j = 1; j < values.length; j++) {
        firstValue = parseFloat(values[j]);

        for (k = j + 1; k < values.length; k++) {
          secondValue = parseFloat(values[k]);

          if (firstValue >= secondValue) {
            tempPercentage = (firstValue / secondValue);
          } else {
            tempPercentage = (secondValue / firstValue);
          }

          tempPercentage -= 1;

          if (tempPercentage > percentage) {
            percentage = tempPercentage;
          }
        }
      }
      if (percentage > 0) {
        percentage = Math.round(percentage * 10000) / 100;
        data[i].percentage = ('%' + percentage);
      }
    }
  },

  SortByName: function (data) {
    data.sort(function(a, b) {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  }
}