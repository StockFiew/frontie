import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';

// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)

export default function StocksScreen({ route }) {
  const { ServerURL, watchList } = useStocksContext();
  const [state, setState] = useState({ stocksData: [] });

  // can put more code here

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state
    fetchStockData();
  }, [watchList]);

  const fetchStockData = async () => {
    try {
      const response = await fetch(`${ServerURL}/stocks`);
      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        stocksData: data.stocks,
      }));
    } catch (error) {
      console.log('Error fetching stock data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.stocksData}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <View style={styles.stockItem}>
            <Text>{item.symbol}</Text>
            <Text>{item.name}</Text>
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
  // Add other styles as needed
});
