import React, { useState, useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import fmp from '../services/fmp';
import watchlist from '../services/watchlist';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { scaleSize } from '../constants/Layout';

export function WatchListScreen() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [stockWatch, setStockWatch] = useState([]);
  const [stockPrices, setStockPrices] = useState([]);
  const navigation = useNavigation();
  const swipeRef = React.useRef(null);

  useEffect(() => {
    // Load the stockWatch when the component mounts
    loadWatchlist();
  }, []);

  const loadWatchlist = () => {
    watchlist
      .getList()
      .then((results) => {
        if (results) {
          const symbols = results.map((res) => res.symbol);
          return fmp.quote(symbols).then((quotes) => {
            const filteredQuotes = quotes.filter((quote) =>
              symbols.includes(quote.symbol)
            );
            const mappedResults = results.map((res) => {
              const quote = filteredQuotes.find((q) => q.symbol === res.symbol);
              return {
                symbol: res.symbol,
                name: res.name,
                stockExchange: res.exchange,
                price: quote ? quote.price : null,
                changePercent: quote ? quote.changesPercentage : null,
              };
            });
            setStockWatch(mappedResults);
            return mappedResults;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderItem = ({ item }) => {
    const isWatched = stockWatch.some((i) => i.symbol === item.symbol);
    const price = item.price;

    const handleDelete = () => {
      watchlist
        .deleteItem({ symbol: item.symbol })
        .then(() => {
          loadWatchlist();
          swipeRef.current.close();
        })
        .catch((error) => {
          // handle errors here
          console.log(error);
        });
    };

    const handleAdd = () => {
      watchlist
        .addItem({
          symbol: item.symbol,
          stockExchange: item.stockExchange,
          name: item.name,
        })
        .then(() => {
          loadWatchlist();
          swipeRef.current.close();
        })
        .catch((error) => {
          // handle errors here
          console.log(error);
        });
    };

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
              ]}
            >
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
        });

        return (
          <Animated.View
            style={{ flex: 0, transform: [{ translateX: trans }] }}
          >
            <RectButton style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </RectButton>
          </Animated.View>
        );
      }
    };

    const onSwipableClose = () => {
      if (swipeRef.current) {
        swipeRef.current.close();
      }
    };

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
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item)}
          >
            <View style={styles.itemContent}>
              <Text style={styles.symbol}> {item.symbol} </Text>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={styles.price}>
              {price ? `$${price.toFixed(2)}` : '-'}
            </Text>

            <Text
              style={[
                styles.changePercent,
                { color: item.changePercent >= 0 ? 'green' : 'red' },
              ]}
            >
              {item.changePercent ? `${item.changePercent.toFixed(2)}%` : '-'}
            </Text>
            {isWatched && (
              <Ionicons name='checkmark-circle' color='green' size={20} />
            )}
          </TouchableOpacity>
        </Swipeable>
      </View>
    );
  };

  const handleSearch = async () => {
    fmp
      .search(query, 50, 'NASDAQ')
      .then((r) => setSearchResults(r))
      .catch((err) => {
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
    setQuery('');
    loadWatchlist().then((r) => r);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Enter a stock symbol'
          placeholderTextColor='#A9A9A9'
          value={query}
          onChangeText={handleQueryChange}
          autoCapitalize='characters'
          onSubmitEditing={handleSearch}
          onClearText={{ handleSearchTextClear }}
          returnKeyType='search'
          onKeyPress={handleKeyPress}
          clearButtonMode='always'
        />
      </View>
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.symbol}
          style={styles.list}
          renderItem={renderItem}
        />
      )}
      {searchResults.length === 0 && (
        <FlatList
          data={stockWatch}
          renderItem={renderItem}
          keyExtractor={(item) => item.symbol}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignContent: 'center',
  },
  inputContainer: {
    width: '90%',
    height: scaleSize(50),
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(12),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: scaleSize(0),
    marginTop: scaleSize(7),
  },
  input: {
    flex: 1,
    alignSelf: 'center',
    fontSize: scaleSize(16),
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: '#F5F5F5',
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(5),
    paddingVertical: scaleSize(-10),
    marginBottom: scaleSize(-10),
  },
  symbol: {
    flex: 1,
    fontSize: scaleSize(18),
    fontWeight: 'bold',
    color: '#000',
  },
  name: {
    flex: 2,
    fontSize: scaleSize(12),
    color: '#000',
  },
  exchange: {
    flex: 1,
    fontSize: scaleSize(13),
    color: '#A9A9A9',
  },
  list: {
    flex: 1,
    width: scaleSize(340),
    marginHorizontal: 0,
    marginTop: scaleSize(10),
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: scaleSize(20),
    margin: scaleSize(3),
    borderRadius: scaleSize(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scaleSize(5),
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  itemContent: {
    flex: 1,
    marginRight: scaleSize(20),
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: scaleSize(70),
    alignSelf: 'center',
    borderRadius: scaleSize(8),
    marginTop: scaleSize(10),
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: scaleSize(15),
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#3083ff',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: scaleSize(70),
    alignSelf: 'center',
    borderRadius: scaleSize(8),
    // marginTop: scaleSize(10),
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: scaleSize(15),
    fontWeight: '600',
  },
  price: {
    flex: 0.65,
    fontSize: scaleSize(15),
    fontWeight: 'bold',
    color: '#000',
  },
  changePercent: {
    flex: 0.5,
    fontSize: scaleSize(15),
    fontWeight: 'bold',
    color: '#000',
  },
});

export default WatchListScreen;
