import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { scaleSize } from '../constants/Layout';

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
  console.log(data);
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
    padding: scaleSize(20),
  },
  priceTargetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleSize(20),
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#ccc',
    paddingBottom: scaleSize(20),
  },
  priceTargetTextContainer: {
    flex: 1,
  },
  priceTargetAnalyst: {
    fontSize: scaleSize(18),
    fontWeight: 'bold',
    marginBottom: scaleSize(10),
    color: '#fff',
  },
  priceTargetCompany: {
    fontSize: scaleSize(14),
    color: '#ccc',
    marginBottom: scaleSize(10),
  },
  priceTargetPrice: {
    fontSize: scaleSize(16),
    fontWeight: 'bold',
    color: '#fff',
  },
  priceTargetDate: {
    fontSize: scaleSize(12),
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
