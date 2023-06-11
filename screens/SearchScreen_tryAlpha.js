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
import alpha from '../services/alpha';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen({ route }) {
  const { ServerURL, watchList, addToWatchlist, clearWatchlist } =
    useStocksContext(); // temp
  const [stocksData, setStocksData] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchStockData();
  }, [watchList]);

  const fetchStockData = () => {
    setIsSearching(true);
    if (keywords.length > 0) {
      alpha.api.data
        .search(keywords)
        .then((res) => {
          setStocksData(res.bestMatches);
          setIsSearching(false);
          setShowNoResults(res.bestMatches.length === 0);
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
        item['1. symbol'].toLowerCase().includes(keywords.toLowerCase()) ||
        item['2. name'].toLowerCase().includes(keywords.toLowerCase())
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
      (stock) => stock.symbol === item['1. symbol']
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
      addToWatchlistAndNavigate(item);
      // clearWatchlist(); will be deletete later !
    };

    return (
      <TouchableOpacity style={styles.stockItem} onPress={handleAddToWatchlist}>
        <Text style={styles.stockSymbol}>{item['1. symbol']}</Text>
        <Text style={styles.stockName}>{item['2. name']}</Text>
        <Text style={styles.stockExchange}>{item['4. region']}</Text>
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
          keyExtractor={(item) => item['1. symbol']}
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
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noResultsMessage: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
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
  stockExchange: {
    fontSize: 14,
    color: 'gray',
  },
  loader: {
    marginTop: 20,
  },
});
