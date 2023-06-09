import axios from 'axios';
import { FMP_API_SECRET } from '@env';

const testApi = () => {
  const url = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=
  1000000000&betaMoreThan=1&volumeMoreThan=10000&exchange=NASDAQ&dividendMoreThan=&apikey=${FMP_API_SECRET}`;

  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const fmpNewsApi = (symbols) => {
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

export default { testApi, fmpNewsApi };
