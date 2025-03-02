import React, { useRef, useState, useEffect, useCallback } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import NumPages from './components/NumPages';
import Switch from './components/Switch';
import Navbar from './components/Navbar';
import TrendingMovie from './components/TrendingMovie';
import axios from 'axios';
import apiClient from './API';



const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

    const [active, setActive] = useState('movie') // Toggle movie <--> tv

    // ---------------- Focus Input Search -------------------- //
    const searchRef = useRef()

    const focusInput = () => {
      if (searchRef.current) {
        searchRef.current.focus();
      }
    }

    const [searchTerm, setSearchTerm] = useState('');

    //----------------------------------------------------- //

    const [errorMessage, setErrorMessage] = useState('');

    const [movieList, setMovieList] = useState([]);
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

    const [isLoading, setIsLoading] = useState(false); // Loading Page // 

    // debounce prevent making too many API requests
    // by waiting for the user to stop typing for 500ms
    
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]) // ประมาณว่ารอให้ user พิมพ์จบก่อนหลัง 500ms ให้ API request 

    const [trendingMovies,setTrendingMovies] = useState([]) // set TrendingMovie Top 10


     // ---- Set numpages ------//
    const [numPage, setNumPage] = useState(1)
    const [totalPages, setTotalPages] = useState()

     // handle Select Genrces // 
    const [isGenres, setIsGenres] = useState(false);
    const [genreId, setGenreId] = useState(null);
    const [genreName, setGenreName] = useState([]);
    const [showGenres, setShowGenres] = useState(false);

  
    const handleSelectGenres = useCallback((numGenreId, name) => {   // useCallback --> ลดการ re-create function โดยไม่จำเป็น
      // Scroll to top
      document.getElementById('all-movies')?.scrollIntoView({ behavior: 'smooth' });
    
      // Update State
      setGenreId(numGenreId);
      setGenreName(name);
      setNumPage(1);
      setIsGenres(true);
      setShowGenres(false);
      setMovieList([]);
    
    }, []);
    
    // Check ว่ามีการ re-create function ไหม
    useEffect(()=>{    
      console.log(handleSelectGenres);
    }, [handleSelectGenres])


    // ------------------------------------------------------------------Fetch Data ---------------------------------------------------------------------- //

    // ------ Fetch All Movies ( Old Way ) -------//
    const fetchMovies = async (query) => {

      setIsLoading(true);
      setErrorMessage('');

      try {
        const endpoint = query
        ? `${API_BASE_URL}/search/${active}?query=${encodeURIComponent(query)}&page=${numPage}`   
        :`${API_BASE_URL}/discover/${active}?sort_by=vote_count.desc&page=${numPage}`;

        const res = await fetch(endpoint, API_OPTIONS);
        const data = await res.json()
        console.log(data);
        
        if(!res.ok) {    // .ok คือ HTTP response status is in the range of 200-299   ถ้าออกนอกช่วง ( eg. 404, 500 ) ---> res.ok = false ทันที
          throw new Error('Failed to fetch movies');  // "block" flow or furture execution โค้ดอื่นๆ + throw message error
        }
        
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

    // ------ Fetch Movies By Genrces ( New Way ) -- //
    const fetchByGenres = async (genreId) => {
        setErrorMessage('')
        setIsLoading(true)

        const endpoint = `/discover/${active}?sort_by=vote_count.desc&page=${numPage}&with_genres=${genreId}`;
      try {
        
        const { data } = await apiClient.get(endpoint)  // await คือรอ Server Response ข้อมูลมา ถึงจะ flow code ต่อ
        console.log("Response:", data)       // Check Respone
       
        if (!data.results || data.results.length === 0) {
          setErrorMessage( data.Error || 'No Genre founded !')
          setMovieList([])
          return;
        }

        setMovieList(data.results)
        setTotalPages(data.total_pages)
        
      } catch(error) {
        console.log(`Error fetching movies: ${error}`);
      } finally {
        setIsLoading(false);
      }
    }

   // ------ Fetch Trending Movie/TV ( New Way ) ---- //
    const fetchTrending = async () => {
      setIsLoading(true)
      setErrorMessage('')

      const endpoint = `/discover/${active}?sort_by=popularity.desc`

      try {
        const response = await apiClient.get(endpoint);
        const { data } = response;
        console.log("Response:", data) 
        
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
    

    // ------------------------------------------------------------------------- useEffect -------------------------------------------------- //
    useEffect(() => {
      if (isGenres && genreId) {
        fetchByGenres(genreId);
      } else {
        fetchMovies(debouncedSearchTerm);
      }
    }, [debouncedSearchTerm, numPage, active, genreId])

    

    useEffect(() => {
      fetchTrending();
      setSearchTerm('');
    } , [active])

    useEffect(() => {
        console.log("Your Favorite Movies:", favoriteMovies);
    },[favoriteMovies])

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
                  focusInput={focusInput}
                />
                <img src="/hero.png" alt="Hero-banner" className='lg:mt-10'/>
                <h1>Explore <span className='text-gradient'> Movies & Shows </span> You'll enjoy Without the Fuss</h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchRef={searchRef}/>
              </header>

              <Switch active={active} setActive={setActive}/>

              <TrendingMovie trendingMovies={trendingMovies} active={active}/>

              <section className='all-movies scroll-mt-10' id='all-movies'>

                <div className='flex flex-row items-center gap-9'>
                  <h2>{ active === 'movie' ? 'All Movies' : 'TV Shows'}</h2>
                { genreId &&
                  <p className='text-white px-5 py-2 bg-blue-800/50 backdrop-blur-3xl rounded-4xl'>{genreName}</p>
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
                        favoriteMovies={favoriteMovies}/>
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

  export default App