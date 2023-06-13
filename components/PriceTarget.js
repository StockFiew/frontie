import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
const PriceTarget = ({ data, handlePriceTargetSelect, setIsModalVisible }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.priceTargetItem}
      onPress={() => handlePriceTargetSelect(item)}
    >
      <View style={styles.priceTargetTextContainer}>
        <Text style={styles.priceTargetAnalyst}>{item.analystName}</Text>
        <Text style={styles.priceTargetCompany}>{item.analystCompany}</Text>
        <Text style={styles.priceTargetPrice}>
          Price Target: ${item.priceTarget}
        </Text>
        <Text style={styles.priceTargetDate}>
          Published Date: {new Date(item.publishedDate).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const keyExtractor = (item, index) => index.toString();
  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  console.log(data)
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 20,
  },
  priceTargetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 20,
  },
  priceTargetTextContainer: {
    flex: 1,
  },
  priceTargetAnalyst: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  priceTargetCompany: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
  },
  priceTargetPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  priceTargetDate: {
    fontSize: 12,
    color: '#ccc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
export default PriceTarget;