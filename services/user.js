import * as SecureStore from 'expo-secure-store';
import sendAuthenticatedRequest from './api';
import { API_URL } from '@env';

function user() {
  const fetchUserData = () =>
    sendAuthenticatedRequest(`${API_URL}/users/me`).then(response => response.User);

  const updateUserProfile = profileData =>
    sendAuthenticatedRequest(`${API_URL}/users/update`, 'PUT', profileData);

  const register = (email, password) =>
    fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.Error) {
          const token = data.Token;
          return SecureStore.setItemAsync('token', token).then(() => data.User);
        } else {
          throw Error(data.Message);
        }
      })
      .catch(error => {
        console.error(error);
        throw Error('Unable to register user');
      });

  const login = (email, password) =>
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.Error) {
          const token = data.token;
          return SecureStore.setItemAsync('token', token).then(() => data.payload);
        } else {
          throw Error(data.Message);
        }
      })
      .catch(error => {
        console.error(error);
        throw error;
      });

  return { fetchUserData, updateUserProfile, register, login };
}

const api = { user };

export default api;
