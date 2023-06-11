import axios from 'axios';
import { FMP_API_SECRET } from '@env';

import fmpapi from 'financialmodelingprep';

const api = fmpapi(FMP_API_SECRET);

const search = (symbols, limit, exchange) => {
  const url = `https://financialmodelingprep.com/api/v3/search?query=${symbols}&limit=${limit}&exchange=${exchange}&apikey=${FMP_API_SECRET}`;

  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const news = (symbols) => {
  const url = `https://financialmodelingprep.com/api/v3/stock_news?tickers=${symbols.join(
    ','
  )}&page=0&apikey=${FMP_API_SECRET}`;

  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const fmp = {
  api,
  news,
  search
};

export default fmp;
