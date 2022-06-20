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
      <table className="table">
        <tbody>
          { props.todos.map(todo => (
            <tr key={todo.id}>
              <th scope="row">{todo.id}</th>
              <td><Link to={'/todos/' + todo.id} className="h6 text-monospace text-reset text-decoration-none" ><span className="fw-bold"></span>{todo.title}</Link></td>
              <td></td>
            </tr>
        ))}
        </tbody>
      </table>
      <div className="bottom">
        <div className="container my-1">
          <div className="col-sm-12">{
            addTodo ?
              <div className="alert alert-dismissible fade show" role="alert">
                <TodoForm cancel={toggleAdd} />
                <button type="button" className="btn-close btn-danger" onClick={toggleAdd} ></button>
              </div>
              :
            <button className="btn btn-sm btn-success me-sm-2 float-sm-end" onClick={toggleAdd} >Add TODO</button>
          }</div>
        </div>
      </div>
    </>
  )
}

export default Todos;
