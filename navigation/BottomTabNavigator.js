import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import StocksScreen from '../screens/StocksScreen';
import SearchScreen from '../screens/SearchScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import TestScreen from '../screens/TestScreen';
// ^ TestScreen will be deleted

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Test';
// change home screen temporarily, will be changed

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
        name='Test'
        component={TestScreen}
        options={{
          title: 'Test',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-trending-up' />
          ),
        }}
      />
      {/* ^ TestScreen will be deleted */}
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
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-search' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Sign In'
        component={SignInScreen}
        options={{
          title: 'Sign In',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-search' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Sign Up'
        component={SignUpScreen}
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-search' />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  return getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;
}
