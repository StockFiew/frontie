import React, { useState, useEffect } from 'react';
// stock information api
const API_KEY_FMP = process.env.REACT_APP_API_KEY_FMP;
const url = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&exchange=NASDAQ&dividendMoreThan=&api
key=${API_KEY_FMP}`;

export default function useStockSources() {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        setRowData(await getStockSources());
        setLoading(false);
      } catch (err) {
        setError(error);
        setLoading(false);
      }
    })();
  }, []);

  return {
    loading,
    rowData,
    error,
  };
}

async function getStockSources() {
  let res = await fetch(url);
  let data = await res.json();
  return data.map((stockSource) => ({
    symbol: stockSource.symbol,
    name: stockSource.companyName,
    industry: stockSource.sector,
  }));
}
