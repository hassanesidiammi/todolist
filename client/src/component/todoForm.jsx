import React, { useState, useRef, useEffect } from "react";
import { ListTask } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import TaskItemsForm from "./taskItemsForm";

const TodoForm = (props) => {
  const form = useRef();

  const [values, setValues] = useState({title: props?.todo?.title, description: props?.todo?.description, tasks: props?.todo?.tasks});
  const [errors, setErrors] = useState({title: '', description: ''});
  const [tasks, setTasks] = useState((props?.todo?.tasks && props?.todo?.tasks.length) ? props.todo.tasks : []);
  const [newTasks, setNewTasks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const submitError = (error) => {
    const resMessage =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    const violations = error.response.data?.violations
    if ((violations)) {
      violations.map((violation) => {
        setErrors({...errors, [violation.propertyPath]: violation.message});
      })
    }

    setLoading(false);
    setSuccessful(false);
    setMessage(resMessage);
    setTimeout(() => {setMessage(false)}, 2000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    let mergedTasks = [].concat(
      newTasks.map((task) => {return {title: task.title}}),
      tasks.map((task) => {return {id: '/api/tasks/' + task.id, title: task.title}}),
    )
    ;

    if (props?.todo?.id) {
      api.put(
        'todos/' + props.todo.id,
        {...values, tasks: mergedTasks}
      ).then(
        () => {
          setLoading(false)
        },
        submitError
      )
    }else {
      api.post(
        'todos',
        values
      ).then(
        () => {
          setLoading(false)
        },
        submitError
      )
    }
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
                className={`form-control${errors?.title ? " is-invalid" : ""}`}
                name="title"
                placeholder="Title"
                autoFocus
                defaultValue={values?.title}
                onChange={onChange}
                // required
              />
              <div className="invalid-feedback">
                {errors?.title}
              </div>
            </div>
          </div>
        </div>

        <div className="py-2 row">
          <div className="col-sm-12 input-group  input-group-sm  has-validation">
            <input
              type="description"
              className={`form-control${errors?.description ? " is-invalid" : ""}`}
              name="description"
              placeholder="Description"

              defaultValue={values?.description}
              onChange={onChange}
            />
            <div className="invalid-feedback">
                {errors?.description}
              </div>
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
