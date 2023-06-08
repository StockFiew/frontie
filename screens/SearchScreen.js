import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  FlatList,
} from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState({ query: '', results: [] });

  useEffect(() => {
    // FixMe: fetch symbol names from the server and save in local SearchScreen state
    fetchSymbols();
  }, []);

  const fetchSymbols = async () => {
    try {
      const response = await fetch(`${ServerURL}/symbols`);
      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        results: data.symbols,
      }));
    } catch (error) {
      console.log('Error fetching symbols:', error);
    }
  };

  const handleSearch = (text) => {
    setState((prevState) => ({
      ...prevState,
      query: text,
    }));
  };

  const handleSelectSymbol = (symbol) => {
    addToWatchlist(symbol);
    // FixMe: navigate to another screen or perform any other action after selecting a symbol
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder='Search symbols...'
            value={state.query}
            onChangeText={handleSearch}
          />
          <Ionicons
            name='ios-search'
            size={24}
            color='black'
            style={styles.searchIcon}
          />
        </View>
        <FlatList
          data={state.results}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => handleSelectSymbol(item.symbol)}
            >
              <View style={styles.itemContainer}>
                <Text>{item.symbol}</Text>
                <Text>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
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
    paddingHorizontal: scaleSize(8),
    backgroundColor: '#e0e0e0',
    borderRadius: scaleSize(8),
  },
  input: {
    flex: 1,
    height: scaleSize(40),
  },
  searchIcon: {
    paddingHorizontal: scaleSize(8),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaleSize(8),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
