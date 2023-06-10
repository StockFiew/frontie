import axios from 'axios';
import { FMP_API_SECRET } from '@env';

// import { FinancialModelingPrep } from 'financialmodelingprep';
//  (bySue) ^ expo doesn't support above module

// require('dotenv').config();
// const fmpApi = require('financialmodelingprep')(process.env.FMP_API_SECRET);
// (bySue)^ original code
// (bySue)The require('dotenv').config() function is not supported in Expo, and using it will result in an error.
// (bySue)please check freeform .env part

// const fmpApi = require('financialmodelingprep')(FMP_API_SECRET);
// (bySue)^ original code, expo doesn't support above module

// Official API documentation
// if you need to use an endpoint that is not supported by the wrapper
// use this to find the endpoints you need.
// https://site.financialmodelingprep.com/developer/docs/

// Wrapper readme and example of fmpAPI.
// https://github.com/patelneel55/financialmodelingprep/blob/master/README.md#api-documentation

// Only use this when you need the news from stock symbols. the parameter is a list.

const fmpApi = () => {
  const url = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=100000&exchange=NASDAQ&dividendMoreThan=&apikey=${FMP_API_SECRET}`;

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

export default { fmpApi, fmpNewsApi };
