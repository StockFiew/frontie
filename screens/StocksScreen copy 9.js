import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import fmp from '../services/fmp';

export default function StocksScreen({ route }) {
  const { ServerURL, watchList, removeFromWatchlist } = useStocksContext();
  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    fetchStockData();
  }, [watchList]);

  useEffect(() => {
    console.log('Watchlist:', watchList);
  }, [watchList]);

  const fetchStockData = async () => {
    const symbols = watchList.map((item) => item['1. symbol']);

    try {
      // Fetch stock data for each symbol
      const responses = await Promise.all(
        symbols.map((symbol) => fmp.api.stock(symbol).quote())
      );

      const stocksData = responses.map((response) => response && response[0]); // Check if response is defined
      setStocksData(stocksData);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setStocksData([]); // Reset stocksData to an empty array on error
    }
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
            onPress: () => removeFromWatchlist(item['1. symbol']),
          },
        ],
        { cancelable: true }
      );
    };

    return (
      <TouchableOpacity style={styles.stockItem} onPress={handleDelete}>
        <Text style={styles.stockSymbol}>{item['1. symbol']}</Text>
        <Text style={styles.stockName}>{item['2. name']}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {stocksData.length > 0 ? (
        // <FlatList
        //   data={stocksData}
        //   keyExtractor={(item) => item['1. symbol']}
        //   renderItem={renderStockItem}
        // />
        <FlatList
          data={stocksData}
          keyExtractor={(item) => item['1. symbol']}
          renderItem={renderStockItem}
        />
      ) : (
        <Text style={styles.noWatchlistText}>No stocks in watchlist</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  stockItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  stockSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stockName: {
    fontSize: 16,
  },
  noWatchlistText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
