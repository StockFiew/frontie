import axios from 'axios';
import { ALPHA_VENTAGE_API_KEY } from '@env';
import vantage from 'alphavantage';
const header = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};
const api = vantage({ key: ALPHA_VENTAGE_API_KEY });
// https://github.com/zackurben/alphavantage/blob/master/README.md

const adjusted = (symbols) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbols}&apikey=${ALPHA_VENTAGE_API_KEY}`;
  return fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.2; Win64; x64; en-US) AppleWebKit/603.24 (KHTML, like Gecko) Chrome/52.0.2739.349 Safari/533',
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Status: ' + res.status);
      }
      return res.json();
    })
    .catch((err) => {
      console.log('Error:', err);
      return null;
    });
};

const time_series = (symbol, interval="15min", outputsize="compact") => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&datatype=json&apikey=${ALPHA_VENTAGE_API_KEY}`;

  return fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.2; Win64; x64; en-US) AppleWebKit/603.24 (KHTML, like Gecko) Chrome/52.0.2739.349 Safari/533',
    },
  }).then((res) => {
      if (res.status !== 200) {
        throw new Error('Status: ' + res.status);
      }
      return res.json();
    })
    .catch((err) => {
      console.log('Error:', err);
      return null;
    });
}


const alpha = {
  api,
  adjusted,
  time_series
};

export default alpha;
