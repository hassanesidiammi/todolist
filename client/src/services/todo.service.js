import api from "../utils/api";

class TodoService {
  getCollection(setTodos) {
    api.get('/todos').then(response => {
      setTodos(response.data)
    });
  }

  get(id) {
    return api.get('/todos/' + id);
  }
}
export default new TodoService();
