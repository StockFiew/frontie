import sendAuthenticatedRequest from './api';
import { API_URL } from '@env';

export const watchlist = {
    getList() {
        return sendAuthenticatedRequest(`${API_URL}/watchlist`)
          .then(data => data.watchlist)
          .catch(error => {
              console.error(error);
          });
    },

    addItem(i) {
        return sendAuthenticatedRequest(`${API_URL}/watchlist/add`, 'POST', i)
          .then(data => data.watchlist)
          .catch(error => {
              console.error(error);
          });
    },

    deleteItem(i) {
        return sendAuthenticatedRequest(`${API_URL}/watchlist/delete`, 'DELETE', i)
          .then(data => data.watchlist)
          .catch(error => {
              console.error(error);
          });
    },
};

export default watchlist;