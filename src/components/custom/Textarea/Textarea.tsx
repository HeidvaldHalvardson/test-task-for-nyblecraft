import React, {FC, TextareaHTMLAttributes} from 'react';
import "./style.scss"

const Textarea:FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({...props}) => {
  return <textarea className="textarea" {...props} />
};

export default Textarea;
