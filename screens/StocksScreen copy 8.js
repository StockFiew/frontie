import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import fmp from '../services/fmp';

export default function StockScreen() {
  const { watchList } = useStocksContext();
  useEffect(() => {
    console.log('Watchlist:', watchList);
  }, [watchList]);

  const renderStockItem = ({ item }) => (
    <TouchableOpacity style={styles.stockItem}>
      <Text style={styles.stockSymbol}>{item['1. symbol']}</Text>
      <Text style={styles.stockName}>{item['2. name']}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {watchList.length > 0 ? (
        <FlatList
          data={watchList}
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
