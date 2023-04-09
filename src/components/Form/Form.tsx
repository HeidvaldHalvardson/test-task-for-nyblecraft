import React, {FC, FormEvent, ChangeEvent, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import Input from "../custom/Input/Input";
import "./style.scss"
import Textarea from "../custom/Textarea/Textarea";
import Button from "../custom/Button/Button";
import {IData} from "../../interfaces";

interface FormProps {
  create: (newPost: IData) => void
}

const Form:FC<FormProps> = ({create}) => {

  const [note, setNote] = useState({title: '', text: '', _id: ''})

  const addNewNote = (evt: FormEvent<HTMLFormElement>):void => {
    evt.preventDefault()

    let newNote:IData = {
      _id: '',
      title: '',
      text: ''
    }

    if (!note.title) {
      alert('Вы не дали название заметки')
      return
    } else if (!note.text) {
      alert('Вы не заполнили текст заметки')
      return
    } else {
      newNote = {
        ...note,
        _id: `${Date.now()}`
      }
    }

    create(newNote)
    setNote({title: '', text: '' , _id: ''})
  }

  return (
    <form className="form" onSubmit={addNewNote}>
      <Input  placeholder="Введите название заметки..." value={note.title} onChange={(evt: ChangeEvent<HTMLInputElement>) => setNote({...note, title: evt.target.value})}/>
      <Textarea placeholder="Введите текст заметки..." value={note.text} onChange={(evt:ChangeEvent<HTMLTextAreaElement>) => setNote({...note, text: evt.target.value})}/>
      <Button width='200px' height='30px' type="submit">Создать заметку <FontAwesomeIcon icon={faPaperPlane}/></Button>
    </form>
  );
};

export default Form;
