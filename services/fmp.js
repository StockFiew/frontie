import axios from 'axios';
import { FMP_API_SECRET } from '@env';

import fmpapi from 'financialmodelingprep';

const api = fmpapi(FMP_API_SECRET);

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
  news
};

export default fmp;
