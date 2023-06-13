import { FMP_API_SECRET } from '@env';

import fmpapi from 'financialmodelingprep';

const api = fmpapi(FMP_API_SECRET);
const search = (symbols, limit, exchange) => {
  const url = `https://financialmodelingprep.com/api/v3/search?query=${symbols}&limit=${limit}&exchange=${exchange}&apikey=${FMP_API_SECRET}`;
  console.log(url);

  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
    });
};

const price_target = (symbol) => {
  const url = `https://financialmodelingprep.com/api/v4/price-target?symbol=${symbol}&apikey=${FMP_API_SECRET}`
  console.log(url);
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
}


const news = (symbols) => {
  const url = `https://financialmodelingprep.com/api/v3/stock_news?tickers=${symbols}&page=0&apikey=${FMP_API_SECRET}`;
  console.log(url)
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const fmp = {
  api,
  news,
  price_target,
  search
};

export default fmp;