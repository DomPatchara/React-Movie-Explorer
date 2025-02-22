import React from 'react'

const NumPages = ({numPage, setNumPage, totalPages}) => {
  return (
    <div className='w-full h-full flex justify-center items-center gap-5'>
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