import React from 'react'
import Search from './components/search'
import { useState, useEffect } from 'react'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import NumPages from './components/NumPages';
import Switch from './components/Switch';
import Navbar from './components/Navbar';


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

  const [active, setActive] = useState('movie') // Toggle movie <--> tv

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading Page // 



  // debounce prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]) // ประมาณว่ารอให้ user พิมพ์จบก่อน หลัง 500ms ให้ API request 

  const [trendingMovies,setTrendingMovies] = useState([]) // set TrendingMovie Top 10


  // ----- Set pages ---------//
  const [numPage, setNumPage] = useState(1)
  const [totalPages, setTotalPages] = useState()


  // ----- Fetch Data -------- //

  // ------ Fetch All Movies -------//
  const fetchMovies = async (query) => {

    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
      ? `${API_BASE_URL}/search/${active}?query=${encodeURIComponent(query)}&page=${numPage}`   
      :`${API_BASE_URL}/discover/${active}?sort_by=vote_count.desc&page=${numPage}`;


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
      setTotalPages(data.total_pages)

    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }
 // handle Select Genrces // 
 const [isGenres, setIsGenres] = useState(false);
 const [genreId, setGenreId] = useState(null);
 const [genreName, setGenreName] = useState([])

 const [showGenres, setShowGenres] = useState(false);


 const handleSelectGenres = (numGenreId, name) => {

    setGenreId(numGenreId); // set select Genre ID
    setGenreName(name)
    setNumPage(1); // reset to first page
    setIsGenres(true); // set ถ้าต้องการเลือกประเภทหนัง
    setShowGenres(false); // เลือกประเภทหนังแล้ว ให้ปิดเมนูทิ้ง
    setMovieList([]); // clear old fetch movie
}

  // ------ Fetch Movies By Genrces -- //
  const fetchByGenres = async (genreId) => {
      setErrorMessage('')

      setIsLoading(true)
    try {
      const endpoint = `${API_BASE_URL}/discover/${active}?sort_by=vote_count.desc&page=${numPage}&with_genres=${genreId}`;
      const res = await fetch(endpoint, API_OPTIONS);
      const data = await res.json();

      if (!res.ok) {
        throw new Error('Respone Error')
      }

      if (!data.results || data.results.length === 0) {
        setErrorMessage( data.Error || 'No Genre founded !')
        setMovieList([])
        return;
      }

      setMovieList(data.results)
      setTotalPages(data.total_pages)
      console.log(data)
      console.log(res)


    } catch(error) {
      console.log(`Error fetching movies: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

// -------- Fetch Trending -------- //
  const fetchTrending = async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = `${API_BASE_URL}/discover/${active}?sort_by=popularity.desc`

      const res = await fetch(endpoint, API_OPTIONS)
      const data = await res.json()
      
      if(!res.ok) {
        throw new Error("Failed to fetch trending")
      }

      if(!data.results || data.results.length === 0) {
        throw new Error("No trending movie found!")
      }

      setTrendingMovies(data.results.slice(0, 10)) // select only 10 Arrays.

    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.')

    } finally {
      setIsLoading(false)
    }
  }
  

  // add Movie & Tv gerne // 
  //https://api.themoviedb.org/3/genre/movie/list
  //https://api.themoviedb.org/3/genre/tv/list



  // -------- useEffect -------- //
  useEffect(() => {
    if (isGenres && genreId) {
      fetchByGenres(genreId);
    } else {
      fetchMovies(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, numPage, active, isGenres, genreId])

  

  useEffect(() => {
    fetchTrending();
    setSearchTerm('');
  } , [active])

  // useEffect(()=> {
  //   fetchByGenres();
  // },[])


  return (
    <main>

        <div className="pattern ">
          <div className="wrapper">
            
            <header>
              <Navbar
                API_BASE_URL={API_BASE_URL} 
                API_OPTIONS={API_OPTIONS}
                active={active}
                setActive={setActive}
                showGenres={showGenres}
                setShowGenres={setShowGenres}
                handleSelectGenres = {handleSelectGenres}
              />
              <img src="../public/hero.png" alt="Hero-banner" />
              <h1>Find <span className='text-gradient'> Movies & TV Shows </span> You'll enjoy Without the Hassle</h1>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </header>

            <Switch active={active} setActive={setActive}/>

            {trendingMovies.length > 0 && (
              <section className='trending'>
                
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

            <section className='all-movies'>
              <div className='flex flex-row items-center gap-9'>
                <h2>{ active === 'movie' ? 'All Movies' : 'TV Shows'}</h2>

                <p className='text-white px-5 py-2 bg-blue-800/50 backdrop-blur-3xl rounded-4xl'>{genreName}</p>
                
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
                    <MovieCard key={movie.id} movie={movie}/>
                  ))}
                </ul>
              )}

              <NumPages numPage={numPage} setNumPage={setNumPage} totalPages={totalPages}/>

            </section>
          </div>
        </div>
    </main>
  )
}

export default 
App