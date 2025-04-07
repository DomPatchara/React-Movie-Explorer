import React, { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";

const NumPages = () => {
  const { numPage, setNumPage, totalPages } = useContext(MovieContext);

  // Add < 1 2 3 4 ... 7 8 9 10 >
  return (
    <div className="w-full h-full flex justify-center items-center gap-4 py-5">
      {numPage !== 1 && (
        <button
          onClick={() => setNumPage(numPage - 1)}
          className="text-sm text-gray-200 py-3 px-2 bg-dark-100 shadow-inner shadow-light-100/10 rounded-full cursor-pointer hover:scale-[1.1]"
        >
          Prev &lt;
        </button>
      )}

      {/** Create Array [1, 2, 3, 4, ..., totalPages ] */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
         page === 1 || page >= (numPage - 1) && page <= (numPage + 1) ? (
          <button
            key={page}
            onClick={() => setNumPage(page)}
            className={`px-3 py-1 rounded ${
              page === numPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ) : page === numPage + 2  ? (
          <div key={page} className="hidden md:flex px-2 text-white text-2xl gap-1">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        ) : null
      )}

      <button
        onClick={() => setNumPage(numPage + 1)}
        className="text-sm text-gray-200 py-3 px-2 bg-dark-100 shadow-inner shadow-light-100/10 rounded-full cursor-pointer hover:scale-[1.1]"
      >
        Next &gt;
      </button>
    </div>
  );
};

export default NumPages;
