import { useState } from 'react'
import ToggleIcon from '@assets/svg/Toggle.svg?react'

interface DropdownSelectorProps {
  options: { value: string; label: string }[] // 드롭다운 항목
  defaultValue: string // 기본 선택 값
  onChange: (selected: string) => void // 선택 변경 시 호출
}

const DropdownSelector = ({
  options,
  defaultValue,
  onChange,
}: DropdownSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false) // 드롭다운 열림 상태
  const [selected, setSelected] = useState(defaultValue) // 선택된 값

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  const handleSelection = (value: string) => {
    setSelected(value)
    onChange(value)
    setIsExpanded(false)
  }

  return (
    <div className='flex flex-col items-end'>
      <div
        className={`border w-auto rounded-lg text-sm font-bold shadow-md text-black flex flex-col items-stretch transition-all ${
          isExpanded ? 'p-2 gap-2' : 'p-2'
        }`}
      >
        {/* 기본 버튼 */}
        <button
          className='flex items-center gap-1 justify-center'
          onClick={toggleExpand}
        >
          <ToggleIcon
            width={10}
            height={10}
            className={`transition-transform ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <p className='flex justify-center items-center'>
            {options.find((opt) => opt.value === selected)?.label}
          </p>
        </button>

        {/* 확장된 버튼들 */}
        {isExpanded && (
          <div className='flex flex-col'>
            {/* 선택되지 않은 옵션만 표시 */}
            {options
              .filter((opt) => opt.value !== selected)
              .map((opt) => (
                <button
                  key={opt.value}
                  className='flex justify-center items-center p-2 hover:bg-gray-100'
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
