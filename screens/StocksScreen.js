import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import fmp from '../services/fmp';
import * as WebBrowser from 'expo-web-browser';
import PriceTarget from '../components/PriceTarget';
import News from '../components/News';

const Tab = createMaterialTopTabNavigator();

const StockScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPriceTarget, setSelectedPriceTarget] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    Promise.all([
      fmp.price_target(route.params.symbol),
      fmp.news(route.params.symbol),
    ]).then(([priceTargetData, newsData]) => {
      console.log(priceTargetData);
      console.log(newsData);
      setData([...priceTargetData, ...newsData]);
      setIsLoading(false);
    });
  }, []);

  const handlePriceTargetSelect = (priceTarget) => {
    setSelectedPriceTarget(priceTarget);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedPriceTarget(null);
    setIsModalVisible(false);
  };

  const handleNewsPress = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{route.params.symbol}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          style: { elevation: 0, borderBottomWidth: 1, borderBottomColor: '#ccc' },
          tabStyle: { backgroundColor: '#333' },
          labelStyle: { fontSize: 16, fontWeight: 'bold' },
          inactiveTintColor: '#ccc',
          indicatorStyle: { backgroundColor: '#333' },
        }}
      >
        <Tab.Screen name="News"
                    component={News}
                    initialParams={{data , handleNewsPress }}
        />
        <Tab.Screen name="Price Targets"
                    component={PriceTarget}
                    initialParams={{data , handlePriceTargetSelect, setIsModalVisible }}
        />
      </Tab.Navigator>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          {selectedPriceTarget && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {selectedPriceTarget.analystName} ({selectedPriceTarget.analystCompany})
              </Text>
              <Text style={styles.modalText}>
                Price Target: ${selectedPriceTarget.priceTarget.toFixed(2)}
              </Text>
              <Text style={styles.modalText}>
                Adj. Price Target: ${selectedPriceTarget.adjPriceTarget.toFixed(2)}
              </Text>
              <Text style={styles.modalText}>
                Price When Posted: ${selectedPriceTarget.priceWhenPosted.toFixed(2)}
              </Text>
              <Text style={styles.modalText}>News Publisher: {selectedPriceTarget.site}</Text>
              <Text style={styles.modalText}>News Title: {selectedPriceTarget.title}</Text>
              <Text style={styles.modalText}>
                Published Date: {new Date(selectedPriceTarget.publishedDate).toLocaleString()}
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default StockScreen;
