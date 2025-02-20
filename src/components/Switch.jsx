import React from 'react'
import { useState } from 'react'

const Switch = ({active, setActive}) => {

  return (
    <div className='w-full max-w-50 mx-auto h-10 mt-7 flex justify-center items-center border-2 border-blue-900 rounded-4xl cursor-pointer'>
        <div 
            className={`w-full h-full rounded-4xl flex items-center justify-center -mr-2 ${ active === 'movie' ? 'bg-blue-900' : ''} transition duration-500`}
            onClick={() => setActive('movie')} 
        >
          <p className='text-white hover:text-blue-200'>Movie</p>
        </div>

        <div 
            className={`w-full h-full rounded-4xl flex items-center justify-center ${ active === 'tv' ? 'bg-blue-900' : ''} transition duration-500`}
            onClick={() => setActive('tv')}
        >
            <p className='text-white hover:text-blue-200'>TV Shows</p>
        </div>
    </div>
  )
}

export default Switch