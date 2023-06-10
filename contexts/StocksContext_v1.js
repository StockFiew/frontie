import React, { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Change from 'react-native' to '@react-native-async-storage/async-storage'

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    // Retrieve watchlist from persistent storage
    // delete before submission
    retrieveWatchlist();
  }, []);

  useEffect(() => {
    // Save watchlist to AsyncStorage whenever it changes
    saveWatchlist();
  }, [state]);

  const addToWatchlist = (newSymbol) => {
    // Add the new symbol to the watchlist
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    // ^ Delete this comments before submission
    const updatedWatchlist = [...state, newSymbol];
    setState(updatedWatchlist);
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

  const saveWatchlist = async () => {
    try {
      await AsyncStorage.setItem('watchlist', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving watchlist to AsyncStorage:', error);
    }
  };
};

export const useStocksContext = () => {
  const [state, addToWatchlist] = useContext(StocksContext);
  // can put more code here
  // ^ Delete this comments before submission

  return {
    ServerURL: '<http://localhost:19006>',
    // ServerURL: '<http://131.181.190.87:3001>',
    // ^ original code
    watchList: state,
    addToWatchlist,
  };
};
