import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard';

const Watchlist = () => {

    const { favoriteMovies } = useContext(MovieContext);
  return (

    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 gap-y-4 mt-15'>
      { favoriteMovies.map((movie, index)=>(
          <MovieCard key={index} movie={movie}/>                
      ))}
    </div>
    
  )
}

export default Watchlist