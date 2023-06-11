import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import fmp from '../services/fmp';
import alpha from '../services/alpha';
import StocksChart from '../components/StocksChart';

export default function StocksScreen({ route }) {
  const { ServerURL, watchList, removeFromWatchlist } = useStocksContext();
  const [state, setState] = useState({ stocksData: [] });
  const [selectedStock, setSelectedStock] = useState(null);
  const [chartPosition] = useState(new Animated.Value(scaleSize(500))); // initiate chart position

  useEffect(() => {
    fetchStockData();
  }, [watchList]);

  // test
  // const test = alpha.api.data
  //   .daily_adjusted('msft')
  //   .then((res) => {
  //     console.log(res);
  //     return res; // Optional: If you want to pass the result to the next `then()` callback
  //   })
  //   .catch((err) => console.log(err));
  // test

  const fetchStockData = async () => {
    const symbols = watchList
      .filter((item) => item && item.symbol)
      .map((item) => item.symbol);

    try {
      // Fetch stock data for each symbol
      const responses = await Promise.all(
        // symbols.map((symbol) => alpha.api.data.quote(symbol)
        symbols.map((symbol) => fmp.api.stock(symbol).quote())
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

    return (
      // <View style={styles.stockItem}>
      //   <Text style={styles.stockSymbol}>{item.symbol}</Text>
      //   <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
      //     <Text style={styles.deleteButtonText}>Delete</Text>
      //   </TouchableOpacity>
      // </View>
      <View style={styles.stockItem}>
        <TouchableOpacity
          style={styles.stockButton}
          onPress={() => handleStockPress(item)}
        >
          <Text style={styles.stockSymbol}>{item.symbol}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleStockPress = (stock) => {
    setSelectedStock(stock);
    animateChart();
  };
  const animateChart = () => {
    Animated.timing(chartPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideChart = () => {
    Animated.timing(chartPosition, {
      toValue: scaleSize(500),
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {state.stocksData.length > 0 ? (
        <FlatList
          data={state.stocksData}
          keyExtractor={(item) => item.symbol}
          renderItem={renderStockItem}
          contentContainerStyle={styles.flatListContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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
  stockButton: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: scaleSize(20),
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
  chartContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: scaleSize(500),
    backgroundColor: '#fff',
    borderTopLeftRadius: scaleSize(16),
    borderTopRightRadius: scaleSize(16),
    padding: scaleSize(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -scaleSize(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleSize(2),
    elevation: scaleSize(2),
  },
  closeButton: {
    backgroundColor: '#fc3535',
    height: scaleSize(35),
    width: scaleSize(100),
    padding: scaleSize(7),
    borderRadius: scaleSize(4),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: scaleSize(16),
  },
  closeButtonText: {
    color: '#fff',
    fontSize: scaleSize(13),
    fontWeight: 'bold',
  },
});
