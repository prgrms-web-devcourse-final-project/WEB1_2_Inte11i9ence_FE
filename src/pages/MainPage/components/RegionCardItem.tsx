import { Link } from 'react-router-dom'
// import { regionData } from '@/temporaryData/regionData'
import NextArrowIcon from '@/assets/svg/nextArrow.svg?react'
import PrevArrowIcon from '@/assets/svg/prevArrow.svg?react'
import { useState, useEffect } from 'react'
import { AllPostData } from '@/typings/post'
import axios from 'axios'
import { regionImages } from '@/temporaryData/regionImages'
// import { categoryData } from '@/temporaryData/categoryData'

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
        const token = localStorage.getItem('access_token')
        if (!token) {
          throw new Error('토큰이 없습니다.');
        }
        
        const response = await axios.get(
          'https://www.skypedia.shop/api/v1/post-category', {
        } 
        )
        
        if(!response.data) {
          throw new Error('데이터 형식이 올바르지 않습니다.');
        }
        if (mounted) {
          const filteredCategory = response.data.filter((category:any)=> category.name !== '공지'&& category.name !== '자유' && category.name !== '리뷰' && category.name !== '도쿄')
          setRegionCategory(filteredCategory)
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

    return () => {
      mounted = false;
    };
  }, [])

  const itemsPerPage = 4

  // 지역 카드 - 다음 페이지 핸들러
  const nextBtnHandler = () => {
    if (startIndex + itemsPerPage < regionCategory.length) {
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
        Math.floor((regionCategory.length - 1) / itemsPerPage) * itemsPerPage
      setStartIndex(lastPageStart)
    } else {
      // 이전 페이지로 이동
      setStartIndex(startIndex - itemsPerPage)
    }
  }

  // 현재 보여줄 데이터 조절
  const currentItems = regionCategory.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className='flex flex-row justify-center items-center my-8 w-full'>
      <PrevArrowIcon
        onClick={prevBtnHandler}
        className='w-6 h-6 mr-10'
      />
      <div className='flex flex-row space-x-10'>
        {currentItems.map((region) => (
          <Link
            key={region.id}
            to={`/postlist/region/${encodeURIComponent(region.name)}`}
            style={{ backgroundImage: `url(${regionImages[region.name as keyof typeof regionImages]})` }}
            className='font-bold text-[1.4rem] w-48 h-60 text-white rounded-xl flex items-end justify-center py-4 bg-cover bg-center bg-no-repeat relative'
          >
            {/* 배경 이미지 위에 어두운 레이어 추가 */}
            <div className='absolute top-0 left-0 w-full h-full bg-[#000000] bg-opacity-40 rounded-xl'></div>
            <span className='relative z-10 pb-2'>{region.name}</span>
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
