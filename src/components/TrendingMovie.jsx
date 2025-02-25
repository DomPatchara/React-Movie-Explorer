import React from 'react'

const TrendingMovie = ({trendingMovies, active}) => {
  return (
    <div>
        {trendingMovies.length > 0 && (
                <section className='trending scroll-mt-30' id='trending'>
                  
                  <h2 className='mb-5'>
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