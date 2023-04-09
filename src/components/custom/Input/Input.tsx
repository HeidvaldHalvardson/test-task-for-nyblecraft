import React, {FC, InputHTMLAttributes} from 'react';
import "./style.scss"

const Input:FC<InputHTMLAttributes<HTMLInputElement>> = ({...props}) => {
  return <input {...props} className="input" type="text"  />
};

export default Input;
