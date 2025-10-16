import React from 'react'

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = []
  const range = 3
  const startPage = Math.max(1, currentPage - range)
  const endPage = Math.min(totalPages, currentPage + range)

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className='w-full mb-2 px-2 -mt-4'>
      <div className='bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-slate-600 w-full'>
        <ul className='flex list-none p-0 gap-1 sm:gap-2 justify-center flex-wrap'>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => onPageChange(number)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer text-sm sm:text-base ${
                  currentPage === number
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:shadow-lg hover:shadow-slate-500/25'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Pagination
