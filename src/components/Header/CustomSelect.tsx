import React, { useState } from 'react'
import ChevronDown from '../Icons/ChevronDown'
import ChevronUp from '../Icons/ChevronUp'

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  options: Array<{ id: string; name: string }>
  className?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  placeholder,
  options,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const selectedOption = options.find((option) => option.id === value)
  const displayValue = selectedOption ? selectedOption.name : placeholder

  const handleSelect = (optionId: string) => {
    onChange(optionId)
    setIsOpen(false)
    setSearchQuery('')
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (isOpen) {
      setSearchQuery('')
    }
  }

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const baseStyle =
    'px-4 py-2.5 bg-slate-800 border border-slate-500 rounded-lg text-white transition-all duration-300 text-sm min-w-40 relative cursor-pointer'
  const focusStyle = isFocused ? 'border-amber-400 ring-2 ring-amber-400/20' : ''

  return (
    <div className={`${baseStyle} ${focusStyle} ${className}`}>
      <div
        className='flex items-center justify-between w-full'
        onClick={handleToggle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
      >
        <span className={selectedOption ? 'text-white' : 'text-slate-400'}>{displayValue}</span>
        <div className='ml-2 transition-transform duration-300'>
          {isOpen ? (
            <ChevronUp className='w-4 h-4 text-white' />
          ) : (
            <ChevronDown className='w-4 h-4 text-white' />
          )}
        </div>
      </div>

      {isOpen && (
        <div className='absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-500 rounded-lg shadow-lg z-50'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder='Поиск...'
            className='w-full px-4 py-2 bg-slate-700 border-b border-slate-500 text-white placeholder-slate-400 focus:outline-none focus:bg-slate-600 rounded-t-lg'
          />
          <div
            className='max-h-48 overflow-y-auto'
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#475569 #334155',
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                width: 8px;
              }
              div::-webkit-scrollbar-track {
                background: #334155;
                border-radius: 4px;
              }
              div::-webkit-scrollbar-thumb {
                background: #475569;
                border-radius: 4px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: #64748b;
              }
            `}</style>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className='px-4 py-2 hover:bg-slate-700 cursor-pointer text-white transition-colors duration-200'
                  onClick={() => handleSelect(option.id)}
                >
                  {option.name}
                </div>
              ))
            ) : (
              <div className='px-4 py-2 text-slate-400 text-center'>Ничего не найдено</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomSelect
