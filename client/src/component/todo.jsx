import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import todoService from "../services/todo.service";

const Todo = (props) => {
  const params = useParams();

  useEffect(() => {
    todoService.get(params.todoId,  props.setTodo)
  }, []);

  return (
      <ul className="list-group">
        <div className="ms-2 me-auto">
          <span className="fs-5 fw-bold">#{props.todo.id} </span>
          <span className="fs-5">{props.todo.title} </span>
          <span className="fw-normal">{props.todo.description}</span>
        </div>
          
        </ul>
      )}

export default Todo;
