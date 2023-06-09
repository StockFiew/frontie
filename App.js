import * as React from 'react';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
// change from DarkTheme to DefaultTheme
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { StocksProvider } from './contexts/StocksContext';
import 'react-native-gesture-handler';
import StocksScreen from './screens/StocksScreen';

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <View style={styles.container}>
      <StocksProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
        <NavigationContainer theme={DefaultTheme}>
          {/* change from DarkTheme to DefaultTheme */}
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={BottomTabNavigator}
              options={{ headerShown: false }} // Hide the header
            />
            <Stack.Screen
              name='Stocks'
              component={StocksScreen}
              options={{ headerShown: true, title: 'Stocks' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StocksProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
