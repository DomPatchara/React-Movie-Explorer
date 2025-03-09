import { Routes, Route } from "react-router-dom";
import React from 'react'
import Home from './pages/Home'
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/watch-list" element={<Watchlist/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App