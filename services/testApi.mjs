// FAIL to use financialmodelingprep module

import axios from 'axios';
import { FMP_API_SECRET } from '@env';
import financialmodelingprep from 'financialmodelingprep';

// const testApi = require('financialmodelingprep')(FMP_API_SECRET);

const testApi = () => {
  const url = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=
    1000000000&betaMoreThan=1&volumeMoreThan=
    10000&exchange=NASDAQ&dividendMoreThan=&apikey=${FMP_API_SECRET}`;

  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
// ^ this works but 'const testApi = require('financialmodelingprep')(FMP_API_SECRET);' not work...

export default testApi;
