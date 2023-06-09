import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

import api from '../services/fmpApi';

export default function CompanyListScreen() {
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    fetchCompanyList();
  }, []);

  const fetchCompanyList = async () => {
    try {
      const data = await api.testApi();
      setCompanyList(data);
    } catch (error) {
      console.error('Error fetching company list:', error);
    }
  };

  const renderCompanyItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.symbol}>{item.symbol}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={companyList}
        renderItem={renderCompanyItem}
        keyExtractor={(item) => item.symbol}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  symbol: {
    fontSize: 12,
    color: '#666666',
  },
});
