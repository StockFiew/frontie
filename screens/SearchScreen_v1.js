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
import fmpApi from '../services/fmpApi';

// import { FMP_API_SECRET } from '@env';
// const url = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&exchange=NASDAQ&dividendMoreThan=&api
// key=${FMP_API_SECRET}`;
// ^ delete before submission
// (delete before submission) FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState({ searchText: '', searchResults: [] });

  // (delete before submission) can put more code here

  useEffect(() => {
    // (delete before submission) FixMe: fetch symbol names from the server and save in local SearchScreen state
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

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleAddToWatchlist(item.symbol)}
    >
      <Text style={styles.resultText}>{item.name}</Text>
      <Text style={styles.resultSymbol}>{item.symbol}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* (delete before submission) FixMe: add children here! */}

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
  // (delete before submission) FixMe: add styles here ...
  // (delete before submission) use scaleSize(x) to adjust sizes for small/large screens
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
