const Alert = ({ alert }) => {
  return (
    alert && (
      <div className="my-4 rounded p-3 opacity-90 bg-red-500 text-white">
        <i className="fas fa-info-circle" />
        {alert}
      </div>
    )
  );
};

export default Alert;
