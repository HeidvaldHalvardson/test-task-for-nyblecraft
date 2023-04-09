import React, {FC, FormEvent, HTMLAttributes} from 'react';
import './style.scss'

interface NoteTextProps extends HTMLAttributes<HTMLDivElement> {
  text?: string
  isEdit: boolean
  onInputHandler?: (evt:FormEvent<HTMLDivElement>) => void
}

const NoteText:FC<NoteTextProps> = ({text, isEdit, onInputHandler}) => {
  let editedText: string = ''

  text?.split(" ").forEach(item => {
    if (item[0] === '#' && item.length > 1) {
      editedText += `<a href="#" class="tag">${item.replace(/[\n\s,().]/g, '')}</a> `
    } else {
      editedText += `${item} `
    }
  })
  return (
    <>
      {
        isEdit
        ?  <div
            contentEditable={isEdit}
            dangerouslySetInnerHTML={{__html: editedText}}
            className="text-content-editable"
            onInput={
              onInputHandler
              ? (evt) => onInputHandler(evt)
              : undefined
            }
          />
          : <div
            contentEditable={isEdit}
            dangerouslySetInnerHTML={{__html: editedText}}
            className="text"
          />
      }
    </>
  )
};

export default NoteText;
