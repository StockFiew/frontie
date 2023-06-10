import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import fmp from '../services/fmp';
import alpha from '../services/alpha';

export default function TestScreen({ route }) {
  const { ServerURL, watchList } = useStocksContext();
  const [state, setState] = useState({
    stocksData: [],
    searchQuery: '',
  });

  useEffect(() => {
    fetchStockData();
  }, [watchList]);

  const fetchStockData = () => {
    fmp.api
      .stock('GOOG')
      .quote()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleSearch = () => {
    if (state.searchQuery.trim() !== '') {
      fmp.api
        .search(state.searchQuery.trim())
        .then((data) => {
          setState((prevState) => ({
            ...prevState,
            stocksData: data,
          }));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Enter symbol or company name'
          value={state.searchQuery}
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, searchQuery: text }))
          }
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={state.stocksData}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <View style={styles.stockItem}>
            <Text>{item.symbol}</Text>
            <Text>{item.companyName}</Text>
            {/* Display other stock information */}
          </View>
        )}
      />
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
    marginBottom: scaleSize(16),
  },
  searchInput: {
    flex: 1,
    marginRight: scaleSize(8),
    paddingHorizontal: scaleSize(8),
    height: scaleSize(40),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: scaleSize(4),
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: scaleSize(16),
    height: scaleSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(4),
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaleSize(8),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
