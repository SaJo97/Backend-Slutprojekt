const FormInput = ({ className, errorMsg, label, name, id, ...rest }) => {
  return (
    <div className={`form-group ${className}`}>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input className="form-input" id={id} name={name} {...rest} />
      {errorMsg && <p className="invalid-input">{errorMsg}</p>}
    </div>
  );
};
export default FormInput;
