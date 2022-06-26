import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import todoService from "../services/todo.service";
import Loading from "./loading";
import TodoForm from "./todoForm";

const Todo = (props) => {
  const params = useParams();

  const [todo, setTodo] = useState(null);
  const [modify, setModify] = useState(false);
  const [message, setMessage] = useState(false);
  const [successful, setSuccessful] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (!todo) {
      todoService.get(params.todoId,  setTodo).then(response => {
        if (response) {
          props.setMessageBar(
            response?.data?.owner.id === getCurrentUser().id ?
            {
              type: 'success',
              message: 'You can modify/delete this todo'
            }:
            {
              type: 'danger',
              message: 'You cannot modify/delete this todo!'
            }
          )
        }
      })
    }
  })


  const handleCancel = () => {
    todoService.get(params.todoId,  setTodo);
    setModify(false);
  }

  const deleteTodo = () => {
    todoService.delete(params.todoId).then(
      () => navigate('/todos')
    ).catch((error) => {
      setMessage(error.message);
      setSuccessful(false);

      setTimeout(() => {setMessage(false)}, 2000);
    })
  }

  return (
    <div className="container m-3">
      {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert"
              >
                {message}
              </div>
            </div>
          )}
      {
        todo?.id ? (
          modify ? <TodoForm todo={todo} cancel={handleCancel} /> : (
            <div className="offset-sm-1 col-sm-10">
              <div className="h3 text-center">#{todo.id} {todo.title}</div>
              <p className="">{todo.description}</p>{
                (todo.tasks && todo.tasks.length) ?
                  <>
                  <div className="h4">Tasks</div>
                    <ul className="list-group">{
                      todo.tasks.map((task, i) => <li className="list-group-item" key={i+1} >{task.title}</li>)
                    }</ul>
                  </>
                : ''
              }

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button className="btn btn-sm btn-success me-sm-2 float-sm-end" onClick={() => setModify(1) } >Modify</button>
                <button className="btn btn-sm btn-danger me-sm-2 float-sm-end" onClick={deleteTodo} >Delete</button>
              </div>
            </div>
          )
        ) : <Loading /> 
        
      }
    </div> 
  )
}

export default Todo;
