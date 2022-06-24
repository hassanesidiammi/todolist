import React from "react";

const User = (prpops) => {

  return (
    <>
      <th scop="raw">
        <span className="fw-bold">{prpops.user.id}</span>
      </th>
      <td className="col-sm-3">
        {prpops.user.username}
      </td>
      <td className="col-sm-4">
      { prpops.user.email}
      </td>
      <td></td>
    </>
  )
}

export default User;