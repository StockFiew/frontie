import AsyncStorage from '@react-native-async-storage/async-storage';
import sendAuthenticatedRequest from './api';
import { API_URL } from '@env';

// require('dotenv').config()
// ^ original code
// The require('dotenv').config() function is not supported in Expo,
// and using it will result in an error(from ChatGPT).

// fill in QUT virtual machine IP

const BASE_URL = API_URL;
// const BASE_URL = process.env.API_URL;
// ^ original code

const userApi = {
  async fetchUserData() {
    try {
      const response = await sendAuthenticatedRequest(`${BASE_URL}/users/me`);
      return response.User;
    } catch (error) {
      console.error(error);
      throw Error('Unable to fetch user data');
    }
  },

  // oldPassword is mandatory
  // newPassword only provided when user need to change password
  // Name when user need to change name
  // Email when user need to change email
  async updateUserProfile(profileData) {
    try {
      return await sendAuthenticatedRequest(
        `${BASE_URL}/users/update`,
        'PUT',
        profileData
      );
    } catch (error) {
      console.error(error);
      throw Error('Unable to update user profile');
    }
  },

  /*
  (BySue) I used this template. Thank you Benji
    Example
    const RegisterScreen = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleRegister = async () => {
            try {
                const user = await registerUser(email, password);
                console.log('Registered user:', user);
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <View>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button title="Register" onPress={handleRegister} />
            </View>
        );
    };
    */
  async registerUser(email, password) {
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!data.Error) {
        return data.User;
      } else {
        throw Error(data.Message);
      }
    } catch (error) {
      console.error(error);
    }
  },

  async loginUser(email, password) {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!data.Error) {
        const token = data.Token;
        await AsyncStorage.setItem('token', token);
      } else {
        console.error(data.Message);
        throw Error(data.Message);
      }
      return data.User;
    } catch (err) {
      console.error(err);
      throw Error(err);
    }
  },
};

export default { userApi };
