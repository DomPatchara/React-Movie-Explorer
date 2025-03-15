import React, { useContext } from 'react'
import Spinner from './Spinner'
import MovieCard from './MovieCard'
import NumPages from './NumPages'
import { ImCross } from "react-icons/im";
import { MovieContext } from '../context/MovieContext'

const AllMoives = ({errorMessage, isLoading}) => {


    const { active, genreName, setGenreName, movieList } = useContext(MovieContext);

  return (
    <div className='all-movies scroll-mt-10'>
    
        <div className='flex flex-row items-center gap-9'>
            <h2>{ active === 'movie' ? 'All Movies' : 'TV Shows'}</h2>
        { genreName &&
            <div className='px-6 py-2 bg-blue-800/50 backdrop-blur-3xl rounded-4xl relative'>
                <p className='text-white'>{genreName}</p>
                <p 
                    onClick={()=>setGenreName('')}
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
                />
            ))}
            </ul>
        )}

        <NumPages/>

    </div>
  )
}

export default AllMoives