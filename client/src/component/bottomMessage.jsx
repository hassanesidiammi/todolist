
const MessageBottom = (props) => {
  return (
    props.messageBottom && props.messageBottom.type &&
    <div className="col-sm-12 position-absolute bottom-0">
      <div className={`alert alert-${props.messageBottom.type} m-0`} role="alert">
        {props.messageBottom.message}
      </div>
    </div>
  )
};

export default MessageBottom;
