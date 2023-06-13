import React, {useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image, Alert,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import fmp from '../services/fmp';
import * as WebBrowser from 'expo-web-browser';
import Charts from '../components/Charts';
import News from '../components/News';
import TradingView from "../components/TradingView";

const Tab = createMaterialTopTabNavigator();

const StockScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [news, setNews] = useState([]);
  const symbol = route.params.symbol;

  if (data['Error Message'] !== undefined) {
    Alert.alert('Error Message', `${data['Error Message']} \nBecause api too expensive 3;`);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
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
          screenOptions: {
            tabBarVisible: false ,
            tabBarInactiveTintColor: '#ccc',
            tabBarActiveTintColor: '#fff',
            tabBarStyle: { backgroundColor: '#333' },
            tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
            style: { elevation: 0, borderBottomWidth: 1, borderBottomColor: '#ccc' },
          }
        }}
      >
        <Tab.Screen
          name="News"
          options={{ title: `${symbol} News` }}
          component={News}
          initialParams={{ symbol }}
        />
        <Tab.Screen
          name="Charts"
          options={{ title: `${symbol} Charts` }}
          component={TradingView}
          initialParams={{ symbol }}
        />
      </Tab.Navigator>
    </View>
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
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
