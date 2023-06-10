// FAIL to use dotenv/config (attempt 1)

import dotenv from 'dotenv';
dotenv.config();

const FMP_API_SECRET = process.env.FMP_API_SECRET;

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
