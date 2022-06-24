import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";

const UserForm = (props) => {
  const form = useRef();

  const [message, setMessage] = useState
  const [loading, setLoading] = useState

  const handleSubmit = (e) => {
    e.preventDefault();

    // setMessage('');
    // setErrorTitle('');
    // setLoading(true);

  };

  return (
    <div className="card card-container offset-sm-1 col-sm-10  row my-3 pb-3">
      <Form onSubmit={handleSubmit}  ref={form}>
        {message && (
            <div className="form-group">
              <div
                // className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert"
              >
                {message}
              </div>
            </div>
          )}
        <div className="py-2 row">
          <div className="col-sm-12">
            </div>
        </div>

        <div className="py-2 row">
          <div className="col-sm-12 input-group  input-group-sm  has-validation">
            <input
              
            />
          </div>
        </div>
        
        <div className="h6 mt-4 mb-3 p-4 py-0">Tasks</div>
           

        <div className="pt-4 pb-0 my-0 row">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <a
              className="btn btn-sm btn-success me-md-2"
              onClick={() => {console.log('onClick');} }
            >Add User</a>
            
            <button
              className="btn btn-sm btn-success me-md-2"
              disabled="disabled"
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

export default UserForm;
