import React from 'react'

const Modal: React.FC<ModalProps> = ({ movie, onClose, isModalOpen }) => {
  return (
    <div
      className={`${
        isModalOpen ? 'flex' : 'hidden'
      } fixed z-[100] left-0 top-0 w-full h-full overflow-auto justify-center items-center`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div
        className='modal-content max-w-[900px] max-h-[90vh] overflow-y-auto mx-auto p-8 text-base shadow-2xl text-white flex flex-col rounded-2xl border border-slate-600'
        style={{ backgroundColor: '#1a191f' }}
      >
        <img
          className='w-full max-w-[350px] h-[500px] object-cover mx-auto rounded-xl shadow-lg mb-6'
          src={movie.posterUrl}
          alt={movie.nameRu}
        />
        <h2 className='text-3xl font-bold mb-4 text-center bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent'>
          {movie.nameRu}
          <span className='text-white text-2xl'> - {movie.year}</span>
        </h2>
        <ul className='space-y-3 list-none p-0 text-lg'>
          <li className='flex items-start gap-2'>
            <span className='text-green-400 font-semibold min-w-[80px]'>🎬 Жанр:</span>
            <span className='text-gray-300'>{movie.genres.map((el) => el.genre).join(', ')}</span>
          </li>
          {movie.filmLength && (
            <li className='flex items-start gap-2'>
              <span className='text-blue-400 font-semibold min-w-[80px]'>⏱️ Время:</span>
              <span className='text-gray-300'>{movie.filmLength} минут</span>
            </li>
          )}
          {movie.webUrl && (
            <li className='flex items-start gap-2'>
              <span className='text-purple-400 font-semibold min-w-[80px]'>🌐 Сайт:</span>
              <a
                className='text-cyan-400 no-underline hover:text-cyan-300 transition-colors'
                href={movie.webUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                {movie.webUrl}
              </a>
            </li>
          )}
          <li className='flex flex-col gap-2'>
            <span className='text-amber-400 font-semibold'>📝 Описание:</span>
            <p className='text-gray-300 leading-relaxed pl-4 border-l-2 border-amber-400'>
              {movie.description}
            </p>
          </li>
        </ul>
        <div className='flex gap-4 mt-6 justify-center'>
          {movie.webUrl && (
            <a
              href={movie.webUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='py-3 px-6 border-none rounded-lg font-bold cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 no-underline'
            >
              Перейти на сайт
            </a>
          )}
          <button
            type='button'
            className='py-3 px-6 border-none rounded-lg font-bold cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400/50 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
