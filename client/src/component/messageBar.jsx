
const MessageBar = (props) => {
  return (
    props.messageBar && props.messageBar.type &&
    <div className="col-sm-12">
      <div className={`alert alert-${props.messageBar.type} m-0`} role="alert">
        {props.messageBar.message}
      </div>
    </div>
  )
};

export default MessageBar;
