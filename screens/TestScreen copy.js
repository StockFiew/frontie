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
      .then((data) => {
        console.log(data); // Add this line to see the actual response data
        const stockData = [
          {
            timestamp: data[0].timestamp,
            '1. open': data[0].open,
            '2. high': data[0].dayHigh,
            '3. low': data[0].dayLow,
            '4. close': data[0].previousClose,
            '5. volume': data[0].volume,
          },
        ];
        setState({ stocksData: stockData });
      })
      .catch((error) => {
        console.log('Error fetching stock data:', error);
      });
  };

  return (
    <View style={styles.container}>
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
});
