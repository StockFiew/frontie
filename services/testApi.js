import axios from 'axios';

const testApi = () => {
  const url = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&exchange=NASDAQ&dividendMoreThan=&apikey=6b5e8bedc6de039791e6bbd72013e79d`;

  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export default testApi;

// import axios from 'axios';

// const testApi = () => {
//   const url = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&exchange=NASDAQ&dividendMoreThan=&apikey=6b5e8bedc6de039791e6bbd72013e79d`;

//   return axios
//     .get(url)
//     .then((res) => res.data.map(item => ({
//       symbol: item.symbol,
//       companyName: item.companyName,
//       marketCap: item.marketCap,
//       sector: item.sector,
//       industry: item.industry,
//       beta: item.beta,
//       price: item.price,
//       lastAnnualDividend: item.lastAnnualDividend,
//       volume: item.volume,
//       exchange: item.exchange,
//       exchangeShortName: item.exchangeShortName,
//       country: item.country,
//       isEtf: item.isEtf,
//       isActivelyTrading: item.isActivelyTrading
//     })))
//     .catch((err) => {
//       console.error(err);
//       throw err;
//     });
// };

// export default testApi;
