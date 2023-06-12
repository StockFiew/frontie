import * as React from 'react';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { StocksProvider } from './contexts/StocksContext';
import 'react-native-gesture-handler';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <View style={styles.container}>
      <StocksProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
        <NavigationContainer theme={DefaultTheme}>
          <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Screen
                name='Home'
                component={BottomTabNavigator}
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen
                  name='SignIn'
                  component={SignInScreen}
                  options={{ headerShown: false }} // Hide the header
                  initialParams={{ handleLogin }}
                />
                <Stack.Screen
                  name='SignUp'
                  component={SignUpScreen}
                  options={{ headerShown: false }}
                  initialParams={{ handleLogin }}
                />
              </>
            )}
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
