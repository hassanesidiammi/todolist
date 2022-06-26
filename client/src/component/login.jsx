import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { FilePerson } from "react-bootstrap-icons";
import { login } from "../utils/api";
import { useEffect } from "react";
import { getCurrentUser } from "../services/auth.service";

const Login = (props) => {
  let navigate = useNavigate();

  const form = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    login(username, password, props.setCurrentUser).then(
      () => {
        navigate("/");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  };

  useEffect(() => {
    props.setMessageBar({})
    if(!getCurrentUser()) {
      props.setCurrentUser(false)
    }
  }, [])

  return (
    <div className="card card-container offset-sm-3 col-sm-6  row my-3 pb-3">
      <Form onSubmit={handleLogin}  ref={form}>
        <div className="my-2 row">
          <FilePerson color="royalblue" size={96} alignmentBaseline={"center"} />
        </div>
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
          <label htmlFor="username" className="col-sm-3 col-form-label">Username</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              name="username"
              autoFocus
              value={username}
              onChange={onChangeUsername}
              required
            />
          </div>
        </div>

        <div className="p-3 row">
          <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              name="password"

              value={password}
              onChange={onChangePassword}
              required
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
                  <span>Login</span>
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

export default Login;
