import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import StocksScreen from '../screens/StocksScreen';
import WatchListScreen from '../screens/WatchListScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import UserScreen from "../screens/UserScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'User';

export default function BottomTabNavigator({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        tabBarActiveTintColor: '#8A2BE2', // Label color for the selected tab
        tabBarInactiveTintColor: '#918e8e', // Label color for unselected tabs
        tabBarStyle: {
          display: 'flex',
        },
      }}
    >
      <BottomTab.Screen
        name='Stocks'
        component={StocksScreen}
        options={{
          title: 'Stocks',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-trending-up' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Search'
        component={WatchListScreen}
        options={{
          title: 'Watch List',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-eye' />
          ),
        }}
      />
      <BottomTab.Screen
        name='User'
        component={UserScreen}
        options={{
          title: 'User',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-body' />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  return getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;
}
