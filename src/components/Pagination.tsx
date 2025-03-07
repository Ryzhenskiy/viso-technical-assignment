import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  changePage: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  changePage,
}) => {
  return (
    <div className="flex justify-center items-center my-4 space-x-2">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {Array.from({ length: Math.min(7, totalPages) }, (_, i) => i + 1).map(
        (page) => (
          <button
            key={page}
            className={`px-3 py-1 border rounded ${
              page === currentPage ? 'bg-gray-300' : ''
            }`}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        )
      )}
      {totalPages > 10 && <span>...</span>}
      {totalPages > 10 && (
        <button
          className={`px-3 py-1 border rounded ${
            totalPages === currentPage ? 'bg-gray-300' : ''
          }`}
          onClick={() => changePage(totalPages)}
        >
          {totalPages}
        </button>
      )}
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
