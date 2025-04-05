import React, { useContext, useEffect} from 'react'
import { useState } from 'react'
import apiClient from '../API';
import { MovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom'
import { BsBookmarkPlusFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiMenuUnfold4Fill } from "react-icons/ri";


const Navbar = () => {


    const { active, setActive, focusInput, handleSelectGenres } = useContext(MovieContext);

    const [visibleMenus, setVisibleMenus] = useState(false)

    // ----------- Fetch All List Genres ----------------------//
    const [genres, setGenres] = useState([]);
    const [showAllGenres, setShowAllGenres] = useState(false);

    const fetchgenre = async () => {
        const endpoint = `/genre/${active}/list`
        try {
            const res = await apiClient.get(endpoint)
            const data = res.data
            console.log("Response",res);
            console.log("Genres:",data);
            
            if(!data.genres || data.genres.length === 0) {
                 throw new Error("No Genre found!")
            }
            setGenres(data.genres)

        } catch(error) {
            console.error("Error fetching genre:", error );
        } 
    }

    useEffect(()=>{
        fetchgenre();
    },[active])


    // ----------- Set Show/Close Navbar with Scrolling --------------//
    const [lastScroll, setLastScroll] = useState(0)
    const [showNavbar, setShowNavbar] = useState(true);

    // useEffect hidding Navbar when "scroll down" 
    useEffect(() => {

        const handleScrollNav = () => {

            // Scroll down
            if (window.scrollY > lastScroll) {

                setShowNavbar(false);
                setShowAllGenres(false);
                setVisibleMenus(false);
    
            // Scroll up
            } else {
                setShowNavbar(true)
            }
    
            setLastScroll(window.scrollY)
        }

        window.addEventListener('scroll', handleScrollNav);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScrollNav);
        };
    }, [lastScroll])

    const setCategory = (name) => {
        setActive(name);
        window.scrollBy({top: 720, behavior: 'smooth'});
    }

    

  return (
    <nav className={`w-full px-5 sm:px-[5%] md:px-[10%] py-2 fixed top-0 right-0 flex flex-row justify-between items-center backdrop-blur-md z-50 ${showNavbar ? 'opacity-100' : 'opacity-0'} duration-300` }>
        {/** Side menus for small screen */}
        <div className={`${visibleMenus ? 'w-70': 'w-0'} absolute top-0 left-0 h-screen bg-blue-800/80 inset-shadow-half transition-all overflow-hidden md:hidden`}>
            <ul className='space-y-4 text-2xl flex flex-col  text-gray-400 font-semibold p-5'>
                <RiMenuUnfold4Fill 
                    size={30}
                    onClick={() => setVisibleMenus(false)}
                    className='cursor-pointer hover:scale-110 transition-all duration-200'
                />
                <Link 
                    to='/'
                    className={`cursor-pointer hover:text-white ${active === 'movie' ? 'border-b-2 border-white/70 text-white': ''} transition-all duration-100`}
                    onClick={()=>setCategory('movie')}
                >
                    <p>Movies</p>
                </Link>
                <Link 
                    to='/'
                    className={`cursor-pointer hover:text-white ${active === 'tv' ? 'border-b-2 border-white/70 text-white': ''} transition-all duration-100`}
                    onClick={()=>setCategory('tv')}
                >
                    <p>TV Shows</p>
                </Link>
                <Link 
                    to='/'
                    className={`cursor-pointer hover:text-white ${showAllGenres ? 'border-b-2 border-white/70 text-white': ''}`}
                    onClick={() => setShowAllGenres(!showAllGenres)} 
                >
                    <p>Genres</p>
                </Link>
            </ul>
        </div>
        
        <div className='flex gap-5 items-center'>
            {/** Hamburger Menu */}
            <div 
                className='md:hidden text-white cursor-pointer'
                onClick={() => setVisibleMenus(true)}
            >
                <GiHamburgerMenu size={28} />
            </div>
            {/**--- Logo ------ */}
            <a href='/' className='cursor-pointer'>
                <img src='/logo.png' className='w-10 hover:scale-[1.1] duration-300'/>    
            </a>
        </div>
    
        {/**---- Nav links------ */}
        <div className='flex-row gap-8 text-lg text-blue-100/50 hidden md:flex'>
            <Link to='/'>
                <p onClick={()=>setCategory('movie')} className={`cursor-pointer hover:text-white ${active === 'movie' ? 'border-b-2 border-white/70 text-white': ''} transition-all duration-100`}>Movies</p>
            </Link>
            <Link to='/'>
                <p onClick={()=>setCategory('tv')} className={`cursor-pointer hover:text-white ${active === 'tv' ? 'border-b-2 border-white/70 text-white': ''} transition-all duration-100`}>TV Shows</p>
            </Link>
            <Link to='/'>
                <p onClick={() => setShowAllGenres(!showAllGenres)} className={`cursor-pointer hover:text-white ${showAllGenres ? 'border-b-2 border-white/70 text-white': ''}`} >Genres</p>
            </Link>
        </div>

        {/**--- Genre Side Menus ------ */}
        <div className={`absolute top-0 left-0 h-screen w-70 md:w-[35%] py-4 bg-blue-900 inset-shadow-half ${showAllGenres ? 'translate-x-0': '-translate-x-[100%]'} transition-all duration-500 z-10 flex justify-center`}>
            <ul className='flex flex-col gap-3 mt-1 overflow-auto hide-scrollbar '>
                {genres.map((genre, i)=>(
                    <li key={i}>
                        <a  
                            className='text-2xl  text-blue-100/80 whitespace-nowrap cursor-pointer hover:text-white md:text-2xl'
                            onClick={() => {handleSelectGenres(genre.id, genre.name);
                                            setShowAllGenres(false);
                            }}
                        >
                            {genre.name}
                            <hr  className='text-gray-900/70'/>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
        
        {/** ---------- Search Button --------- */}
        <div className='flex gap-1'>
            <Link to='/watch-list' className='flex  gap-1  justify-center items-center rounded-full p-2 hover:bg-blue-900/40 '>
                <BsBookmarkPlusFill className='text-blue-100/50' size={20}/>
                <p className='text-blue-100/50 text-lg'>Watchlist</p>
            </Link>
            <img 
                src="search.svg" 
                className='cursor-pointer rounded-full px-3 py-2 hover:bg-blue-900/40 duration-500' 
                onClick={focusInput}/>
        </div>
    </nav>
  )
}

export default Navbar