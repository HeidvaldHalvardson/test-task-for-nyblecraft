import React, {useEffect, useState} from 'react';
import './App.scss';
import Form from "./components/Form/Form";
import List from "./components/List/List";
import axios from "axios";
import {IData} from "./interfaces";

function App() {
  const [data, setData] = useState<IData[]>([])
  const [filter, setFilter] = useState<IData[]>([])
  const [tagText, setTagText] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      if (localStorage.getItem('data') === null) {
        const response = await axios.get<IData[]>('./data.json')
        localStorage.setItem('data', JSON.stringify(response.data))
        const localData= localStorage.getItem('data')
        const localDataParse:IData[] = JSON.parse(`${localData}`)
        setData(localDataParse)
      } else {
        const localData= localStorage.getItem('data')
        const localDataParse:IData[] = JSON.parse(`${localData}`)
        setData(localDataParse)
      }
    } catch (err) {
      console.log("something error")
    }
  }

  useEffect(() => {
    const tags = document.querySelectorAll('.tag')

    const listener = (evt: Event) => {
      evt.preventDefault()
      const link = evt.target as HTMLElement
      setTagText(link.innerText)
      setFilter(data.filter(n => n.text.includes(link.innerText)))
    }

    if (tags.length !== 0) {
      Array.from(tags).forEach((item) => {
        item.addEventListener('click', (evt) => listener(evt))
        item.removeEventListener('click', (evt) => listener(evt))
      })
    }
  }, [data, filter])

  const createNote = (newPost: IData) => {
    const newData = [...data, newPost]
    localStorage.setItem('data', JSON.stringify(newData))
    const localData= localStorage.getItem('data')
    const localDataParse:IData[] = JSON.parse(`${localData}`)
    setData(localDataParse)
    if (filter.length !== 0 && newPost.text.includes(tagText)) {
      setFilter([...filter, newPost])
    }
  }

  const deleteNote = (note: IData) => {
    setFilter(filter.filter(n => n._id !== note._id))
    localStorage.setItem('data', JSON.stringify(data.filter(n => n._id !== note._id)))
    const localData= localStorage.getItem('data')
    const localDataParse:IData[] = JSON.parse(`${localData}`)
    setData(localDataParse)
  }

  const editNote = (note:IData) => {
    const objIndex = data.findIndex(obj => obj._id === note._id)
    data[objIndex]  = {
      ...note
    }
    localStorage.setItem('data', JSON.stringify(data))
    const localData= localStorage.getItem('data')
    const localDataParse:IData[] = JSON.parse(`${localData}`)
    setData(localDataParse)
    if (filter.length !== 0) {
      const filterButton = document.querySelector('.filter-button') as HTMLElement
      const filterValue = `${filterButton.textContent}`
      setFilter(data.filter(n => n.text.includes(filterValue)))
    }
  }

  const deleteFilter = () => {
    setFilter([])
  }


  return <div className="wrapper">
    <Form create={createNote} />
    {
      filter.length
      ? <List filter={tagText} list={filter} deleteNote={deleteNote} deleteFilter={deleteFilter} editNote={editNote}/>
      : <List list={data} deleteNote={deleteNote} editNote={editNote}/>
    }
  </div>
}

export default App;
