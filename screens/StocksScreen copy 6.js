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
  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    fetchStockData();
  }, [watchList]);

  const fetchStockData = async () => {
    // Extract symbols from the watchlist
    const symbols = watchList.map((item) => item['1. symbol']);

    try {
      // Fetch stock data for each symbol
      const responses = await Promise.all(
        symbols.map((symbol) => fmp.api.stock(symbol).quote())
      );
      const stocksData = responses.map((response) => response[0]);
      setStocksData(stocksData);
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
      <View style={styles.stockItem}>
        <Text style={styles.stockSymbol}>{item.symbol}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stocksData}
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
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleSize(8),
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
    fontSize: scaleSize(16),
    fontWeight: 'bold',
    marginLeft: scaleSize(20),
  },
  deleteButton: {
    backgroundColor: '#fc3535',
    height: scaleSize(35),
    width: scaleSize(60),
    padding: 7,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: scaleSize(13),
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: scaleSize(8),
  },
});
