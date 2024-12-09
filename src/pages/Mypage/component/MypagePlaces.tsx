import LocationIcon from '@assets/svg/Location.svg?react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface MypagePlacesProps {
  regions: { regionId: number; regionName: string }[] | null // 지역 목록
  onRegionSelect: (regionId: number) => void
}

const MypagePlaces = ({ regions, onRegionSelect }: MypagePlacesProps) => {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null)

  useEffect(() => {
    if (regions && regions.length > 0) {
      setSelectedRegion(regions[0].regionId) // 첫 번째 지역 선택
    }
  }, [regions])
  const handleButtonClick = (regionId: number) => {
    setSelectedRegion(regionId)
    onRegionSelect(regionId)
  }

  return (
    <div className='relative flex flex-col flex-[4] gap-16 justify-center items-center'>
      <div className='w-[130px] h-[130px] bg-white absolute top-[55px] z-20'>
        <LocationIcon
          width={130}
          height={130}
        />
      </div>
      <div className='font-bold text-lg z-10'>
        <span className='text-lightBlue  '>chaejeong</span>
        님은 <span className='text-lightBlue '>{regions?.length}</span>
        개의 지역을 여행했어요!
      </div>
      <div className='h-[30vh] w-full bg-white shadow-lg rounded-lg border border-lightGray z-10 p-4 font-bold flex'>
        <div className='flex justify-center items-center pt-8'>
          <div className='flex flex-wrap gap-7  w-full mx-4 justify-start '>
            {regions?.map(({ regionId, regionName }) => (
              <button
                key={regionId}
                onClick={() => handleButtonClick(regionId)}
                className={`border p-[1vw] py-1 w-auto rounded-lg text-sm shadow-md h-8 ${
                  selectedRegion === regionId
                    ? 'bg-[#ecf4f9] text-black'
                    : 'bg-white'
                }`}
              >
                {regionName}
              </button>
            ))}
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
