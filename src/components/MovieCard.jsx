import React, { useContext, useState } from 'react'
import { MovieContext } from '../context/MovieContext'
import { Link, useLocation } from 'react-router-dom';
import { ImCross } from "react-icons/im";


const MovieCard = ({movie}) => {

        const {name, title, vote_average, poster_path, release_date, original_language} = movie   // ไม่ต้องใช้ movie.title , movie.release_date
        const { handleAddFavorite, active} = useContext(MovieContext);
        
        const [marklist, setMarklist] = useState(false)

        const handleWatchlist = (movie) => {
            setMarklist(prev => !prev);
            handleAddFavorite(movie)
        }

        const location = useLocation();

        

  return (

     
    <div className='movie-card hover:-translate-y-2.5 duration-200 relative group'>
        <Link to={`/movie/${movie.id}`}>
            <img 
                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`: '/no-movie.png'} 
                alt={title}
            />
        </Link>

        <div className='absolute top-6 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"'>
            {location.pathname === '/watch-list' 
            ? ( 
                <div className='group/icon relative'>
                    <div 
                        onClick={()=>handleAddFavorite(movie)}
                        className='absolute p-1 rounded-full right-1.5 top-1 bg-transparent text-gray-600  hover:bg-red-500 cursor-pointer group/icon'>
                            <ImCross size={10}/>
                    </div>
                    <span className='absolute top-0 -translate-y-8 -translate-x-12 text-sm font-semibold bg-blue-700/30 group-hover/icon:opacity-100 opacity-0 px-2 py-1 text-red-500 rounded-2xl'>
                        Remove
                    </span>
                </div>
            ) : ( 
                <div className='group/icon relative'>
                    <img src={marklist ? '/watchlist-icon-marked.png': '/watchlist-icon.png'} alt="icon"  
                    className='w-12 cursor-pointer group-hover/icon:opacity-70' onClick={()=>handleWatchlist(movie)}/>
                     {/* Hover Text */}
                    <span className="absolute -top-5 -left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {marklist ? "Remove from Watchlist" : "Add to Watchlist"}
                    </span>
                </div> 
             )
            }
                                                                            
        </div>

        <div className='mt-4'>
            <h3>{active ==='movie' ? title : name}</h3>

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