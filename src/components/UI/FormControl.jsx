import React from "react";

const FormControl = ({
  label,
  name,
  type = "text",
  register,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        className={`form-input ${error ? "border-red-500" : ""}`}
        {...register}
        {...props}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default FormControl;
