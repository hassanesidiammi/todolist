import React, { useState, useRef, useEffect } from "react";
import { ListTask } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

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

  const onChangeNewTask = (e, id) => {
    // @TODO: need it ???
    let tks = [...newTasks];
    tks = tks.map((tk) => {
      if (tk.id === id){
        tk.title = e.target.value
      }

      return tk;
    })
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
        <div className="p-3 row">
          <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <div className="input-group has-validation">
              <input
                type="text"
                className={`form-control${errorTitle ? " is-invalid" : ""}`}
                name="title"
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

        <div className="p-3 row">
          <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <input
              type="description"
              className="form-control"
              name="description"

              defaultValue={description}
              onChange={onChangeDescription}
            />
          </div>
        </div>
        
        <div className="h6 mt-4 mb-3 mpx-1">Tasks</div>
            <ul className="list-group">
              {
                tasks.map((task, i) => <li className="list-group-item" key={i+1} >
                  <input
                    type="text"
                    name="tasks[]"
                    defaultValue={task.title}
                    onChange={(e) => onChangeTask(e, task.id)}
                    required
                  />
                </li>)
              }

              {
                newTasks.map((task, i) => <li className="list-group-item" key={'new_' + i} >
                  <input
                    type="text"
                    name="tasks[]"
                    defaultValue={task.title}
                    id={'new_' + i}
                    onBlur={(e) => onChangeNewTask(e, 'new_' + i)}
                    required
                  />
                </li>)
              }
            </ul>
            <div className="my-3 mx-1">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <a
                  className="btn btn-sm btn-success me-md-2"
                  onClick={() => {
                    let newest = [...newTasks, {title: '', id: 'new_' + newTasks.length}];
                    setNewTasks(newest) }
                  }
                >Add Task</a>
              </div>
            </div>

        <div className="py-3 row">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            {props.cancel ?
              <a className="btn btn-warning me-md-2" onClick={props.cancel}>
                <span>Cancel</span>
              </a> :
              ''
            }
            <button
              className="btn btn-primary me-md-2"
              disabled={loading}
              type="submit"
            >
              <span>Save</span>
              {loading && (
                <>&nbsp;&nbsp;<span className="spinner-border spinner-border-sm"></span></>
              )}
            </button>
          </div>
        </div>
      </Form>
    </div>

  );
}

export default TodoForm;
