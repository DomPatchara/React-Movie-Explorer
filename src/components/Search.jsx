import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'


const Search = () => {

  const { searchTerm, setSearchTerm, searchRef } = useContext(MovieContext);

  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="search" />

            <input 
                ref={searchRef}
                type="text" 
                placeholder='Find your next favorite'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search