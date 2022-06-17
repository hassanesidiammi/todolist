import React, { useEffect, useState } from "react";
import todoService from "../services/todo.service";
import Todo from "./todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoService.getCollection(setTodos)
  }, []);

  return (
    <ul className="list-group">
      { todos.map(todo => (<Todo todo={todo} key={todo.id} />))}
    </ul>
    )
}

export default Todos;
