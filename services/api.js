import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.Error === 'False') {
            return data;
        } else {
            throw new Error(data.Message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Unable to make authenticated request');
    }
};

export default sendAuthenticatedRequest;