import { createContext } from "react";
import { useState, useRef } from "react";

export const MovieContext = createContext();

const MovieContextProvider = (props) => {

    const [active, setActive] = useState('movie') // Toggle movie <--> tv
    const [searchTerm, setSearchTerm] = useState('');


    // ---------------- Focus Input Search -------------------- //
    const searchRef = useRef()

    const focusInput = () => {
        if (searchRef.current) {
        searchRef.current.focus();
        }
    }
    // -------------------------------------------------------- //

    const value = {
        active,setActive,
        searchTerm,setSearchTerm,
        searchRef,focusInput
    }

    return (
        <MovieContext.Provider value={value}>
            {props.children}
        </MovieContext.Provider>
    )
}

export default MovieContextProvider;