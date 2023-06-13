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
    ])
      .then(([priceTargetData, newsData]) => {
        setData([...priceTargetData, ...newsData]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
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
            tabBarStyle: { backgroundCOlor: '#fff' },
            labelStyle: { fontSize: 16, fontWeight: 'bold' },
            inactiveTintColor: '#ccc',
            indicatorStyle: { backgroundColor: '#333' },
          }}>
          <Tab.Screen name="News" component={() => (
            <View style={styles.newsTab}>
              <Text style={styles.newsTitle}>News</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data
                  .filter((item) => item.title)
                  .map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.newsItem}
                      onPress={() => handleNewsPress(item.url)}
                    >
                      {item.image && (
                        <Image source={{ uri: item.image }} style={styles.newsItemImage} />
                      )}
                      <View style={styles.newsItemText}>
                        <Text style={styles.newsItemTitle}>{item.title}</Text>
                        <Text style={styles.newsItemSite}>{item.site}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          )}/>
          <Tab.Screen name="Price Targets" component={() => (
            <View style={styles.content}>
              <Text style={styles.subtitle}>Price Targets</Text>
              {data
                .filter((item) => item.priceTarget)
                .map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.priceTarget}
                    onPress={() => handlePriceTargetSelect(item)}
                  >
                    <View style={styles.priceTargetInfo}>
                      <Text style={styles.priceTargetCompany}>
                        {item.analystCompany || 'Analyst'}
                      </Text>
                      <Text style={styles.priceTargetValue}>${item.priceTarget.toFixed(2)}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#fff" />
                  </TouchableOpacity>
                ))}
            </View>
          )} />
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
              <Text style={styles.modalText}>
                News Publisher: {selectedPriceTarget.site}
              </Text>
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
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  priceTarget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
  },
  priceTargetInfo: {
    flex: 1,
  },
  priceTargetCompany: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  priceTargetValue: {
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
    color: '#fff',
    marginBottom: 20,
  },
  modalText: {
  fontSize: 18,
  color: '#fff',
  marginBottom: 10,
  },
  loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#000',
  },
  newsTab: {
  backgroundColor: '#333',
  padding: 20,
  marginTop: 10,
  },
  newsTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 10,
  },
  newsItem: {
  marginRight: 10,
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 8,
  backgroundColor: '#666',
  },
  newsItemTitle: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 5,
  },
  newsItemPublisher: {
  fontSize: 12,
  color: '#fff',
  },
  newsModalContainer: {
  flex: 1,
  backgroundColor: '#000',
  },
  newsWebView: {
  flex: 1,
  },
  newsLoadingContainer: {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});

export default StockScreen;
