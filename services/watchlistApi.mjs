import { sendAuthenticatedRequest } from './api';

const watchlistApi = {
    async getList() {
        try {
            const data = await sendAuthenticatedRequest(`http://localhost:3000/api/watchlist`);
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    async addItem(userId, symbol) {
        try {
            const data = await sendAuthenticatedRequest('http://localhost:3000/api/watchlist', 'POST', { userId, symbol });
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    async deleteItem(itemId) {
        try {
            const data = await sendAuthenticatedRequest(`http://localhost:3000/api/watchlist/${itemId}`, 'DELETE');
            return data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default watchlistApi;