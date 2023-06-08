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
      {/* <Text style={styles.headlinetext}>{props.text}</Text> */}
      <Text>Sign in</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder={'Username'}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button title={'Sign in'} onPress={onLogin} />
      <Button title={'Or Sign up now'} onPress={onLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
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
