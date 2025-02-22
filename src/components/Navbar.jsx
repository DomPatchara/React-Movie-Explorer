import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

const Navbar = ({API_BASE_URL, API_OPTIONS, active, setActive,  setShowGenres, showGenres, handleSelectGenres}) => {

    const [genres, setGenres] = useState([]);

    const fetchgenre = async () => {
        try {
            const endpoint = `${API_BASE_URL}/genre/${active}/list`;
            const res = await fetch(endpoint, API_OPTIONS)
            const data = await res.json()
            console.log(data);
            console.log(res);

            if(!res.ok) {
                throw new Error("Failed to fetch genre")
              }
        
            if(!data.genres || data.genres.length === 0) {
                 throw new Error("No Genre found!")
            }
            setGenres(data.genres)

        } catch(error) {
            console.log(`Error fetching genre: ${error}`);
        } finally {
        
        }
    }

    useEffect(()=>{
        fetchgenre();
    },[active])

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScroll, setLastScroll] = useState(0)


    // useEffect when scroll //
    useEffect(() => {

        const handleScrollNav = () => {
            // Scroll down
            if (window.scrollY > lastScroll) {

                setShowNavbar(false);
                setShowGenres(false);
    
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

    

  return (
    
    <nav className={`w-full px-5 sm:px-[15%] py-2 fixed top-0 right-0 flex flex-row justify-between items-center backdrop-blur-md z-50 ${showNavbar ? 'opacity-100' : 'opacity-0'} duration-300` }>
    
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='cursor-pointer'>
            <img src='../public/logo.png' className='w-10'/>
        </div>
            
        <div className='flex flex-row gap-8 text-lg text-blue-100/50'>
            <button onClick={()=>setActive('movie')} className={`cursor-pointer hover:text-white ${active === 'movie' ? 'border-b-2 border-white/70 text-white': ''} transition-all duration-100`}>Movies</button>
            <button onClick={()=>setActive('tv')} className={`cursor-pointer hover:text-white ${active === 'tv' ? 'border-b-2 border-white/70 text-white': ''} transition-all duration-100`}>TV Shows</button>

            <div>
                <button 
                    className={`cursor-pointer hover:text-white ${showGenres ? 'border-b-2 border-white/70 text-white': ''}`}
                    onClick={() => setShowGenres(!showGenres)}
                >
                    Genres
                </button>
                <div
                    className={`absolute top-0 left-0 h-screen w-2/4 md:w-1/4 md:px-10 lg:px-20 px-8 py-4 bg-blue-900 ${showGenres ? 'translate-x-0': '-translate-x-[100%]'} transition-all duration-500 z-10 flex justify-center`}
                >
                    <ul className='flex flex-col gap-3 mt-1 overflow-auto hide-scrollbar'>
                        {genres.map((genre, i)=>(
                            <li 
                                key={i} 
                                className='text-base  text-blue-100/80 whitespace-nowrap cursor-pointer hover:text-white md:text-[18px]'
                                onClick={() => handleSelectGenres(genre.id, genre.name)}
                            >
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        <div>
            <p>Search Button</p>
        </div>
        
    </nav>
    

  )
}

export default Navbar