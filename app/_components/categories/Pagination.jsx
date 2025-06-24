'use client';
import React, { useState } from 'react';

function CatPagination({ total, getCategoryHandle,pageNum }) {
  const [currentPage, setCurrentPage] = useState(pageNum);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getCategoryHandle(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < total) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-end mt-2 text-[15px] ">
      <div>
      {/* <div>{pageNum}</div> */}
      {/* Previous */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 mx-1 py-1 border-gray-100 border rounded ${
          currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white cursor-pointer'
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 border-gray-100 border rounded cursor-pointer ${
            page === currentPage ? 'bg-gray-600 text-white' : 'bg-white'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={currentPage === total}
        className={`px-3 mx-1 py-1 border-gray-100 border rounded  ${
          currentPage === total ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white cursor-pointer'
        }`}
      >
        Next
      </button>
    </div>
    </div>
  );
}

export default CatPagination;
