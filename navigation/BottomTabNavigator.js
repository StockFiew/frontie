import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import StocksScreen from '../screens/StocksScreen';
import SearchScreen from '../screens/SearchScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Login';
// chage home screen

export default function BottomTabNavigator({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Stocks'
        component={StocksScreen}
        options={{
          title: 'Stocks1',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-trending-up' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          title: 'Search1',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-search' />
          ),
        }}
      />
      <BottomTab.Screen
        name='SignIn'
        component={SignInScreen}
        options={{
          title: 'SignIn1',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-search' />
          ),
        }}
      />
      <BottomTab.Screen
        name='SignUp'
        component={SignUpScreen}
        options={{
          title: 'SignUp1',
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
