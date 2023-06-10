import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import fmp from '../services/fmp';
import alpha from '../services/alpha';

export default function SearchScreen({ navigation }) {
  const { addToWatchlist } = useStocksContext();
  const [state, setState] = useState({
    searchText: '',
    searchResults: [],
    originalResults: [], // Add originalResults state
    showNoResults: false, // Add showNoResults state
  });

  useEffect(() => {
    fetchSymbolNames();
  }, []);

  const fetchSymbolNames = async () => {
    try {
      const data = await fmp.api.quote();
      // ^ part using fmpAPi
      setState((prevState) => ({
        ...prevState,
        searchResults: data,
        originalResults: data,
      }));
    } catch (error) {
      console.error('Error fetching symbol names:', error);
    }
  };

  const handleSearch = (text) => {
    setState((prevState) => ({ ...prevState, searchText: text }));
    if (text === '') {
      setState((prevState) => ({
        ...prevState,
        searchResults: prevState.originalResults, // Restore to initial search results
      }));
    } else {
      filterSearchResults(text);
    }
  };

  const filterSearchResults = (text) => {
    const { originalResults } = state; // Get original search results
    const filteredResults = originalResults.filter(
      (item) =>
        item.companyName.toLowerCase().includes(text.toLowerCase()) ||
        item.symbol.toLowerCase().includes(text.toLowerCase())
    );
    setState((prevState) => ({
      ...prevState,
      searchResults: filteredResults,
      showNoResults: filteredResults.length === 0, // Update showNoResults state
    }));
  };

  const handleAddToWatchlist = (symbol) => {
    addToWatchlist(symbol);
    console.log(symbol); // for checking passing value
    // navigation.push('StocksScreen');
    // ^ have to figure it out(mentioned in ass spec)
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleAddToWatchlist(item.symbol)}
    >
      <Text style={styles.resultText}>{item.companyName}</Text>
      <Text style={styles.resultSymbol}>{item.symbol}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons
            name='search'
            size={scaleSize(24)}
            color='black'
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder='Search'
            value={state.searchText}
            onChangeText={handleSearch}
          />
        </View>
        {state.showNoResults ? (
          <Text style={styles.noResultsText}>No results found</Text>
        ) : (
          <FlatList
            data={state.searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.symbol}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
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
    marginBottom: scaleSize(16),
    backgroundColor: '#F2F2F2',
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(8),
  },
  searchIcon: {
    marginRight: scaleSize(8),
  },
  searchInput: {
    flex: 1,
    fontSize: scaleSize(16),
  },
  resultItem: {
    paddingVertical: scaleSize(8),
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  resultText: {
    fontSize: scaleSize(16),
    fontWeight: 'bold',
  },
  resultSymbol: {
    fontSize: scaleSize(12),
    color: '#666666',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: scaleSize(16),
    marginTop: scaleSize(16),
    color: '#666666',
  },
});
