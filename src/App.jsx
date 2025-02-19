import React from 'react'
import Search from './components/search'
import { useState, useEffect } from 'react'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import NavPages from './components/NavPages';


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const 
App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')


  // debounce prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  
  // ประมาณว่ารอให้ user พิมพ์จบก่อน หลัง 500ms ให้ API request 
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])


  // set page
  const [numPage, setNumPage] = useState(1)

  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${numPage}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${numPage}`;

      const res = await fetch(endpoint, API_OPTIONS);
      
      if(!res.ok) {    // .ok คือ HTTP response status is in the range of 200-299   ถ้าออกนอกช่วง ( eg. 404, 500 ) ---> res.ok = false ทันที
        throw new Error('Failed to fetch movies');  // "block" flow or furture execution โค้ดอื่นๆ + throw message error
      }

      const data = await res.json()
      console.log(data);
      
      if(!data.results || data.results.length === 0 ) {
        setErrorMessage( data.Error || 'Failed to fetch movies');
        setMovieList([])
        return;   // stop function ตรงนี้ ถ้า data.response "Failed" 
      }

      setMovieList(data.results || [])

    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, numPage);
  }, [debouncedSearchTerm, numPage])

  return (
    <main>
        <div className="pattern overflow-x-hidden">
          <div className="wrapper">
            
            <header>
              <img src="../public/hero.png" alt="Hero-banner" />
              <h1>Find <span className='text-gradient'> Movies </span> You'll enjoy Without the Hassle</h1>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </header>

            <section className='all-movies'>
              <h2 className='mt-[20px]'>All Movies</h2>

              { isLoading ? (
                <div className='w-full h-full flex justify-center items-center'>
                  <Spinner/>
                </div>
              ) : errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
              ) : (
                <ul>
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                  ))}
                </ul>
              )}

              <NavPages numPage={numPage} setNumPage={setNumPage}/>

            </section>
          </div>
        </div>
    </main>
  )
}

export default 
App