import LocationIcon from '@assets/svg/Location.svg?react'
import { mockMypage } from './mockdata'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface MypagePlacesProps {
  onRegionSelect: (regionId: number) => void
}

const MypagePlaces = ({ onRegionSelect }: MypagePlacesProps) => {
  const buttonLabels = mockMypage[0].buttonLabels

  const [selectedRegion, setSelectedRegion] = useState<number>(1)

  const handleButtonClick = (regionId: number) => {
    setSelectedRegion(regionId)
    onRegionSelect(regionId)
  }

  return (
    <div className='relative flex flex-col flex-[4] gap-16 justify-center items-center'>
      <div className='w-[130px] h-[130px] bg-white absolute top-[27px] z-50'>
        <LocationIcon
          width={130}
          height={130}
        />
      </div>
      <div className='font-bold text-lg z-10'>
        <span className='text-lightBlue'>수지</span>님은{' '}
        <span className='text-lightBlue'>{buttonLabels.length}</span>개의 지역을
        여행했어요!
      </div>
      <div className='h-[40vh] w-full bg-white shadow-lg rounded-lg border border-lightGray z-10 p-4 font-bold'>
        <div className='flex justify-center mt-[50px]'>
          <div className='flex flex-wrap gap-5 w-full mx-4 justify-center'>
            {buttonLabels.map((label, index) => {
              const regionId = index + 1
              const isSelected = regionId === selectedRegion

              return (
                <button
                  key={index}
                  onClick={() => handleButtonClick(regionId)}
                  className={`border p-[1vw] py-1 w-auto rounded-lg text-sm shadow-md ${isSelected ? ' bg-[#ecf4f9] text-black' : 'bg-white'}`}
                  disabled={isSelected}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      {/* 내 여행이 아니라 다른 유저 여행 페이지일 때만 해당 문구 보여야 함! */}
      <Link
        to={'/mypage/gather'}
        className='text-xs underline'
      >
        수지님이 게시판에 작성한 글도 볼래요!{' '}
      </Link>
    </div>
  )
}

export default MypagePlaces
