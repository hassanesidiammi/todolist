import api, { logout } from "../utils/api";

class TodoService {
  getCollection(setTodos) {
    api.get('/todos').then(response => {
      setTodos(response.data)
    }).catch(response => {
      if (response.code === "ERR_BAD_REQUEST") {
        logout();
      }
    });
  }

  get(id, setTodo) {
    return api.get('/todos/' + id).then(response => {
      setTodo(response.data)
    });
  }
}
export default new TodoService();
