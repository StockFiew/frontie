import React, { useState } from 'react';
import {
  Text,
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/images/icon_trans.png'; // Relative path to the image
import { scaleSize } from '../constants/Layout';
import api from '../services/user';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const user = api.user();

  const onSignIn = () => {
    user.login(email, password)
      .then((user) => {
        console.log('Logged in user:', user);
        console.log('User successfully signed in!');
        Alert.alert('Welcome back!', 'Good to see you again');
        navigation.navigate('Home'); // Navigate to the 'Home' screen
      })
      .catch((err) => {
        console.log('Error signing in:', err);
      })
  };

  const onSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the 'SignUp' screen
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.secondContainer}>
        <Text style={styles.title}>Sign in</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder='Username'
          placeholderTextColor='#F2F2F2'
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder='Password'
          secureTextEntry={true}
          placeholderTextColor='#F2F2F2'
          style={styles.input}
        />

        <View style={{ marginVertical: 5 }}>
          <Button title='Sign in' onPress={onSignIn} color='#8A2BE2' />
        </View>
        <Text style={styles.text}>If you are not a member yet</Text>
        <View style={{ marginVertical: 13 }}>
          <Button title='Sign up here' onPress={onSignUp} color='#525050' />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  secondContainer: {
    flex: 0.7,
    width: scaleSize(310),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6ee',
    borderRadius: scaleSize(20),
  },
  logo: {
    width: scaleSize(70),
    height: scaleSize(70),
    marginBottom: scaleSize(20),
  },
  title: {
    fontSize: scaleSize(24),
    fontWeight: 'bold',
    marginBottom: scaleSize(20),
    color: '#000000',
  },
  input: {
    width: scaleSize(260),
    height: scaleSize(55),
    backgroundColor: '#8A2BE2',
    margin: scaleSize(10),
    padding: scaleSize(15),
    color: 'white',
    borderRadius: scaleSize(14),
    fontSize: scaleSize(15),
    fontWeight: '500',
  },
  text: {
    color: '#525050',
    fontSize: scaleSize(14),
    marginTop: scaleSize(10),
    marginBottom: scaleSize(-7),
  },
});
