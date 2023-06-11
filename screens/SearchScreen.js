import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import fmp from '../services/fmp';
import alpha from '../services/alpha';
import { FMP_API_SECRET } from '@env';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen({ route }) {
  // const { ServerURL, watchList, addToWatchlist } = useStocksContext();
  const { ServerURL, watchList, addToWatchlist, clearWatchlist } =
    useStocksContext(); // temp
  const [stocksData, setStocksData] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchStockData();
    // fetchSearchData();
  }, [watchList]);

  // const fetchSearchData = () => {
  //   fmp.api
  //     .search('GOOG')
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  // ^ test code

  const fetchStockData = () => {
    alpha.api.data.daily_adjusted('AAPL').then((res) => console.log(res));
    // .catch((err) => console.log(err));

    // fmp.api
    //   .stock('GOOG')
    //   .quote()
    //   .then((res) => console.log(res));

    // ^ test code

    setIsSearching(true);
    if (keywords.length > 0) {
      fmp.api
        .search(keywords, 10000, 'NASDAQ')
        .then((res) => {
          setStocksData(res);
          setIsSearching(false);
          setShowNoResults(res.length === 0);
        })
        .catch((error) => {
          console.log('Error fetching stock data:', error);
          setIsSearching(false);
          setShowNoResults(false);
        });
    } else {
      setIsSearching(false);
      setStocksData([]);
      setShowNoResults(false);
    }
  };

  const filterStocks = (data) => {
    return data.filter(
      (item) =>
        item.symbol.toLowerCase().includes(keywords.toLowerCase()) ||
        item.name.toLowerCase().includes(keywords.toLowerCase())
    );
  };

  const handleSearch = () => {
    Keyboard.dismiss();
    fetchStockData();
  };

  const handleKeywordsChange = (text) => {
    setKeywords(text);
    setShowNoResults(false);
  };

  // Add to watchlist and navigete to StocksScreen
  const addToWatchlistAndNavigate = (item) => {
    const isAlreadyAdded = watchList.some(
      (stock) => stock.symbol === item.symbol
    );
    if (isAlreadyAdded) {
      Alert.alert('Already Added', 'This stock is already in your watchlist.');
    } else {
      addToWatchlist(item);
      navigation.navigate('Stocks');
    }
  };

  const renderStockItem = ({ item }) => {
    const handleAddToWatchlist = () => {
      // clearWatchlist(); // delete all watchlist, for the test, it will be deleted
      addToWatchlistAndNavigate(item);
    };

    return (
      <TouchableOpacity style={styles.stockItem} onPress={handleAddToWatchlist}>
        <Text style={styles.stockSymbol}>{item.symbol}</Text>
        <Text style={styles.stockName}>{item.name}</Text>
        <Text style={styles.stockExchange}>{item.stockExchange}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={keywords}
          onChangeText={handleKeywordsChange}
          onSubmitEditing={handleSearch}
          placeholder='Search symbol or name'
          placeholderTextColor='gray'
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {isSearching ? (
        <ActivityIndicator size='large' color='gray' style={styles.loader} />
      ) : (
        <FlatList
          data={filterStocks(stocksData)}
          keyExtractor={(item) => item.symbol}
          renderItem={renderStockItem}
          ListEmptyComponent={
            showNoResults && (
              <Text style={styles.noResultsMessage}>No results found</Text>
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleSize(16),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleSize(10),
  },
  searchInput: {
    flex: 1,
    height: scaleSize(40),
    borderWidth: scaleSize(1),
    borderColor: 'gray',
    borderRadius: scaleSize(5),
    paddingHorizontal: scaleSize(10),
    marginRight: scaleSize(10),
  },
  searchButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(18),
    alignItems: 'center',
    borderRadius: scaleSize(5),
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noResultsMessage: {
    fontSize: scaleSize(16),
    color: 'gray',
    textAlign: 'center',
    marginTop: scaleSize(10),
  },
  stockItem: {
    backgroundColor: 'white',
    padding: scaleSize(16),
    marginBottom: scaleSize(10),
    borderRadius: scaleSize(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scaleSize(2),
    },
    shadowOpacity: 0.2,
    shadowRadius: scaleSize(4),
    elevation: scaleSize(3),
  },
  stockSymbol: {
    fontSize: scaleSize(18),
    fontWeight: 'bold',
  },
  stockName: {
    fontSize: scaleSize(16),
  },
  stockExchange: {
    fontSize: scaleSize(14),
    color: 'gray',
  },
  loader: {
    marginTop: scaleSize(20),
  },
});
