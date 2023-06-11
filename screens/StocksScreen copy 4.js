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

  const fetchStockData = async () => {
    // Extract symbols from the watchlist
    const symbols = watchList.map((item) => item.symbol);
    // alpha.api.data
    //   .intraday('msft')
    //   .then((data) => JSON.stringify(data))
    //   .then((data) => {
    //     console.log(data);
    //   });

    try {
      // Fetch stock data for each symbol
      const responses = await Promise.all(
        symbols.map((symbol) => fmp.api.stock(symbol).quote())
      );
      const stocksData = responses.map((response) => response[0]);
      setState({ stocksData });
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleDelete = (item) => {
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

  const renderStockItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.stockItem}
        onPress={() => handleDelete(item)}
      >
        <Text style={styles.stockSymbol}>{item.symbol}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.stocksData}
        keyExtractor={(item) => item.symbol}
        renderItem={renderStockItem}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleSize(16),
  },
  flatListContent: {
    paddingBottom: scaleSize(16),
  },
  stockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleSize(15),
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: scaleSize(4),
  },
  stockSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: scaleSize(20),
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: scaleSize(8),
  },
});
