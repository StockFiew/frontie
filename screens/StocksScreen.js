import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import fmp from '../services/fmp';
import alpha from '../services/alpha';

export default function StocksScreen({ route }) {
  const { ServerURL, watchList, removeFromWatchlist } = useStocksContext();
  const [state, setState] = useState({ stocksData: [] });

  useEffect(() => {
    fetchStockData();
  }, [watchList]);

  const fetchStockData = () => {
    // Extract symbols from the watchlist
    const symbols = watchList.map((item) => item.symbol);

    // Fetch stock data for each symbol
    Promise.all(symbols.map((symbol) => fmp.api.stock(symbol).quote()))
      .then((responses) => {
        const stocksData = responses.map((response) => response[0]);
        setState({ stocksData });
      })
      .catch((error) => {
        console.error('Error fetching stock data:', error);
      });
  };

  const renderStockItem = ({ item }) => {
    const handleDelete = () => {
      Alert.alert(
        'Delete Stock',
        'Are you sure you want to remove this stock from your watchlist?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => removeFromWatchlist(item.symbol),
          },
        ],
        { cancelable: true }
      );
    };

    return (
      <TouchableOpacity
        style={styles.stockItem}
        onPress={handleDelete}
        // onLongPress={handleDelete}
      >
        <Text>{item.symbol}</Text>
        <Text>{item.companyName}</Text>
        {/* Display other stock information */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.stocksData}
        keyExtractor={(item) => item.symbol}
        renderItem={renderStockItem}
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
