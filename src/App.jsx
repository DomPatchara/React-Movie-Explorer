import { Routes, Route } from "react-router-dom";
import React from 'react'
import Home from './pages/Home'
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Movie from "./pages/Movie";


const App = () => {
  return (
    <div className="pattern">
      <div className="container">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/watch-list" element={<Watchlist/>}/>
          <Route path="/movie/:movieId" element={<Movie/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App