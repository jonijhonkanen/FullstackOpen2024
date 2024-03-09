const Notification = ({ message }) => {
  //console.log(message.type);
  if (message === null) {
    return null;
  }

  return message.type === 'success' ? (
    <div className="success">{message.message}</div>
  ) : (
    <div className="error">{message.message}</div>
  );
};

export default Notification;
