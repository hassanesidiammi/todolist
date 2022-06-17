import React, { useState, useRef } from "react";
import { ListTask } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

const TodoForm = (props) => {
  const form = useRef();

  const [title, setTitle] = useState();
  const [errorTitle, setErrorTitle] = useState();
  const [description, setDescription] = useState();

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

    api.post(
      'todos',
      {
        "title": title,
        "description": description
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
                value={title}
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

              value={description}
              onChange={onChangeDescription}
            />
          </div>
        </div>

        <div className="p-3 row">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
