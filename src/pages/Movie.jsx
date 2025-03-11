import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../API';
import { MovieContext } from '../context/MovieContext';

const Movie = () => {

  const { active, movieList, trendingMovies } = useContext(MovieContext)
  const { movieId } = useParams();
  const [videos, setVideos] = useState([]);
  const [movieName, setMovieName] = useState('');

  useEffect(() => {
    // Ensure movieList is not empty
    if (movieList.length > 0) {
      const allmovie = [...movieList, ...trendingMovies]
      const movie = allmovie.find((movie) => movie.id === parseInt(movieId));

      if (movie) {
        if (active === 'movie') {
          setMovieName(movie.title);   // Name for Movie
        } else {
          setMovieName(movie.name);   // Name for TV Shows
        }
      } else {
        console.log('Movie not found');
      }
    }
  }, [movieId]);

  // ---- Fetch Movie Video --------//
  const fetchMovieVideo = async() => {

    const endpoint = 
      active === 'movie' 
      ? `/movie/${movieId}/videos`
      : `/tv/${movieId}/videos`
    
    try {
      const { data } = await apiClient.get(endpoint)
      console.log("video:", data)
      setVideos(data.results.slice(0,4));  // select only 4 videos
    } catch (err) {
      console.error("Error fetch Video:", err)
    }
  }

  useEffect(() => {
    fetchMovieVideo();
    console.log('movieId:', movieId)
  },[movieId])

  return (

    <div>
      <div className='mt-10 mb-5'>
        <h1>{movieName} : <span className='text-gradient'>Trailers</span></h1>
      </div>
  
      <div className='w-full flex flex-row overflow-x-scroll hide-scrollbar items-center space-x-4 '>
        { videos.length > 0 && (
            videos.map((video, index)=>(
              <div key={index}>
                <iframe
                  className="w-100 h-64 sm:w-128 md:w-160 md:h-120 lg:w-256 lg:h-128 rounded-3xl"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  allowFullScreen
                >
                </iframe>
              </div>
            )
          ))
        }
      </div>
      
    </div>
      
  )
}

export default Movie