import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';

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
        // Password must contain at least one Capital letter, and number.
        // The length must be between 8 and 15 characters.
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
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize='none'
        placeholderTextColor='#FFFFFF'
        onChangeText={(val) => onChangeText('email', val)}
      />

      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        autoCapitalize='none'
        placeholderTextColor='#FFFFFF'
        onChangeText={(val) => onChangeText('password', val)}
      />

      <Button title='Sign Up' onPress={signUp} color='#8A2BE2' />
      <Text>Or</Text>
      <Button title='Sign In' onPress={signIn} color='#8A2BE2' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: 300,
    height: 55,
    backgroundColor: '#8A2BE2',
    margin: 10,
    padding: 15,
    color: 'white',
    borderRadius: 14,
    fontSize: 15,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

/*
    Example
    const RegisterScreen = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleRegister = async () => {
            try {
                const user = await registerUser(email, password);
                console.log('Registered user:', user);
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <View>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button title="Register" onPress={handleRegister} />
            </View>
        );
    };
    */
