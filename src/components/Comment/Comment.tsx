import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencil} from "@fortawesome/free-solid-svg-icons";
import './style.scss'
import Button from "../custom/Button/Button";

interface CommentProps {
  title: string
  text: string
}

const Comment:FC<CommentProps> = ({title, text}) => {
  return (
    <div className="wrapper-comment">
      <div className='inner-comment'>
        <span>{title}</span>
        <div className="wrapper-button">
          <Button width='30px' height='30px' type="button"><FontAwesomeIcon icon={faPencil}/></Button>
          <Button width='30px' height='30px' type="button"><FontAwesomeIcon icon={faTrash}/></Button>
        </div>
      </div>
      <p className="comment-text">{text}</p>
    </div>
  );
};

export default Comment;
