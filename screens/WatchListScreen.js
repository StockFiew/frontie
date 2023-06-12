import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, View, TextInput, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import fmp from "../services/fmp";
import watchlist from "../services/watchlist";
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

export function WatchListScreen() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [stockWatch, setStockWatch] = useState([]);
  const navigation = useNavigation();
  const swipeRef = React.useRef(null);

  useEffect(() => {
    // Load the stockWatch when the component mounts
    loadWatchlist().then(r => r);
  }, []);

  const loadWatchlist = () => {
    // Load the stockWatch from storage or API
    // ...
    return watchlist.getList()
      .then((results) => {
        if (results) {
          const mappedResults = results.map((res) => {
            return {
              symbol: res.symbol,
              name: res.name,
              stockExchange: res.stockExchange
            };
          });
          setStockWatch(mappedResults);
          return mappedResults;
        }
      })
      .catch((error) => {
        // handle errors here
        console.log(error);
      });
  };

  const renderItem = ({ item }) => {
    const isWatched = stockWatch.some(i => i.symbol === item.symbol);

    const handleDelete = () => {
      watchlist.deleteItem({ symbol: item.symbol })
        .then(() => {
          loadWatchlist().then( r=> {
            console.log(r);
            swipeRef.current.close();
          })
        })
        .catch((error) => {
          // handle errors here
          console.log(error);
        });
    };

    const handleAdd = () => {
      watchlist.addItem({ symbol: item.symbol, stockExchange: item.stockExchange, name: item.name })
        .then(() => {
          loadWatchlist().then(r => {
            console.log(r);
            swipeRef.current.close();
          })
        })
        .catch((error) => {
          // handle errors here
          console.log(error);
        });
    }

    const renderLeftActions = (progress, dragX) => {
      if (!isWatched) {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
          extrapolate: 'clamp',
        });

        return (
          <RectButton style={styles.addButton} onPress={handleAdd}>
            <Animated.Text
              style={[
                styles.addButtonText,
                {
                  transform: [{ translateX: trans }],
                },
              ]}>
              Add
            </Animated.Text>
          </RectButton>
        );
      }
    };

    const renderRightActions = (progress, dragX) => {
      if (isWatched) {
        const trans = dragX.interpolate({
          inputRange: [-101, -100, -50, 0],
          outputRange: [-1, 0, 0, 20],
          extrapolate: 'clamp',
        })

        return (
          <Animated.View style={{ flex: 0, transform: [{ translateX: trans }] }}>
            <RectButton
              style={styles.deleteButton}
              onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </RectButton>
          </Animated.View>
        );
      }
    }

    const onSwipableClose = () => {
      if (swipeRef.current) {
        swipeRef.current.close();
      }
    }

    return (
      <View>
        <Swipeable
          ref={swipeRef}
          friction={2}
          enableTrackpadTwoFingerGesture
          leftThreshold={30}
          rightThreshold={40}
          renderLeftActions={renderLeftActions}
          renderRightActions={renderRightActions}
          onSwipeableClose={onSwipableClose}
        >
          <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            <View style={styles.itemContent}>
              <Text style={styles.symbol}>{item.symbol}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.exchange}>{item.stockExchange}</Text>
            </View>
            {isWatched && <Ionicons name="checkmark" size={24} color="#008000"/>}
          </TouchableOpacity>
        </Swipeable>
      </View>
    )
  };

  const handleSearch = async () => {
    fmp.search(query, 50, 'NASDAQ')
      .then((r) => setSearchResults(r)
    ).catch(err => {
      console.log(err);
    });
  };

  const handlePress = async (i) => {
    // Navigate to the StockScreen with the selected stock symbol
    navigation.navigate('Stocks', { symbol: i.symbol });
  };

  const handleQueryChange = (text) => {
    setQuery(text);
    if (text === '') {
      loadWatchlist();
    }
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchTextClear = () => {
    setQuery('')
    loadWatchlist().then(r => r);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a stock symbol"
          placeholderTextColor="#A9A9A9"
          value={query}
          onChangeText={handleQueryChange}
          autoCapitalize="characters"
          onSubmitEditing={handleSearch}
          onClearText={{handleSearchTextClear}}
          returnKeyType="search"
          onKeyPress={handleKeyPress}
          clearButtonMode="always"
        />
      </View>
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.symbol}
          style={styles.list}
          renderItem={renderItem}
        />
      )}
      {searchResults.length === 0 && (
        <FlatList
          data={stockWatch}
          renderItem={renderItem}
          keyExtractor={item => item.symbol}
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
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  name: {
    flex: 2,
    fontSize: 16,
    color: '#000',
  },
  exchange: {
    flex: 1,
    fontSize: 14,
    color: '#A9A9A9',
  },
  list: {
    flex: 1,
    marginHorizontal: 0,
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  itemContent: {
    flex: 1,
    marginRight: 20,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    height: '100%',
    width: 80,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#3083ff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    height: '100%',
    width: 80,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WatchListScreen;

