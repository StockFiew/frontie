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
const INITIAL_ROUTE_NAME = 'Sign In';
// change home screen to Sign In temporarily

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
              // style={focused ? styles.selectedIcon : styles.unselectedIcon}
              // plan to move in tabBarIcon.js
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

// plan to move tabBarIcon.js
const styles = StyleSheet.create({
  selectedIcon: {
    color: '#8A2BE2', // Color for the selected state
  },
  unselectedIcon: {
    color: '#aba8a6', // Color for unselected state
  },
});
