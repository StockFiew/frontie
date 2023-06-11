import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { scaleSize } from '../constants/Layout';
import watchlist from "../services/watchlist";
import sendAuthenticatedRequest from "../services/api";
import {api} from "../services/fmp";

export default function StocksScreen({ route }) {
  const [stocks, setStocks] = useState([]);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetchStockData();
    //fetchSearchData();
  }, []);
  const fetchStockData = async () => {
    try {
      // Fetch stock data for each symbol
      if (watchList.length !== 0) {
        const stocksList = watchList.map((item) => api.stock(item).quote());
        setStocks(responses.map((response) => response[0]));
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleStockItemClick = (stock) => {
    setSelectedStock(stock);
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
      <TouchableOpacity onPress={() => handleStockItemClick(item)}>
        <View style={styles.stockItem}>
          <Text style={styles.stockSymbol}>{item.symbol}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {stocks.length > 0 ? (
        <FlatList
          data={stocks}
          keyExtractor={(item) => item.symbol}
          renderItem={renderStockItem}
          contentContainerStyle={styles.flatListContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <Text style={styles.noWatchlistText}>No stocks in watchlist, use Search function to add stocks!</Text>
      )}
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
    height: scaleSize(65),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleSize(8),
    backgroundColor: '#fff',
    borderRadius: scaleSize(8),
    borderWidth: scaleSize(1),
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scaleSize(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleSize(2),
    elevation: scaleSize(2),
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
    padding: scaleSize(7),
    borderRadius: scaleSize(4),
    marginLeft: scaleSize(8),
    marginRight: scaleSize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButtonText: {
    color: '#fff',
    fontSize: scaleSize(13),
    fontWeight: 'bold',
  },
  separator: {
    height: scaleSize(1),
    backgroundColor: '#ccc',
    marginVertical: scaleSize(8),
  },
  noWatchlistText: {
    fontSize: scaleSize(15),
    textAlign: 'center',
    marginTop: scaleSize(20),
  },
});
