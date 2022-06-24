import api, { logout } from "../utils/api";
import authHeader from "./auth.service";

class TodoService {
  getCollection(setTodos) {
    // api.get('/todos', {headers: authHeader()}).then(response => {
      api.get('/todos').then(response => {
      
      setTodos(response.data)
    }).catch(response => {
      if (response.code === "ERR_BAD_REQUEST") {
        // logout();
      }
    });
  }

  get(id, setTodo) {
    return api.get('/todos/' + id).then(response => {
      setTodo(response.data)
      return response
    });
  }

  delete(id) {
    return api.delete('/todos/' + id);
  }
}
export default new TodoService();
