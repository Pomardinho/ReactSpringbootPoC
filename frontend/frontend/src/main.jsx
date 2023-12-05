import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchWordForm from './components/wordreference/SearchWordForm'
import News from './components/webscrapping/News'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="wordreference" element={<SearchWordForm/>}></Route>
      <Route path="news" element={<News/>}></Route>
    </Routes>
  </BrowserRouter>
)