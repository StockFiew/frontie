import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import fmp from '../services/fmp';
import alpha from '../services/alpha';

export default function StocksScreen({ route }) {
  const { ServerURL, watchList } = useStocksContext();
  const [state, setState] = useState({ stocksData: [] });

  useEffect(() => {
    fetchStockData();
  }, [watchList]);

  const fetchStockData = () => {
    // Call the API to fetch stock data for each symbol in the watchlist
    Promise.all(
      watchList.map((symbol) =>
        fmp.api
          .stock(symbol)
          .quote()
          .then((res) => res.data)
          .catch((error) => {
            console.log(`Error fetching stock data for ${symbol}:`, error);
            return null;
          })
      )
    )
      .then((data) => {
        // Filter out any null values (error occurred during API call)
        const filteredData = data.filter((item) => item !== null);
        setState({ stocksData: filteredData });
      })
      .catch((error) => {
        console.log('Error fetching stock data:', error);
        setState({ stocksData: [] });
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.stocksData}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <View style={styles.stockItem}>
            <Text>{item.symbol}</Text>
            {/* <Text>{item.name}</Text> */}
            {/* Display other stock information */}
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
