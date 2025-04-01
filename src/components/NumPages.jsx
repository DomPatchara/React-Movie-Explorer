import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'

const NumPages = () => {

  const {numPage, setNumPage, totalPages} = useContext(MovieContext);
  // Add < 1 2 3 4 ... 7 8 9 10 > 
  return (
    <div className='w-full h-full flex justify-center items-center gap-5 py-10'>
        <p className='text-gray-200 absolute left-[25%]'> Page {numPage} of {totalPages}</p>
        
        { numPage !== 1 && 
         <button 
            onClick={() => setNumPage(numPage - 1)} 
            className='text-sm text-gray-200 py-3 px-2 bg-dark-100 shadow-inner shadow-light-100/10 rounded-full cursor-pointer hover:scale-[1.1]'
         > 
             Prev
        </button>
        }
        <button 
            onClick={() => setNumPage(numPage + 1)} 
            className='text-sm text-gray-200 py-3 px-2 bg-dark-100 shadow-inner shadow-light-100/10 rounded-full cursor-pointer hover:scale-[1.1]' > 
            Next
        </button>
    </div>
  )
}

export default NumPages