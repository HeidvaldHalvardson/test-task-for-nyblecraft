import React, {FC} from 'react';
import {IData} from "../../interfaces";
import Note from "../Note/Note";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import "./style.scss"

interface ListProps {
  list: IData[]
  filter?: string
  deleteNote:(note:IData) => void
  editNote:(note:IData) => void
  deleteFilter?:() => void
}

const List:FC<ListProps> = ({list, filter, deleteFilter, ...props}) => {
  return (
    <>
      {
        filter
        ? <button onClick={deleteFilter} className="filter-button">{filter} <FontAwesomeIcon icon={faClose} /></button>
        : null
      }
      {list.length !== 0
      ? list.map(item =>
        <Note key={item._id} note={item} {...props}/>
      )
      : <div className="note">Пока заметок нет...</div>}
    </>
  );
};

export default List;
