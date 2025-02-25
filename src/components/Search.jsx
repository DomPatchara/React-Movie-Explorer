import React from 'react'


const Search = ({ searchTerm, setSearchTerm, searchRef}) => {

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