import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import StocksScreen from '../screens/StocksScreen';
import SearchScreen from '../screens/SearchScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

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
          title: 'Stocks',
          // want to hide this !
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name='md-trending-up'
              style={focused ? styles.selectedIcon : styles.unselectedIcon}
            />
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
          title: 'Sign in',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-search' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Sign Up'
        component={SignUpScreen}
        options={{
          title: 'Sign up',
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

const styles = StyleSheet.create({
  selectedIcon: {
    color: '#8A2BE2', // 선택된 상태에 대한 색상
  },
  unselectedIcon: {
    color: '#aba8a6', // 선택되지 않은 상태에 대한 색상
  },
});
