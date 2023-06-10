import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import userApi from '../services/userApi.mjs';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const onSignUp = async () => {
    try {
      // Signup logic starts here
      const user = await registerUser(email, password);
      // can't load registerUser..maybe i can't figure it out api...
      console.log('Registered user:', user);
      console.log('User successfully signed up!');
      // ^ for the test
      Alert.alert('Welcome!', 'Your sign up has been completed');
      navigation.navigate('SignIn'); // Navigate to the 'SignIn' screen
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
      <Text style={styles.text2}>
        - At least one capital letter and number{'\n'}- Between 8 and 15
        characters.{'\n'}
      </Text>
      <View style={{ marginVertical: 5 }}>
        <Button title='Sign up' onPress={onSignUp} color='#8A2BE2' />
      </View>

      <Text style={styles.text2}>If you are a member</Text>
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
  container2: {
    flex: 0.5,
    width: 310,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292828',
    borderRadius: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  input: {
    width: 260,
    height: 55,
    backgroundColor: '#8A2BE2',
    margin: 10,
    padding: 15,
    color: 'white',
    borderRadius: 14,
    fontSize: 15,
    fontWeight: '500',
  },
  text: {
    color: '#000000',
    fontSize: 14,
    marginTop: 10,
  },
  text2: {
    textAlign: 'center',
    color: '#525050',
    width: 260,
    fontSize: 14,
    marginBottom: -7,
  },
});
