import { sendAuthenticatedRequest } from './api';
import { API_URL } from '@env';

const watchlistApi = {
    async getList() {
        try {
            const data = await sendAuthenticatedRequest(`${API_URL}/watchlist`);
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    async addItem(userId, symbol) {
        try {
            const data = await sendAuthenticatedRequest(`${API_URL}/watchlist`, 'POST', { userId, symbol });
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    async deleteItem(itemId) {
        try {
            const data = await sendAuthenticatedRequest(`${API_URL}/watchlist/${itemId}`, 'DELETE');
            return data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default watchlistApi;