import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendAuthenticatedRequest = async (url, method = 'GET', body = null) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const options = { method, headers };
    if (body) {
      options.body = JSON.stringify(body);
    }
    console.log(options)
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`'Request failed`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Unable to make authenticated request');
  }
};

export default sendAuthenticatedRequest;
