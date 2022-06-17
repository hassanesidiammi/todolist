import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import todoService from "../services/todo.service";

const Todo = (props) => {

  const [todo, setTodo] = useState([]);
  const params = useParams();

  useEffect(() => {
    todoService.get(params.todoId,  setTodo)
  }, []);

  return (
      <ul className="list-group">
        <div className="ms-2 me-auto">
          <span className="fs-5 fw-bold">#{todo.id} </span>
          <span className="fs-5">{todo.title} </span>
          <span className="fw-normal">{todo.description}</span>
        </div>
          
        </ul>
      )}

export default Todo;
