import React from "react";

const Loading = () => {
  return (
<div className="position-relative p-5">
  <div className="position-absolute top-50 start-50 translate-middle">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
</div>
  )
}

export default Loading;