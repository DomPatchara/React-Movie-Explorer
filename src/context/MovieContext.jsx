import { createContext, useEffect } from "react";
import { useState, useRef } from "react";
import { useCallback } from "react";

export const MovieContext = createContext();

const MovieContextProvider = (props) => {

    const [active, setActive] = useState('movie') // Toggle movie <--> tv
    const [searchTerm, setSearchTerm] = useState('');
    const [favoriteMovies, setFavoriteMovies] = useState([]);


    // ---------------- Focus Input Search -------------------- //
    const searchRef = useRef()

    const focusInput = () => {
        if (searchRef.current) {
        searchRef.current.focus();
        }
    }

    // -------------- Set Favorite Movies ---------------------//
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
    })
    }

    useEffect(()=>{
        console.log("Your Favoite Movies:", favoriteMovies)
    },[favoriteMovies])

    // -----------------------------------------------------------------//

     // ---- Set numpages 
    const [numPage, setNumPage] = useState(1)
    const [totalPages, setTotalPages] = useState()

    // handle Select Genrces // 
    const [genreId, setGenreId] = useState(null);
    const [genreName, setGenreName] = useState('');
    
    const handleSelectGenres = useCallback((Id, name) => {
        setGenreId(Id);
        setGenreName(name);
        setNumPage(1);

        setTimeout(() => {
        window.scrollBy({
            top: 1150, // Scroll down 1150px
            behavior: "smooth",
        });
        }, 700);

    },[])

    // Check ว่ามีการ re-create function ไหมจากการใช้ useCallback
    useEffect(()=>{    
        console.log(handleSelectGenres);
    }, [handleSelectGenres])

    const value = {
        active,setActive,
        searchTerm,setSearchTerm,
        searchRef,focusInput,
        handleAddFavorite,favoriteMovies,
        numPage,setNumPage,
        totalPages,setTotalPages,
        genreId,genreName,setGenreName,
        handleSelectGenres
    }

    return (
        <MovieContext.Provider value={value}>
            {props.children}
        </MovieContext.Provider>
    )
}

export default MovieContextProvider;