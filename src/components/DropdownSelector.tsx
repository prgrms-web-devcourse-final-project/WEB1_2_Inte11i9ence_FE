import { useState, useEffect, useRef } from 'react'
import ToggleIcon from '@assets/svg/Toggle.svg?react'

interface DropdownSelectorProps {
  options: { value: string; label: string }[]
  defaultValue: string
  onChange: (selected: string) => void
}

const DropdownSelector = ({
  options,
  defaultValue,
  onChange,
}: DropdownSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selected, setSelected] = useState(defaultValue)

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  const handleSelection = (value: string) => {
    setSelected(value)
    onChange(value)
    setIsExpanded(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className='flex bg-white flex-col items-end'
      ref={dropdownRef}
    >
      <div
        className={`border w-auto rounded-lg text-sm font-bold shadow-md text-black flex flex-col items-stretch transition-all ${
          isExpanded ? 'p-2 gap-2' : 'p-2'
        }`}
      >
        <button
          className='flex items-center gap-1 justify-center'
          onClick={toggleExpand}
          aria-expanded={isExpanded}
        >
          <ToggleIcon
            width={10}
            height={10}
            className={`transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
          />
          <p className='flex justify-center items-center'>
            {options.find((opt) => opt.value === selected)?.label}
          </p>
        </button>

        {isExpanded && (
          <div className='flex flex-col'>
            {options
              .filter((opt) => opt.value !== selected)
              .map((opt) => (
                <button
                  key={opt.value}
                  className='flex justify-center bg-white items-center p-2 hover:bg-gray-100'
                  onClick={() => handleSelection(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DropdownSelector
