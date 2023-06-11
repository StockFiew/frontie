import * as SecureStore from 'expo-secure-store';

const sendAuthenticatedRequest = (url, method = 'GET', body = null) => {
  console.log(body)
  return SecureStore.getItemAsync('token')
    .then(token => {
      if (!token) {
        throw new Error('No token found');
      }
      console.log(token);
      const headers = {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      };
      const options = { method, headers };
      if (body) {
        options.body = JSON.stringify(body);
      }
      console.log(options)
      return fetch(url, options);
    })
    .then(response => response.json())
    .then(data => {
      if (data.token !== undefined) {
        SecureStore.setItemAsync('token', data.token)
      }
      if (!data.Error) {

        return data;
      } else {
        throw new Error(data.Message);
      }
    })
    .catch(error => {
      console.error(error);
      throw new Error('Unable to make authenticated request');
    });
};

export default sendAuthenticatedRequest;
