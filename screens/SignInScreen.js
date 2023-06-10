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
      <Image source={logo} style={styles.logo} />
      <View style={styles.secondContainer}>
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
    width: 310,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6ee',
    borderRadius: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 20,
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
    color: '#525050',
    fontSize: 14,
    marginTop: 10,
    marginBottom: -7,
  },
});
