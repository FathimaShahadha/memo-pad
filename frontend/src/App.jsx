import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';


const App = () => {
  return (
    <div className="relative h-full w-full">
    <div className="absolute inset-0 -z-10 h-full w-full bg-black
[background:radial-gradient(120%_120%_at_50%_100%,rgba(234,179,8,0.18)_0%,#09090b_50%,#000_100%)]">
</div>



      <Routes>
      <Route path ="/" element={<HomePage />} />
      <Route path ="/create" element={<CreatePage />} />
      <Route path ="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App