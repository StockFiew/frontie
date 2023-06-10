// FAIL to use dotenv/config 2
// I refered this document: https://docs.expo.dev/guides/environment-variables/#dotenv
// https://github.com/motdotla/dotenv

import 'dotenv/config';
import path from 'path';

const dotenvPath = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: dotenvPath });

// require('dotenv').config();

const FMP_API_SECRET = process.env.FMP_API_SECRET;

console.log(FMP_API_SECRET);

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

export default testApi;
