import * as React from 'react';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { StocksProvider } from './contexts/StocksContext';
import 'react-native-gesture-handler';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import UserScreen from "./screens/UserScreen";

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <View style={styles.container}>
      <StocksProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
        <NavigationContainer theme={DefaultTheme}>
          <Stack.Navigator initialRouteName='SignIn'>
            <Stack.Screen
              name='SignIn'
              component={SignInScreen}
              options={{ headerShown: false }} // Hide the header
            />
            <Stack.Screen
              name='SignUp'
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Home'
              component={BottomTabNavigator}
              options={{ headerShown: false }}
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
