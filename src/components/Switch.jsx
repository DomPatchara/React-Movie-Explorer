import React from 'react'

// Component ที่เปลี่ยน Movies <--> TV Shows
const Switch = ({active, setActive}) => {

  return (
    <div className='w-full max-w-50 mx-auto h-10 flex justify-center items-center border-2 border-blue-900 rounded-4xl -translate-y-[130%]'>
        <button
            className={`w-full h-full rounded-4xl flex items-center justify-center -mr-2 ${ active === 'movie' ? 'bg-blue-900' : ''} transition duration-500 cursor-pointer`}
            onClick={() => setActive('movie')} 
        >
          <p className='text-white hover:text-blue-200'>Movie</p>
        </button>

        <button
            className={`w-full h-full rounded-4xl flex items-center justify-center ${ active === 'tv' ? 'bg-blue-900' : ''} transition duration-500 cursor-pointer`}
            onClick={() => setActive('tv')}
        >
            <p className='text-white hover:text-blue-200'>TV Shows</p>
        </button>
    </div>
  )
}

export default Switch