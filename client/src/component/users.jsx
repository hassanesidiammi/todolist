import React, { useEffect, useState } from "react";
import userService from "../services/user.service";
import Loading from "./loading";
import User from "./user";
import UserForm from "./userForm";

const Users = (props) => {
  useEffect(() => {
    userService.getCollection(props.setUsers)
  })

  const toggleAdd = () => console.log('toggleAdd');;
  return (
    <div className="row">
      <div className="col-sm-12 mb-0 mt-4 mx-0">
      {
        false ?
          <div className="alert alert-dismissible fade show" role="alert">
            <UserForm cancel={toggleAdd} setMessageBottom={props.setMessageBottom} />
            <button type="button" className="btn-close btn-danger" onClick={toggleAdd} ></button>
          </div>
        :
          <button className="btn btn-sm btn-success me-sm-2 float-sm-end" onClick={toggleAdd} >Add User</button>
      }
      </div>
      <div className="col-sm-12 my-0">
      
      {
        props.users && props.users.length && props.users.length > 0 ?
        <table className="table">
          <tbody>
          {props.users.map((user) =>
            <tr className="" key={user.id}>
              <User user={user} id={user.id} />
            </tr>
          )}
          </tbody>
        </table>
         :
        <Loading />
      }
      
      </div>
        
      
    </div>
  )
}

export default Users;