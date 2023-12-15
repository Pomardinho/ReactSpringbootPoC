import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BBC from './components/webscrapping/BBC'
import Home from './components/Home'
import Bild from './components/webscrapping/Bild'
//import CollinsAPI from './components/collins/Collins'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Navigate to="/" replace/>}/>
      <Route path="/" element={<Navigate to="home" replace/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="bbc" element={<BBC/>}/>
      <Route path="bild" element={<Bild/>}/>
      {/* <Route path="collins" element={<CollinsAPI/>}/> */}
    </Routes>
  </BrowserRouter>
)
