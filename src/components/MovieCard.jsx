import React, { useEffect, useState } from 'react'

const MovieCard = ({ movie, handleAddFavorite, favoriteMovies}) => {

        const {title, vote_average, poster_path, release_date, original_language} = movie   // ไม่ต้องใช้ movie.title , movie.release_date
        
        const [marklist, setMarklist] = useState(false)

        const handleWatchlist = () => {
            setMarklist(prev => !prev);
            handleAddFavorite(movie)
        }

        

  return (
    <div className='movie-card hover:-translate-y-2.5 duration-200 relative group'>
        <img 
            src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`: '/no-movie.png'} 
            alt={title}
        />

        <div className='absolute top-6 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"'>
            <img src={marklist ? '/watchlist-icon-marked.png': '/watchlist-icon.png'} alt="icon"  
            className='w-12 cursor-pointer hover:opacity-70' onClick={handleWatchlist}/>
        </div>

        <div className='mt-4'>
            <h3>{title}</h3>

            <div className='content'>

                <div className='rating'>
                    <img src="star.svg" alt="Star-Icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p> 
                </div>

                <span>•</span>
                <p className='lang'>{original_language}</p>
                <span>•</span>
                <p className='year'>
                    {release_date ? release_date.split('-')[0] : 'N/A'}
                </p>
            </div>

        </div>

    </div>
  )
}

export default MovieCard