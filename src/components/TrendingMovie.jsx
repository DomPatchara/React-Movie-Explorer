import React, { useContext, useEffect } from 'react'
import { MovieContext } from '../context/MovieContext';
import { useState } from 'react';
import apiClient from '../API';
import { Link } from 'react-router-dom';

const TrendingMovie = () => {

      const { active, trendingMovies, setTrendingMovies } = useContext(MovieContext);


     // ------ Fetch Trending Movie/TV ( New Way ) ---- //
     const fetchTrending = async () => {

      const endpoint = `/discover/${active}?sort_by=popularity.desc`

      try {
        const response = await apiClient.get(endpoint);
        const { data } = response;
        console.log("Top 10:", data) 
        
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
                <section className='trending scroll-mt-30'>
                  
                  <h2 className='flex mb-5 gap-5'>
                    {active === 'movie' ? 'Trending Movies' : 'Trending TV Shows'}
                  </h2>

                  <ul>
                    {trendingMovies.map((movie, i) => (
                      <li key={movie.id}>
                        <Link  to={`/movie/${movie.id}`}>
                          <p>{i + 1}</p>
                          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                        </Link>                        
                      </li>
                    ))}
                  </ul>

                </section>
              )}
    </div>
  )
}

export default TrendingMovie