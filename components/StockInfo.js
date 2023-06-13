import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StockInfo = ({ stockInfo }) => {
  const stock = stockInfo;
  console.log(stockInfo);
  const isRising = stock.change > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.symbol}>${stock.previousClose} USD</Text>
      <Text style={styles.price}>$ {stock.price} USD</Text>
      <Text style={[styles.change, isRising ? styles.rising : styles.falling]}>
        {`${stock.change} (${stock.changesPercentage}%)`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.35)',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  change: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rising: {
    color: 'green',
  },
  falling: {
    color: 'red',
  },
});

export default StockInfo;