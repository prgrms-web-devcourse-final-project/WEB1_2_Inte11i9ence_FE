import React from 'react'
import { useState, useRef, useEffect } from 'react'
import SearchIcon from '@/assets/svg/search.svg?react'
import { useNavigate } from 'react-router-dom'
import SearchArrow from '@assets/svg/searcharrow.svg?react'
import axios from 'axios'

interface SearchModalProps {
  initialSearchTerm?: string
}

const SearchModal = ({ initialSearchTerm = '' }: SearchModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm) // 최초 검색어
  const [storedSearches, setStoredSearches] = useState<string[]>([]) // 최근 검색어
  const modalRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [category, setCategory] = useState<string[]>([])
  const [recommendedCategories, setRecommendedCategories] = useState<string[]>([]);
  const [popularCategories, setPopularCategories] = useState<string[]>([]);

  // 컴포넌트 마운트 시 카테고리 가져오기
  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get(
          'api/v1/posts'
          // 연결 확인한 목서버 주소, 요청 제한으로 인해 주석 처리
          // 'https://189bbcf2-b5c2-4dc4-8590-f889d9ed6579.mock.pstmn.io/api/v1/category'
        )
        const filteredCategory = response.data.map((item: any) => item.name)
        setCategory(filteredCategory)
      } catch (error) {
        console.error('에러 발생',error)
      }
    }
    getCategory()
  }, [isModalOpen])

  // 컴포넌트 마운트 시 랜덤 카테고리 생성
  useEffect(() => {
    if (category.length > 0) {
        // 10개의 랜덤 카테고리 생성
        const shuffledCategories = [...category]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
    
        // 5개씩 분배
        setRecommendedCategories(shuffledCategories.slice(0, 5));
        setPopularCategories(shuffledCategories.slice(5, 10));
    }
  }, [category]);

  // 로컬스토리지에서 검색어 불러오기
  useEffect(() => {
    const savedSearches = localStorage.getItem('storedSearches')
    if (savedSearches) {
      setStoredSearches(JSON.parse(savedSearches))
    }
  }, [])

  // initialSearchTerm이 변경될 때마다 검색어 초기화
  useEffect(() => {
    setSearchTerm(initialSearchTerm)
  }, [initialSearchTerm])

  // 모달창 외부 클릭 시 모달창 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 렌더링된 후 모달창 외부를 클릭했을 때 모달창 닫기
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 검색어 저장 및 이동 처리하는 공통 함수
  const handleSearch = (searchKeyword: string) => {
    if (!searchKeyword.trim()) {return};

    // 중복 검색어 제거 및 최근 검색어 5개로 제한
    const newSearches = [
        searchKeyword,
        ...storedSearches.filter((search) => search !== searchKeyword),
    ].slice(0, 5);

    // 로컬스토리지에 검색어 저장
    setStoredSearches(newSearches);
    localStorage.setItem('storedSearches', JSON.stringify(newSearches));
    
    // 모달 닫기 및 페이지 이동
    setIsModalOpen(false);
    navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
};

  // 검색창 제출 핸들러
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchTerm);
};

  // 검색어 삭제
  const removeSearchTerm = (termToRemove: string) => {
    const newSearches = storedSearches.filter((term) => term !== termToRemove)
    setStoredSearches(newSearches)
    localStorage.setItem('storedSearches', JSON.stringify(newSearches))
  }

  // 최근 검색어 클릭 시 검색어 입력창에 검색어 입력
  const storedTermSearch = (term: string) => {
    setSearchTerm(term)
    handleSearch(term);
  }

  // 카테고리 클릭 핸들러
  const categoryClickHandler = (selectedCategory: string) => {
      setSearchTerm(selectedCategory);
      handleSearch(selectedCategory);
  };

  // 현재 날짜 반환
  const currentDate = () => {
    const now = new Date()
    return `${now.toLocaleDateString()} ${now.getHours()}시 기준`
  }

  return (
    <div>
      <div className='mx-auto px-4 flex flex-col items-center'>
        <form
          onSubmit={submitHandler}
          className='w-[55rem]'
        >
          <div
            ref={modalRef}
            className='relative flex items-center'
          >
            <input
              ref={searchInputRef}
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full h-10 pl-6 pr-12 border border-darkGray rounded-3xl'
              placeholder='검색어를 입력하세요'
              onClick={() => setIsModalOpen(true)}
            />
            <button
              type='submit'
              className='absolute right-4 top-1/2 -translate-y-1/2'
            >
              <SearchIcon className='w-7 h-5' />
            </button>

            {isModalOpen && (
              <div className='absolute top-[3rem] w-full bg-white rounded-3xl shadow-2xl p-4 z-50'>
                <div className='flex justify-between'>
                  <div className='flex flex-wrap gap-2'>
                    {storedSearches.map((keyword, index) => (
                      <div
                        key={index}
                        onClick={() => storedTermSearch(keyword)}
                        className='flex items-center bg-lightGray rounded-3xl px-4 py-2 cursor-pointer'
                      >
                        <span className='mr-2'>{keyword}</span>
                        <button
                          type='button'
                          onClick={(e) => {
                            e.stopPropagation()
                            removeSearchTerm(keyword)
                          }}
                          className='text-darkGray hover:text-black'
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* 검색어 삭제 버튼 */}
                  {storedSearches.length > 0 && (
                    <div className='flex justify-end mr-4'>
                      <button
                        type='button'
                        onClick={() => {
                          setStoredSearches([])
                          localStorage.removeItem('storedSearches')
                        }}
                        className='text-darkGray hover:text-black'
                      >
                        모두 삭제
                      </button>
                    </div>
                  )}
                </div>
                {/* 추천/인기 검색어 헤더 */}
                <div className='flex w-full px-24 items-center my-4'>
                  <div className='flex flex-[3] flex-col gap-4'>
                    <span className='text-lg font-bold text-left'>
                      추천 여행지
                    </span>
                    <div className='flex flex-col gap-1'>
                      {recommendedCategories.map((categoryName, index) => (
                        <div 
                            key={index} 
                            className='flex align-center cursor-pointer hover:text-blue-500'
                            onClick={() => categoryClickHandler(categoryName)}
                        >
                            <SearchArrow width={20} height={20} className='pt-2' />
                            <p>{categoryName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='flex  flex-[4] flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-lg font-bold '>인기 검색어</span>
                      <span className='text-xs text-darkGray'>
                        {currentDate()}
                      </span>
                    </div>
                    <div className='flex flex-col gap-1 text-left'>
                    {popularCategories.map((categoryName, index) => (
                      <div 
                          key={index} 
                          className='flex align-center cursor-pointer hover:text-blue-500'
                          onClick={() => categoryClickHandler(categoryName)}
                      >
                          <SearchArrow width={20} height={20} className='pt-2' />
                          <p>{categoryName}</p>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
                {/* 검색 결과 없음 메시지 */}
                {/* <div className="flex flex-col items-center justify-center">
                                    <span className="text-darkGray">
                                        검색 결과가 없습니다.
                                    </span>
                                </div> */}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchModal
