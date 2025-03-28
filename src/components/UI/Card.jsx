import React from "react";

const Card = ({ children, className = "" }) => {
  return <div className={`card p-6 ${className}`}>{children}</div>;
};

export default Card;
