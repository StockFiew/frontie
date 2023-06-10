import React, { useState } from 'react';
import { Text, Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import icon from '../assets/images/icon.png'; // Relative path to the image

export default function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const onSignIn = () => {
    Alert.alert('Credentials', `${username} + ${password}`);
    navigation.navigate('Home'); // Navigate to the 'Home' screen
  };

  const onSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the 'SignUp' screen
  };

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.logo} />

      <Text style={styles.title}>Sign in</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
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

      <Button title='Sign in' onPress={onSignIn} color='#8A2BE2' />
      <Text>Or</Text>
      <Button title='Sign up' onPress={onSignUp} color='#8A2BE2' />
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
