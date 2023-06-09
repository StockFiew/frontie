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
import { FMP_API_SECRET } from '@env';

const url = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&exchange=NASDAQ&dividendMoreThan=&apikey=${FMP_API_SECRET}`;

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState({ searchText: '', searchResults: [] });

  useEffect(() => {
    fetchSymbolNames();
  }, []);

  const fetchSymbolNames = async () => {
    try {
      const response = await fetch(`${ServerURL}/stocks/symbols`);
      if (response.ok) {
        const data = await response.json();
        setState((prevState) => ({
          ...prevState,
          searchResults: data.symbols,
        }));
      } else {
        console.error('Failed to fetch symbol names');
      }
    } catch (error) {
      console.error('Error fetching symbol names:', error);
    }
  };

  const handleSearch = (text) => {
    setState((prevState) => ({ ...prevState, searchText: text }));
  };

  const handleAddToWatchlist = (symbol) => {
    addToWatchlist(symbol);
    navigation.navigate('Watchlist');
  };

  const fetchSymbolData = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // Filter the search results based on the searchText
        const filteredResults = data.filter(
          (item) =>
            item.symbol.includes(state.searchText) ||
            item.name.includes(state.searchText)
        );
        setState((prevState) => ({
          ...prevState,
          searchResults: filteredResults,
        }));
      } else {
        console.error('Failed to fetch symbol data');
      }
    } catch (error) {
      console.error('Error fetching symbol data:', error);
    }
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleAddToWatchlist(item.symbol)}
    >
      <Text style={styles.resultText}>{item.name}</Text>
      <Text style={styles.resultSymbol}>{item.symbol}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchSymbolData();
  }, [state.searchText]); // Fetch symbol data whenever the searchText changes

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
        <FlatList
          data={state.searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.symbol}
        />
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
});
