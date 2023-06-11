import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../services/user';

const UserScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const userApi = api.user();

  useEffect(() => {
    userApi.fetchUserData()
      .then(userData => {
        setName(userData.name);
        setEmail(userData.email);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleCurrentPasswordChange = (text) => {
    setCurrentPassword(text);
  };

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
  };

  const handleSave = () => {
    if (editMode) {
      userApi.updateUserProfile({ name, email, oldPassword: currentPassword, newPassword })
        .then(() => {
          alert('User info updated successfully!');
          setEditMode(false);
        })
        .catch(error => {
          console.error(error);
          alert('Failed to update user info');
        });
    } else {
      setEditMode(true);
    }
  };

  return (
    <LinearGradient colors={['#0072ff', '#00c6ff']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>User Info</Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{email}</Text>
        {editMode && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={handleNameChange}
            />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={handleCurrentPasswordChange}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={handleNewPasswordChange}
              secureTextEntry
            />
          </>
        )}
        <Button title={editMode ? 'Submit' : 'Edit'} onPress={handleSave} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20   },
  text: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
  },
});

export default UserScreen;
