import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import fmp from '../services/fmp';
import alpha from '../services/alpha';

export default function TestScreen({ route }) {
  const { ServerURL, watchList } = useStocksContext();
  const [state, setState] = useState({ stocksData: [] });

  useEffect(() => {
    fetchStockData();
  }, [watchList]);

  const fetchStockData = () => {
    fmp.api
      .stock('GOOG')
      .quote()
      .then((data) => JSON.stringify(data))
      .then((data) => {
        console.log(data).catch((err) => console.log(err));
      });
  };

  useEffect(() => {
    const stockData = Object.entries(jsonData['Time Series (1min)']).map(
      ([timestamp, values]) => ({
        timestamp,
        ...values,
      })
    );
    setState({ stocksData: stockData });
  }, [jsonData]);

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={state.stocksData}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <View style={styles.stockItem}>
            <Text>{item.symbol}</Text>
            <Text>{item.companyName}</Text>
            Display other stock information
          </View>
        )}
      /> */}

      <FlatList
        data={state.stocksData}
        keyExtractor={(item) => item.timestamp}
        renderItem={({ item }) => (
          <View>
            <Text>Timestamp: {item.timestamp}</Text>
            <Text>Open: {item['1. open']}</Text>
            <Text>High: {item['2. high']}</Text>
            <Text>Low: {item['3. low']}</Text>
            <Text>Close: {item['4. close']}</Text>
            <Text>Volume: {item['5. volume']}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleSize(16),
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaleSize(8),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
