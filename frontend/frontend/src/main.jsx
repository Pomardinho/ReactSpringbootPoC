import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import News from './components/webscrapping/News'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="news" replace/>}/>
      <Route path="news" element={<News/>}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
)
