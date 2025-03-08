import React, { useContext } from 'react'
import Spinner from './Spinner'
import MovieCard from './MovieCard'
import NumPages from './NumPages'
import { useState, useEffect } from 'react'
import { ImCross } from "react-icons/im";
import { MovieContext } from '../context/MovieContext'

const AllMoives = ({ movieList, genreName, setGenreName, errorMessage, numPage, setNumPage, totalPages, isLoading}) => {


    const { active } = useContext(MovieContext);

    // 1. Add Watchlist อาจจะใช้เป็น Post 
    // 2. add function removie gerneName use filter
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    
    const handleAddFavorite = (movie) =>{
        setFavoriteMovies(prev => {

        // 1. Check ว่าหนังโปรดเราอยู่ใน FavoriteMovies หรือยัง
        const CheckMoviesInList = prev.some(fav => fav.title === movie.title);

        // 2. Remove : ถ้ามีอยู่แล้วอยู่ ให้ตัดออก
        if (CheckMoviesInList) {
            return prev.filter(fav => fav.title !== movie.title)
        } else {
        // 3. Add : ถ้าไม่มี ให้แอดเพิ่ม
            return [...prev, movie];
        }
        }
        )
    }

    useEffect(() => {
        console.log("Your Favorite Movies:", favoriteMovies);
    },[favoriteMovies])

  return (
    <div className='all-movies scroll-mt-10' id='all-movies'>
    
        <div className='flex flex-row items-center gap-9'>
            <h2>{ active === 'movie' ? 'All Movies' : 'TV Shows'}</h2>
        { genreName &&
            <div className='px-6 py-2 bg-blue-800/50 backdrop-blur-3xl rounded-4xl relative'>
                <p className='text-white'>{genreName}</p>
                <p 
                    onClick={() =>setGenreName('')}
                    className='absolute  p-1 rounded-full right-1.5 top-1 bg-transparent text-gray-600  hover:bg-red-500 cursor-pointer'>
                        <ImCross size={8}/>
                </p>
            </div>
        } 
        </div>

        { isLoading ? (
            <div className='w-full h-full flex justify-center items-center'>
            <Spinner/>
            </div>
        ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
        ) : (
            <ul>
            {movieList.map((movie) => (
                <MovieCard 
                key={movie.id} 
                movie={movie} 
                handleAddFavorite={handleAddFavorite} 
                favoriteMovies={favoriteMovies}
                active={active}/>
            ))}
            </ul>
        )}

        <NumPages numPage={numPage} setNumPage={setNumPage} totalPages={totalPages}/>

    </div>
  )
}

export default AllMoives