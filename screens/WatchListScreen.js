import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import fmp from "../services/fmp";
import watchlist from "../services/watchlist";
import { FontAwesome } from '@expo/vector-icons';

const WatchListScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [stockWatch, setStockWatch] = useState([]);

  useEffect(() => {
    // Load the stockWatch when the component mounts
    loadWatchlist();
  }, []);

  const loadWatchlist = () => {
    // Load the stockWatch from storage or API
    // ...
    return watchlist.getList()
      .then((results) => {
        const mappedResults = results.map((res) => {
          return {
            symbol: res.symbol,
            name: res.name,
            stockExchange: res.stockExchange
          };
        });
        setStockWatch(mappedResults);
        return mappedResults;
      })
      .catch((error) => {
        // handle errors here
      });
  };




  const renderItem = ({ item }) => {
    const isWatched = stockWatch.some(i => i.symbol == item.symbol)
    return (
      <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.exchange}>{item.stockExchange}</Text>
        {isWatched && <Ionicons name="checkmark" size={24} color="#008000" />}
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item) => item.symbol;


  const handleSearch = async () => {
    fmp.search(query, 50, 'NASDAQ').then(
      (response) => {
        setSearchResults(response);
      }
    ).catch(err => {
      console.log(err);
    });
  };

  const handlePress = async (i) => {
    // Handle the deletion logic here
    const watch = stockWatch
    const isWatched = watch.includes(i);
    if (isWatched) {
      watchlist.deleteItem(i)
        .then(() => {
          loadWatchlist();
        });
    } else {
      watchlist.addItem({symbol: i.symbol, name: i.name, stockExchange: i.stockExchange})
        .then(() => {
          loadWatchlist();
        })
      return console.log(`Adding ${i.symbol}`);
    }
  };

  const handleQueryChange = (text) => {
    setQuery(text);
    if (text === '') {
      loadWatchlist();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <FontAwesome name="user" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a stock symbol"
          placeholderTextColor="#A9A9A9"
          value={query}
          onChangeText={handleQueryChange}
          autoCapitalize="characters"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.list}
        />
      )}
      {searchResults.length === 0 && (
        <FlatList
          data={stockWatch}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    marginLeft: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  symbol: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    flex: 2,
    fontSize: 16,
    marginLeft: 16,
  },
  exchange: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
  list: {
    flex: 1,
    marginTop: 16,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default WatchListScreen;
