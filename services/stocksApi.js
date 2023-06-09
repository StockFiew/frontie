require('dotenv').config()
//const alpha = require('alphavantage')({ key: 'B96T0ORJMAO31936' });

const stocksApi = require('alphavantage')({ key: process.env.ALPHA_VENTAGE_API_KEY})

// Simple examples
// Use this to get the stock data from a symbol
// don't call here, require the stocksApi and call it from there


// READ THIS FULL DOCUMENT OF HOW TO USE THIS API
// https://github.com/zackurben/alphavantage/blob/master/README.md



// alpha.data.intraday(`msft`).then((data) => {
//   console.log(data);
// });
//
// alpha.forex.rate('btc', 'usd').then((data) => {
//   console.log(data);
// });
//
// alpha.crypto.daily('btc', 'usd').then((data) => {
//   console.log(data);
// });
//
// alpha.technical.sma(`msft`, `daily`, 60, `close`).then((data) => {
//   console.log(data);
// });
//
// alpha.performance.sector().then((data) => {
//   console.log(data);
// });
//
// alpha.experimental('CRYPTO_INTRADAY', { symbol: 'ETH', market: 'USD', interval: '5min' }).then((data) => {
//   console.log(data);
// });

module.exports = stocksApi