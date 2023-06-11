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
import StocksChart from '../components/StocksChart';
import { useNavigation } from '@react-navigation/native';

export default function StocksScreen({ route }) {
  const { ServerURL, watchList, removeFromWatchlist } = useStocksContext();
  const [state, setState] = useState({ stocksData: [] });
  const [selectedStock, setSelectedStock] = useState(null); // maintain selected state

  useEffect(() => {
    fetchStockData();
    //fetchSearchData();
  }, [watchList]);

  const fetchStockData = async () => {
    const symbols = watchList
      .filter((item) => item && item.symbol)
      .map((item) => item.symbol);

    try {
      // Fetch stock data for each symbol
      const responses = await Promise.all(
        symbols.map((symbol) => fmp.api.stock(symbol).quote())
        // symbols.map((symbol) => alpha.api.data.quote(symbol))
      );
      const stocksData = responses.map((response) => response[0]);
      setState({ stocksData });
    } catch (error) {
      console.error('Error fetching stock data:', error);
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
            onPress: () => removeFromWatchlist(item.symbol),
          },
        ],
        { cancelable: true }
      );
    };

    const handleStockItemPress = () => {
      setSelectedStock(item);
    };
    // when user clicks a symbol

    return (
      <TouchableOpacity onPress={handleStockItemPress}>
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
      {state.stocksData.length > 0 ? (
        <React.Fragment>
          <FlatList
            data={state.stocksData}
            keyExtractor={(item) => item.symbol}
            renderItem={renderStockItem}
            contentContainerStyle={styles.flatListContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          {selectedStock && (
            <React.Fragment>
              <StocksChart data={selectedStock.data} />
              {/* can add other components */}
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <Text style={styles.noWatchlistText}>No stocks in watchlist</Text>
      )}
    </View>
  );
}

// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo
// for chart
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
