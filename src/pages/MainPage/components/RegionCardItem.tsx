import { Link } from 'react-router-dom'
import { regionData } from '@/temporaryData/regionData'
import NextArrowIcon from '@/assets/svg/nextArrow.svg?react'
import PrevArrowIcon from '@/assets/svg/prevArrow.svg?react'
import { useState, useEffect } from 'react'
import { AllPostData } from '@/typings/post'
import axios from 'axios'
import { regionImages } from '@/temporaryData/regionImages'

const RegionCardItem = () => {
  // 현재 보여지는 지역 카드 인덱스 상태
  const [startIndex, setStartIndex] = useState(0)
  const [regionCategory, setRegionCategory] = useState<AllPostData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // 지역 카드 표시 위한 카테고리 조회
  useEffect(() => {
    let mounted = true;
    
    const getCategory = async () => {
      if (!mounted) {return};
      setIsLoading(true)
      setError(null)
      try {
        // 목 서버, 실제 서버로 수정 필요
        const response = await axios.get(
          'https://www.skypedia.shop/api/v1/posts'
          // 연결 확인한 목서버 주소, 요청 제한으로 인해 주석 처리
          // 'https://189bbcf2-b5c2-4dc4-8590-f889d9ed6579.mock.pstmn.io/api/v1/category'
        )
        
        if(!response.data) {
          throw new Error('데이터 형식이 올바르지 않습니다.');
        }
        if (mounted) {
          setRegionCategory(response.data)
        }

      } catch (error) {
        if (mounted) {
        console.error('카테고리 조회 실패:', error)
        setError('카테고리 조회 실패')
        }
      } finally {
        if (mounted) {
        setIsLoading(false)
        }
      }
    }
    getCategory();
  }, [])

  const itemsPerPage = 4

  // 지역 카드 - 다음 페이지 핸들러
  const nextBtnHandler = () => {
    if (startIndex + itemsPerPage < regionData.length) {
      setStartIndex(startIndex + itemsPerPage)
    } else {
      setStartIndex(0)
    }
  }

  // 지역 카드 - 이전 페이지 핸들러
  const prevBtnHandler = () => {
    if (startIndex === 0) {
      // 첫 페이지에서 이전 버튼 클릭 시 마지막 페이지로 이동
      const lastPageStart =
        Math.floor((regionData.length - 1) / itemsPerPage) * itemsPerPage
      setStartIndex(lastPageStart)
    } else {
      // 이전 페이지로 이동
      setStartIndex(startIndex - itemsPerPage)
    }
  }

  // 현재 보여줄 데이터 조절
  // const currentItems = regionData.slice(startIndex, startIndex + itemsPerPage)
  const currentItemsInAPI = regionCategory.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className='flex flex-row justify-center items-center my-8 w-full'>
      <PrevArrowIcon
        onClick={prevBtnHandler}
        className='w-6 h-6 mr-10'
      />
      <div className='flex flex-row space-x-10'>
        {currentItemsInAPI.map((region) => (
          <Link
            key={region.id}
            to={`/postlist/region/${encodeURIComponent(region.name)}`}
            style={{ backgroundImage: `url(${regionImages[region.name as keyof typeof regionImages]})` }}
            className='font-bold text-xl w-44 h-56 text-white rounded-xl flex items-end justify-center py-4 bg-cover bg-center bg-no-repeat relative'
          >
            {/* 배경 이미지 위에 어두운 레이어 추가 */}
            <div className='absolute top-0 left-0 w-full h-full bg-[#000000] bg-opacity-40 rounded-xl'></div>
            <span className='relative z-10'>{region.name}</span>
          </Link>
        ))}
      </div>
      <NextArrowIcon
        onClick={nextBtnHandler}
        className='w-6 h-6 ml-10'
      />
    </div>
  )
}

export default RegionCardItem
