const API_KEY = '6b5e8bedc6de039791e6bbd72013e79d'

const fmpApi = require('financialmodelingprep')(API_KEY)
// Official API documentation
// if you need to use an endpoint that is not supported by the wrapper
// use this to find the endpoints you need.
// https://site.financialmodelingprep.com/developer/docs/

// Wrapper readme and example of fmpAPI.
// https://github.com/patelneel55/financialmodelingprep/blob/master/README.md#api-documentation


// Only use this when you need the news from stock symbols. the parameter is a list.
export const fmpNewsApi = (symbols) => {
  const url = `https://financialmodelingprep.com/api/v3/stock_news?tickers=${symbols.join(',')}&page=0&apikey=${API_KEY}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}
export default fmpApi;
