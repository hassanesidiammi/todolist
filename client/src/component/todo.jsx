import React from "react";

const Todo = (props) => {

  let todo = props.todo
  return (
      <li
        key={todo.id}
        className="list-group-item d-flex justify-content-between align-items-start"
      >
        <ul className="list-group">
        <div className="ms-2 me-auto">
          <span className="fs-5 fw-bold">#{todo.id} </span>
          <span className="fs-5">{todo.title} </span>
          <span className="fw-normal">{todo.description}</span>
        </div>
          {todo.tasks.map((task, index) => (
          <li
            key={todo.id + '_' + index}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <span className="fw-normal">{task.title}</span>
            </div>
          </li>
          ))}
        </ul>
        
      </li>
      )}

export default Todo;
