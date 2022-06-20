import React, { useState, useRef, useEffect } from "react";
import { ListTask } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import TaskItemsForm from "./taskItemsForm";

const TodoForm = (props) => {
  const form = useRef();

  const [title, setTitle] = useState(props?.todo?.title);
  const [errorTitle, setErrorTitle] = useState();
  const [description, setDescription] = useState(props?.todo?.description);
  const [tasks, setTasks] = useState((props?.todo?.tasks && props?.todo?.tasks.length) ? props.todo.tasks : []);
  const [newTasks, setNewTasks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage('');
    setErrorTitle('');
    setLoading(true);

    
    let mergedTasks = [].concat(
      newTasks.map((task) => {return {title: task.title}}),
      tasks.map((task) => {return {id: '/api/tasks/' + task.id, title: task.title}}),
    )
    ;
  
    (props.todo && props.todo.id) &&

    api.put(
      'todos/' + props.todo.id,
      {
        "title": title,
        "description": description,
        "tasks": mergedTasks
      }
    ).then(
      () => {
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        const violations = error.response && error.response.data && error.response.data.violations;
        if ((violations)) {
          violations.map((violation) => {
            if ('title' === violation.propertyPath) {
              setErrorTitle(violation.message);
            }
          })
        }

        setLoading(false);
        setSuccessful(false);
        setMessage(resMessage);
        setTimeout(() => {setMessage(false)}, 2000);
      }
    ) ||
    api.post(
      'todos',
      {
        "title": title,
        "description": description,
        "tasks": mergedTasks
      }
    ).then(
      () => {
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        const violations = error.response && error.response.data && error.response.data.violations;
        if ((violations)) {
          violations.map((violation) => {
            if ('title' === violation.propertyPath) {
              setErrorTitle(violation.message);
            }
          })
        }

        setLoading(false);
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="card card-container offset-sm-1 col-sm-10  row my-3 pb-3">
      <Form onSubmit={handleSubmit}  ref={form}>
        {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert"
              >
                {message}
              </div>
            </div>
          )}
        <div className="py-2 row">
          <div className="col-sm-12">
            <div className="input-group  input-group-sm  has-validation">
              <input
                type="text"
                className={`form-control${errorTitle ? " is-invalid" : ""}`}
                name="title"
                placeholder="Title"
                autoFocus
                defaultValue={title}
                onChange={onChangeTitle}
                required
              />
              <div className="invalid-feedback">
                {errorTitle}
              </div>
            </div>
          </div>
        </div>

        <div className="py-2 row">
          <div className="col-sm-12 input-group  input-group-sm  has-validation">
            <input
              type="description"
              className="form-control"
              name="description"
              placeholder="Description"

              defaultValue={description}
              onChange={onChangeDescription}
            />
          </div>
        </div>
        
        <div className="h6 mt-4 mb-3 p-4 py-0">Tasks</div>
            <ul className="list-group">
              <TaskItemsForm tasks={tasks} setTasks={setTasks} />
              <TaskItemsForm tasks={newTasks} setTasks={setNewTasks} />
            </ul>

        <div className="pt-4 pb-0 my-0 row">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <a
              className="btn btn-sm btn-success me-md-2"
              onClick={() => {
                let newest = [...newTasks, {title: '', id: 'new_' + newTasks.length}];
                setNewTasks(newest) }
              }
            >Add Task</a>
            
            <button
              className="btn btn-sm btn-success me-md-2"
              disabled={loading}
              type="submit"
            >
              <span className="px-2">Save</span>
              {loading && (
                <>&nbsp;&nbsp;<span className="spinner-border spinner-border-sm"></span></>
              )}
            </button>
            {props.cancel ?
              <a className="btn btn-sm btn-danger me-md-2" onClick={props.cancel}>
                <span>Cancel</span>
              </a> :
              ''
            }
          </div>
        </div>
      </Form>
    </div>

  );
}

export default TodoForm;
