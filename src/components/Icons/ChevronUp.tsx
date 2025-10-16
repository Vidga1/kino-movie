import React from 'react'

interface ChevronUpProps {
  className?: string
}

const ChevronUp: React.FC<ChevronUpProps> = ({ className = 'w-4 h-4' }) => {
  return (
    <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
    </svg>
  )
}

export default ChevronUp
