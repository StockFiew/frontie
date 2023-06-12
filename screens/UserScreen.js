import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/user';

const UserScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const userApi = api.user();

  useEffect(() => {
    // Replace this with your own API call to fetch user data
    userApi.fetchUserData().then((data) => {
      setName(data.name);
      setEmail(data.email);
      setProfilePic(data.profilePic);
    });
  }, []);
  const profileUri = `data:image/jpeg;base64,${profilePic}`

  useEffect(() => {
    setTempName(name);
    setTempEmail(email);
  }, [name, email]);

  const handleNameChange = (text) => {
    setTempName(text);
  };

  const handleEmailChange = (text) => {
    setTempEmail(text);
  };

  const handleCurrentPasswordChange = (text) => {
    setCurrentPassword(text);
  };

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
  };

  const handlePickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
      .then((result) => {
        if (!result.canceled) {
          const formData = new FormData();
          formData.append('picture', {
            uri: result.assets[0].uri,
            type: 'image/jpeg',
            name: result.assets[0].fileName ?? 'profile.jpg'
          });
          userApi.upload(formData)
            .then((response) => {
              setProfilePic(result.uri);
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const handleSave = () => {
    if (editMode) {
      // Replace this with your own API call to update user profile
      userApi.updateUserProfile({
        name: tempName,
        email: tempEmail,
        oldPassword: currentPassword,
        newPassword: newPassword
      }).then((data) => {
        console.log('User info updated successfully!');
        setName(tempName);
        setEmail(tempEmail);
        setEditMode(false);
        console.log(data);
      });
    } else {
      setEditMode(true);
    }
  };

  const handleCancel = () => {
    setTempName(name);
    setTempEmail(email);
    setCurrentPassword('');
    setNewPassword('');
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profilePicContainer}>
          <Image source={ {url: profileUri} } style={styles.profilePic} />
          {editMode && (
            <TouchableOpacity onPress={handlePickImage} style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>Hi, my name is</Text>
        <Text style={styles.label}>Name:</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={tempName}
            onChangeText={handleNameChange}
          />
        ) : (
          <Text style={styles.text}>{name}</Text>
        )}
        <Text style={styles.label}>Email:</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={tempEmail}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCompleteType="email"
            autoCapitalize="none"
            autoCorrect={false}
            onBlur={() => {
              if (!email.includes('@')) {
                alert('Email must contain an @ symbol');
              }
            }}
          />
        ) : (
          <Text style={styles.text}>{email}</Text>
        )}
        {editMode && (
          <>
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
              textContentType="newPassword"
              autoCompleteType="password"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={100}
              onBlur={() => {
                if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
                  alert('Password must be at least 8 characters long and contain a capital letter and a special character');
                }
              }}
            />
          </>
        )}
        {editMode ? (
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={handleCancel} color="#ff3b30" />
          </View>
        ) : (
          <Button title="Edit" onPress={handleSave} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  profilePicContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  profilePic: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#007aff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default UserScreen;
