import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard';

const Watchlist = () => {

    const { favoriteMovies } = useContext(MovieContext);
  return (
    <div className='pattern'>
        <div className='wrapper grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 gap-y-4'>
            { favoriteMovies.map((movie, index)=>(
                <MovieCard key={index} movie={movie}/>                
            ))}
        </div>
    </div>
  )
}

export default Watchlist