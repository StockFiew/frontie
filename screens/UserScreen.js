import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/user';
import { scaleSize } from '../constants/Layout';
import * as SecureStore from "expo-secure-store";

const UserScreen = ({ route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [tempName, setTempName] = useState(() => name);
  const [tempEmail, setTempEmail] = useState(() => email);
  const [profilePic, setProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userApi = api.user();

  useEffect(() => {
    // Replace this with your own API call to fetch user data
    userApi.fetchUserData().then((data) => {
      setName(data.name);
      setEmail(data.email);
      setProfilePic(data.profilePic);
      setTempName(data.name);
      setTempEmail(data.email);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    );
  }

  const profileUri = `data:image/jpeg;base64,${profilePic}`;

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
            name: result.assets[0].fileName ?? 'profile.jpg',
          });
          userApi
            .upload(formData)
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
      userApi
        .updateUserProfile({
          name: tempName,
          email: tempEmail,
          oldPassword: currentPassword,
          newPassword: newPassword,
        })
        .then((data) => {
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
          <Image source={{ url: profileUri }} style={styles.profilePic} />
        </View>
        <View>
          {editMode && (
            <TouchableOpacity
              onPress={handlePickImage}
              style={styles.picEditButton}
            >
              <Text style={styles.picEditButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title}>Hi, my name is</Text>

        {editMode ? (
          <TextInput
            style={styles.input}
            placeholder='Name'
            placeholderTextColor={'#949292'}
            value={tempName}
            onChangeText={handleNameChange}
          />
        ) : (
          <View>
            <Text style={[styles.label, { textAlign: 'center' }]}>Name:</Text>
            <Text style={[styles.text, { textAlign: 'center' }]}>{name}</Text>
          </View>
        )}
        {editMode ? (
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor={'#949292'}
            value={tempEmail}
            onChangeText={handleEmailChange}
            keyboardType='email-address'
            textContentType='emailAddress'
            autoCompleteType='email'
            autoCapitalize='none'
            autoCorrect={false}
            onBlur={() => {
              if (!email.includes('@')) {
                alert('Email must contain an @ symbol');
              }
            }}
          />
        ) : (
          <View>
            <Text style={[styles.label, { textAlign: 'center' }]}>Email:</Text>
            <Text style={[styles.text, { textAlign: 'center' }]}>{email}</Text>
          </View>
        )}
        {editMode && (
          <>
            <TextInput
              style={styles.input}
              placeholder='Current Password'
              placeholderTextColor={'#949292'}
              value={currentPassword}
              onChangeText={handleCurrentPasswordChange}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder='New Password'
              placeholderTextColor={'#949292'}
              value={newPassword}
              onChangeText={handleNewPasswordChange}
              secureTextEntry
              textContentType='newPassword'
              autoCompleteType='password'
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={100}
              onBlur={() => {
                if (
                  newPassword.length < 8 ||
                  !/[A-Z]/.test(newPassword) ||
                  !/[^A-Za-z0-9]/.test(newPassword)
                ) {
                  alert(
                    'Password must be at least 8 characters long and contain a capital letter and a special character'
                  );
                }
              }}
            />
          </>
        )}
        {editMode ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancleButton}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={ route.params.handleLogout }>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
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
    padding: scaleSize(20),
  },
  title: {
    fontSize: scaleSize(28),
    fontWeight: 'bold',
    color: '#333',
    margin: scaleSize(20),
  },
  profilePicContainer: {
    position: 'relative',
    width: scaleSize(120),
    height: scaleSize(120),
    borderRadius: scaleSize(60),
    overflow: 'hidden',

    backgroundColor: '#d9d9d9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  picEditButton: {
    position: 'absolute',
    bottom: scaleSize(5),
    right: scaleSize(-24),
    width: scaleSize(40),
    height: scaleSize(30),
    borderRadius: scaleSize(15),
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  picEditButtonText: {
    color: '#fff',
    fontSize: scaleSize(15),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#8A2BE2',
    borderRadius: scaleSize(10),
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(10),
    marginHorizontal: scaleSize(50),
  },
  cancleButton: {
    backgroundColor: '#807e7e',
    borderRadius: scaleSize(10),
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(10),
    marginHorizontal: scaleSize(50),
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleSize(14),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: scaleSize(16),
    fontWeight: '500',
    color: '#333',
    marginTop: scaleSize(20),
    textTransform: 'uppercase',
  },
  text: {
    fontSize: scaleSize(25),
    color: '#333',
    marginBottom: scaleSize(20),
    textAlign: 'center',
    fontWeight: 'bold',
  },

  input: {
    width: '70%',
    height: scaleSize(40),
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: scaleSize(10),
    marginVertical: scaleSize(1),
    paddingVertical: scaleSize(8),
    borderRadius: scaleSize(5),
    fontSize: scaleSize(13),
    paddingBottom: scaleSize(-20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: scaleSize(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    opacity: 0.8,
  },
});

export default UserScreen;
