import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {IData} from "../../interfaces";
import './style.scss';
import Button from "../custom/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faClose} from "@fortawesome/free-solid-svg-icons";
import NoteText from './NoteText/NoteText';
import Input from "../custom/Input/Input";

interface NoteProps {
  note: IData
  deleteNote:(note:IData) => void
  editNote:(note:IData) => void
}

const Note:FC<NoteProps> = ({note, deleteNote, editNote}) => {
  const [editMode, setEditMode] = useState(false)
  const [changeNoteValue, setChangeNoteValue] = useState({title: '', text: '', _id: ''})

  const editHandler = () => {
    setEditMode(true)
    const newNote:IData = {
      ...note
    }
    setChangeNoteValue(newNote)
  }

  const changeNote = () => {
    let newNote:IData = {
      _id: '',
      title: '',
      text: ''
    }

    if (!changeNoteValue.title) {
      alert('Нельзя оставлять название заметки пустым')
      return
    } else if (!changeNoteValue.text) {
      alert('Нельзя оставлять текст заметки пустым')
      return
    } else {
      setEditMode(false)
      newNote = {
        ...changeNoteValue,
        _id: note._id
      }
    }
    setChangeNoteValue(newNote)
    editNote(changeNoteValue)
  }

  const noChangeNote = () => {
    setEditMode(false)
  }

  const onInputHandler = (evt:FormEvent<HTMLDivElement>) => {
    setChangeNoteValue({...changeNoteValue, text: `${evt.currentTarget.textContent}`})
  }

  return (
    <div className="note">
      <div className="note-inner">
        {
          editMode
          ? <Input value={changeNoteValue.title} onChange={(evt: ChangeEvent<HTMLInputElement>) => setChangeNoteValue({...changeNoteValue, title: evt.target.value})}/>
          : <h2 className="title">{note.title}</h2>
        }

        <div className="note-buttons">
          <Button onClick={() => deleteNote(note)} width="20px" height="20px" type="button"><FontAwesomeIcon icon={faClose} /></Button>
          <br />
          {
            editMode
            ? <Button onClick={editHandler} disabled width="20px" height="20px" type="button"><FontAwesomeIcon icon={faPencil}/></Button>
            : <Button onClick={editHandler} width="20px" height="20px" type="button"><FontAwesomeIcon icon={faPencil}/></Button>
          }
        </div>
      </div>
      {
        editMode
        ? <div  className="edit-wrapper">
            <NoteText
              isEdit={editMode}
              text={note.text}
              onInputHandler={onInputHandler}
            />
            <div>
              <Button onClick={changeNote} className="edit-button" width="80%" height="20px">Изменить заметку</Button>
              <Button onClick={noChangeNote} className="edit-button" width="80%" height="20px">Не изменять заметку</Button>
            </div>
          </div>
        : <NoteText isEdit={editMode} text={note.text} />
      }
    </div>
  );
};

export default Note;
