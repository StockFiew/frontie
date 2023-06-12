import * as SecureStore from 'expo-secure-store';

const sendAuthenticatedRequest = (url, method = 'GET', body = null, ct = "application/json") => {
  return SecureStore.getItemAsync('token')
    .then(token => {
      if (!token) {
        throw new Error('No token found');
      }
      const headers = {
        'Content-Type': ct,
        Authorization: "Bearer " + token,
        Accept: 'application/json',
      };

      const options = { method, headers };
      if (body) {
        if (ct === "multipart/form-data"){
          options.body = body;
        } else {
          options.body = JSON.stringify(body);
        }
      }
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
