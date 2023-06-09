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
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder='Password'
        secureTextEntry={true}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
