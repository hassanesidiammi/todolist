import api from '../utils/api';
import authHeader from './auth.service';

class UserService {
  getCollection(setUsers) {
    return api.get('users').then((response) => {
      setUsers(response.data);
    });
  }

  getUser(id) {
    return api.get('users/' + id, { headers: authHeader() });
  }
}
export default new UserService();
