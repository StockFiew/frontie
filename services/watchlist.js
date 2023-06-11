import sendAuthenticatedRequest from './api';
import { API_URL } from '@env';

const watchlist = {
    getList() {
        return sendAuthenticatedRequest(`${API_URL}/watchlist`)
          .then(data => data.watchlist)
          .catch(error => {
              console.error(error);
          });
    },

    addItem(userId, symbol) {
        return sendAuthenticatedRequest(`${API_URL}/watchlist`, 'POST', { userId, symbol })
          .then(data => data.watchlist)
          .catch(error => {
              console.error(error);
          });
    },

    deleteItem(itemId) {
        return sendAuthenticatedRequest(`${API_URL}/watchlist/${itemId}`, 'DELETE')
          .then(data => data.watchlist)
          .catch(error => {
              console.error(error);
          });
    },
};

export default watchlist;