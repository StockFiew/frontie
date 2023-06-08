import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeText = (key, val) => {
    switch (key) {
      case 'email':
        setEmail(val);
        break;
      case 'password':
        setPassword(val);
        break;
      default:
        break;
    }
  };

  const signUp = async () => {
    try {
      // Place your signup logic here
      console.log('User successfully signed up!');
    } catch (err) {
      console.log('Error signing up:', err);
    }
  };

  const signIn = async () => {
    try {
      // Place your signup logic here
      console.log('User successfully signed up!');
    } catch (err) {
      console.log('Error signing up:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize='none'
        placeholderTextColor='white'
        onChangeText={(val) => onChangeText('email', val)}
      />

      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        autoCapitalize='none'
        placeholderTextColor='white'
        onChangeText={(val) => onChangeText('password', val)}
      />

      <Button title='Sign Up' onPress={signUp} />
      <Button title='Sign In' onPress={signIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
