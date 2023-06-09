import React, { useState } from 'react';
import { Text, Alert, Button, TextInput, View, StyleSheet } from 'react-native';

export default function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    Alert.alert('Credentials', `${username} + ${password}`);
  };

  return (
    <View style={styles.container}>
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

      <Button title='Sign in' onPress={onLogin} color='#8A2BE2' />
      <Text>Or</Text>
      <Button title='Sign up' onPress={onLogin} color='#8A2BE2' />
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
