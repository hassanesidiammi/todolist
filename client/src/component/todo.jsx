import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import todoService from "../services/todo.service";
import Loading from "./loading";
import TodoForm from "./todoForm";

const Todo = (props) => {
  const params = useParams();

  const [todo, setTodo] = useState();
  const [modify, setModify] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    todoService.get(params.todoId,  setTodo)
  }, []);

  const handleCancel = () => {
    // todoService.get(params.todoId,  setTodo);
    setModify(false);
  }

  const deleteTodo = () => {
    todoService.delete(params.todoId);

    navigate('/todos');
  }

  return (
    <div className="container m-3">
      {
        todo ? (
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

              <button className="btn btn-primary me-sm-2 float-sm-end" onClick={() => setModify(1) } >Modify</button>
              <button className="btn btn-danger me-sm-2 float-sm-end" onClick={deleteTodo} >Delete</button>
            </div>
          )
        ) : <Loading /> 
        
      }
    </div> 
  )
}

export default Todo;
