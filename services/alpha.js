import axios from 'axios';
import { ALPHA_VENTAGE_API_KEY } from '@env';
import vantage from 'alphavantage';

const api = vantage({ key: ALPHA_VENTAGE_API_KEY });
// https://github.com/zackurben/alphavantage/blob/master/README.md

//const alphaApi = (symbols) => {
//  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbols}&apikey=${ALPHA_VENTAGE_API_KEY}`;
//
//  return axios
//    .get(url)
//    .then((res) => res.data)
//    .catch((err) => {
//      console.error(err);
//      throw err;
//    });
//};

const alpha = {
  api,
};

export default alpha;
