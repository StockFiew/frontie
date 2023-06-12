import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import StocksScreen from '../screens/StocksScreen';
import WatchListScreen from '../screens/WatchListScreen';

const Stack = createStackNavigator();

const WatchListNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='WatchList'
        component={WatchListScreen}
        options={{
          headerShown: false,
          title: 'Watch List',
        }}
      />
      <Stack.Screen
        name='Stocks'
        component={StocksScreen}
        options={{
          headerShown: false,
          title: 'Stocks',
        }}
      />
    </Stack.Navigator>
  );
};

export default WatchListNavigator;
