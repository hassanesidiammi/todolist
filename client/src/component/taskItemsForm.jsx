import React, { useState } from "react";

const TaskItemsForm = (props) => {

  const tasks = props.tasks;
  const setTasks = props.setTasks;

  const onChangeTask = (e, id) => {
    // @TODO: need it ???
    let tks = [...tasks];
    tks = tks.map((tk) => {
      if (tk.id === id){
        tk.title = e.target.value
      }

      return tk;
    })

    setTasks(tks);
  };
  const onDeleteTask = (id) => {
    setTasks(tasks.filter(item => item.id !== id));
  };

  return (
    tasks.map((task, i) => {
      const id = task?.id ? task.id : 'new_' + i;

      return (
        <li className="list-group-item p-0 my-1" key={id} >
          <div className="input-group  input-group-sm ">
            <input
              type="text"
              name="tasks[]"
              className="form-control"
              defaultValue={task.title}
              onChange={(e) => onChangeTask(e, id)}
              placeholder="Title"
              required
            />
            <a className="btn btn-outline-danger" type="button" onClick={(e) => onDeleteTask(task.id)} >X</a>
          </div>
        </li>
      )
      
    })
  );
}

export default TaskItemsForm;
