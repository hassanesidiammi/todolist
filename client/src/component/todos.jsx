import React, { useEffect, useState } from "react";
import { ListTask } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import todoService from "../services/todo.service";

import TodoForm from './todoForm';

const Todos = (props) => {
  const [addTodo, setAddTodo] = useState(false);

  useEffect(() => {
    todoService.getCollection(props.setTodos)
  }, []);

  const toggleAdd =  () => {
    setAddTodo(!addTodo);
  }

  return (
    <>
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
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="container my-2">
              <div className="col-sm-12">{
                addTodo ?
                  <div className="alert alert-info alert-dismissible fade show" role="alert">
                    <TodoForm />
                    <button type="button" className="btn-close" onClick={toggleAdd} ></button>
                  </div>
                 :
                <button className="btn btn-primary me-sm-2 float-sm-end" onClick={toggleAdd} >Add TODO</button>
              }</div>
            </div>
          </li>

      </ul>
    </>
  )
}

export default Todos;
