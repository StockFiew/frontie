import React, { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
// API_URL=https://172.26.22.24:3000/

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    // Retrieve watchlist from persistent storage
    retrieveWatchlist();
  }, []);

  const addToWatchlist = async (newSymbol) => {
    // Add the new symbol to the watchlist
    const updatedWatchlist = [...state, newSymbol];
    setState(updatedWatchlist);
    // Save watchlist to AsyncStorage
    saveWatchlist(updatedWatchlist);
    // Log the updated watchlist

    console.log('Updated Watchlist:', updatedWatchlist);
  };

  const retrieveWatchlist = async () => {
    try {
      const storedWatchlist = await AsyncStorage.getItem('watchlist');
      if (storedWatchlist !== null) {
        setState(JSON.parse(storedWatchlist));
      }
    } catch (error) {
      console.error('Error retrieving watchlist from AsyncStorage:', error);
    }
  };

  const clearWatchlist = async () => {
    try {
      await AsyncStorage.removeItem('watchlist');
      setState([]);
      console.log('Watchlist cleared.');
    } catch (error) {
      console.error('Error clearing watchlist from AsyncStorage:', error);
    }
  };

  const saveWatchlist = async (watchlist) => {
    try {
      await AsyncStorage.setItem('watchlist', JSON.stringify(watchlist));
    } catch (error) {
      console.error('Error saving watchlist to AsyncStorage:', error);
    }
  };

  return (
    <StocksContext.Provider value={[state, addToWatchlist, clearWatchlist]}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocksContext = () => {
  const [state, addToWatchlist, clearWatchlist] = useContext(StocksContext);

  useEffect(() => {
    // Retrieve watchlist from persistent storage
    // (This useEffect is optional, it depends on your use case)
    // retrieveWatchlist();
  }, []);

  return {
    ServerURL: API_URL,
    watchList: state,
    addToWatchlist,
    clearWatchlist,
  };
};
