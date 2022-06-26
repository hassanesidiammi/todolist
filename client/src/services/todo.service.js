import api, { logout } from "../utils/api";
import authHeader from "./auth.service";

class TodoService {
  getCollection(setTodos) {
      api.get('/todos').then(response => {
      setTodos(response?.data || [])
    })
  }

  get(id, setTodo) {
    return api.get('/todos/' + id).then(response => {
      setTodo(response?.data || [])
      return response
    });
  }

  delete(id) {
    return api.delete('/todos/' + id);
  }
}
export default new TodoService();
