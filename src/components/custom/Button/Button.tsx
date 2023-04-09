import React, {ButtonHTMLAttributes, FC} from 'react';
import './style.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width: string;
  height: string;
}

const Button:FC<ButtonProps> = ({width, height, ...props}) => {
  return <button className="style.button" {...props} style={{width: `${width}`, height: `${height}`}} />
};

export default Button;
