import React, { useContext, useEffect } from 'react'
import { MovieContext } from '../context/MovieContext';
import { useState } from 'react';
import apiClient from '../API';

const TrendingMovie = () => {

      const { active } = useContext(MovieContext);
      const [trendingMovies, setTrendingMovies] = useState([]);


     // ------ Fetch Trending Movie/TV ( New Way ) ---- //
     const fetchTrending = async () => {

      const endpoint = `/discover/${active}?sort_by=popularity.desc`

      try {
        const response = await apiClient.get(endpoint);
        const { data } = response;
        console.log("Response:", data) 
        
        if(!data.results || data.results.length === 0) {
          throw new Error("No trending movie found!")
        }

        const Top10 = data.results.slice(0, 10)
        setTrendingMovies(Top10) // select only 10 Arrays.

      } catch (error) {
        console.log(`Error fetching movies: ${error}`);
      }
    }

    useEffect(()=>{
      fetchTrending();
    },[active])

  return (
    <div>
        {trendingMovies.length > 0 && (
                <section className='trending scroll-mt-30' id='trending'>
                  
                  <h2 className='flex mb-5 gap-5'>
                    {active === 'movie' ? 'Trending Movies' : 'Trending TV Shows'}
                  </h2>

                  <ul>
                    {trendingMovies.map((movie, i) => (
                      <li key={movie.id}>
                        <p>{i + 1}</p>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                      </li>
                    ))}
                  </ul>

                </section>
              )}
    </div>
  )
}

export default TrendingMovie