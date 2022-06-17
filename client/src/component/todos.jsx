import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import todoService from "../services/todo.service";
import Todo from "./todo";

const Todos = (props) => {
  useEffect(() => {
    todoService.getCollection(props.setTodos)
  }, []);

  return (
    <ul className="list-group">
      { props.todos.map(todo => (
        <li key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-start">
            <Link to={'/todos/' + todo.id}>
              <span className="fw-bold">#{todo.id} </span>
              {todo.title}
            </Link>
        </li>
      ))}
    </ul>
    )
}

export default Todos;
