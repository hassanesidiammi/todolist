import React, { useEffect, useState } from "react";
import { ListTask, Person, PersonFill } from "react-bootstrap-icons";
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
    <div className="row">
    <div className="col-sm-12 mt-4 mb-0">
    {
      addTodo ?
        <div className="alert alert-dismissible fade show" role="alert">
          <TodoForm cancel={toggleAdd} setMessageBottom={props.setMessageBottom} />
          <button type="button" className="btn-close btn-danger" onClick={toggleAdd} ></button>
        </div>
      :
        <button className="btn btn-sm btn-success me-sm-2 float-sm-end" onClick={toggleAdd} >Add TODO</button>
    }
    </div>

    { props.todos && props.todos.length ?
    <div className="col-sm-12 my-0">
    <table className="table">
      <tbody>
        { props.todos.map(todo => (
          <tr key={todo.id}>
            <th scope="row">{todo.id}</th>
            <td>
              <span className="pr-3">
              {props.currentUser.id === todo.owner.id ?
                <PersonFill color="royalblue" size={16} alignmentBaseline={"left"} /> :
                <Person color="royalblue" size={16} alignmentBaseline={"left"} />
              }
              &nbsp;&nbsp;&nbsp;</span>
              <span className="pt-4">{todo.owner.username}</span></td>
            <td><Link to={'/todos/' + todo.id} className="h6 text-monospace text-reset text-decoration-none" ><span className="fw-bold"></span>{todo.title}</Link></td>
            
            <td></td>
          </tr>
      ))}
      </tbody>
    </table>
    </div> : ''
    }
    </div>
  )
}

export default Todos;
