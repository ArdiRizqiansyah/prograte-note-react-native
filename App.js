import React, { useState } from 'react'
import Home from './src/screens/home'
import AddNote from './src/screens/addNote'
import EditNote from './src/screens/editNote'

// Tambahkan function "addNote" sebagai prop
const CurrentPageWidget = ({
  currentPage,
  noteList,
  setCurrentPage,
  addNote,
  setCurrentNote,
  currentNote,
  editNote,
  deleteNote,
}) => {
  switch (currentPage) {
    case 'home':
      return <Home noteList={noteList} setCurrentPage={setCurrentPage} setCurrentNote={setCurrentNote} deleteNote={deleteNote} />
    case 'add':
      // Berikan function "addNote" ke component "AddNote"
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />
    case 'edit':
      return <EditNote setCurrentPage={setCurrentPage} editNote={editNote} note={currentNote} />
    default:
      return <Home />
  }
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentNote, setCurrentNote] = useState(null)

  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: 'Note pertama',
      desc:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    },
  ])

  const addNote = (title, desc) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;
    setNoteList([
      ...noteList,
      {
        id,
        title: title,
        desc: desc,
      },
    ]);
  };

  const editNote = (title, desc) => {
    setNoteList(noteList.map(note => note.id === currentNote.id ? { ...note, title, desc } : note));
    setCurrentPage('home');
  };

  const deleteNote = (id) => {
    setNoteList(noteList.filter(note => note.id !== id));
  };

  return (
    <CurrentPageWidget
      currentPage={currentPage}
      noteList={noteList}
      setCurrentPage={setCurrentPage}
      // Berikan function addNote sebagai prop
      addNote={addNote}
      currentNote={currentNote}
      setCurrentNote={setCurrentNote}
      editNote={editNote}
      deleteNote={deleteNote}
    />
  );
}

export default App
