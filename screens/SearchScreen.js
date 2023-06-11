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
} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import fmp from '../services/fmp';
import alpha from '../services/alpha';
import { FMP_API_SECRET } from '@env';

export default function SearchScreen({ route }) {
  const { ServerURL, watchList } = useStocksContext();
  const [stocksData, setStocksData] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    fetchStockData();
  }, [watchList]);

  const fetchStockData = () => {
    setIsSearching(true);
    if (keywords.length > 0) {
      fmp
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

  const renderStockItem = ({ item }) => (
    <View style={styles.stockItem}>
      <Text style={styles.stockSymbol}>{item.symbol}</Text>
      <Text style={styles.stockName}>{item.name}</Text>
      <Text style={styles.stockExchange}>{item.stockExchange}</Text>
    </View>
  );

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
