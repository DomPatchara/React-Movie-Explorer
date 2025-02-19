import React from 'react'

const NavPages = ({numPage, setNumPage}) => {
  return (
    <div className='w-full h-full flex justify-center items-center gap-5'>
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

export default NavPages