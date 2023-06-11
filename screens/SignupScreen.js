import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/user';
import { scaleSize } from '../constants/Layout';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userApi = api.user();
  const navigation = useNavigation();

  const onSignUp = async () => {
    try {
      // Signup logic starts here
      userApi.register(email, password)
        .then((user) => {
          console.log('Registered user:', user);
          console.log('User successfully signed up!');
          Alert.alert('Welcome to StockFiew!', 'Your sign up has been completed');
          navigation.navigate('Home'); // Navigate to the 'SignIn' screen
        });
    } catch (err) {
      console.log('Error signing up:', err);
    }
  };

  const onSignIn = () => {
    navigation.navigate('SignIn'); // Navigate to the 'SignIn' screen
  };

  const onChangeText = (key, val) => {
    switch (key) {
      case 'email':
        setEmail(val);
        break;
      case 'password':
        setPassword(val);
        // Password must contain at least one Capital letter, and number.
        // The length must be between 8 and 15 characters.
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.text}>Type your email address</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize='none'
        placeholderTextColor='#F2F2F2'
        onChangeText={(val) => onChangeText('email', val)}
      />
      <Text style={styles.text}>Type your password</Text>
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        autoCapitalize='none'
        placeholderTextColor='#F2F2F2'
        onChangeText={(val) => onChangeText('password', val)}
      />
      <Text style={styles.secondText}>
        - At least one capital letter and number{'\n'}- Between 8 and 15
        characters.{'\n'}
        {'\n'}
      </Text>
      <View style={{ marginVertical: 5 }}>
        <Button title='Sign up' onPress={onSignUp} color='#8A2BE2' />
      </View>

      <Text style={styles.secondText}>If you are a member</Text>
      <View style={{ marginVertical: 13 }}>
        <Button title='Sign in here' onPress={onSignIn} color='#525050' />
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
    textAlign: 'left', // Left align the text
    color: '#000000',
    fontSize: scaleSize(14),
    marginTop: scaleSize(10),
    // marginBottom: ,
  },
  secondText: {
    textAlign: 'center',
    color: '#525050',
    width: scaleSize(260),
    fontSize: scaleSize(14),
    marginBottom: scaleSize(-7),
  },
});
