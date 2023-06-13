import React, { useState } from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/user';
import { scaleSize } from '../constants/Layout';

export default function SignUpScreen({ route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true); // State to control sign-up button disable state

  const userApi = api.user();
  const navigation = useNavigation();

  const onSignUp = () => {
    try {
      // Signup logic starts here
      userApi.register(email, password).then((user) => {
        Alert.alert('Welcome to StockFiew!', 'Your sign up has been completed');
        route.params.handleLogin();
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

  // Function to check if the password meets the specified conditions
  const isPasswordValid = () => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };

  // Update sign-up button disable state whenever the password changes
  useState(() => {
    setIsSignUpDisabled(!isPasswordValid());
  }, [password]);

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
        value={password}
        onChangeText={(val) => onChangeText('password', val)}
        onBlur={() => {
          if (!isPasswordValid()) {
            Alert.alert(
              'Invalid Password',
              'Password must be at least 8 characters long and contain a capital letter and a special character'
            );
          }
        }}
      />
      <Text style={styles.secondText}>
        - At least one capital letter, {'\n'}special character and number{'\n'}-
        Between 8 and 15 characters.{'\n'}
        {'\n'}
      </Text>
      <View style={{ marginVertical: 5 }}>
        <TouchableOpacity
          onPress={onSignUp}
          style={styles.button}
          disabled={!isPasswordValid()}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isPasswordValid() ? '#8A2BE2' : '#ccc' },
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>If you are a member</Text>
      <View style={{ marginVertical: 13 }}>
        <TouchableOpacity onPress={onSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Sign in here</Text>
        </TouchableOpacity>
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
    marginBottom: scaleSize(-8),
  },
  button: {
    width: scaleSize(150),
    height: scaleSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: scaleSize(8),
    marginTop: scaleSize(-5),
  },
  buttonText: {
    fontSize: scaleSize(16),
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
});
