import React from 'react'
import PostItem from './PostItem'
import { useState } from 'react'
import { postData } from '@/temporaryData/allPostData'
import DropdownSelector from '@/components/DropdownSelector'
import RegionDropdown from '@/components/RegionDropdown'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const PostListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedDetailCategory, setSelectedDetailCategory] =
    useState('지역 전체')
  const [isDetailCategoryOpen, setIsDetailCategoryOpen] = useState(false)
  const [sortType, setSortType] = useState('최신순')
  const navigate = useNavigate()

  const handleRegionCategory = (selected: string) => {
    setSelectedCategory(selected)

    // '지역' 카테고리 선택 시 상세 지역 선택 드롭다운 표시 및 postlist/region 라우터로 이동
    if (selected === '지역') {
      setIsDetailCategoryOpen(true)
      navigate('/postlist/region')
      console.log(isDetailCategoryOpen)
    } else {
      setIsDetailCategoryOpen(false)
      setSelectedDetailCategory('지역 전체')
      navigate('/postlist')
    }
  }

  const options = [
    { value: '전체', label: '전체' },
    { value: '자유', label: '자유' },
    { value: '지역', label: '지역' },
    { value: '리뷰', label: '리뷰' },
  ]

  const regionOptions = [
    { value: '지역 전체', label: '지역 전체' },
    { value: '강원도', label: '강원도' },
    { value: '경기도', label: '경기도' },
    { value: '경상남도', label: '경상남도' },
    { value: '경상북도', label: '경상북도' },
    { value: '광주', label: '광주' },
    { value: '대구', label: '대구' },
    { value: '대전', label: '대전' },
    { value: '부산', label: '부산' },
    { value: '서울', label: '서울' },
    { value: '세종', label: '세종' },
    { value: '울산', label: '울산' },
    { value: '인천', label: '인천' },
    { value: '전라남도', label: '전라남도' },
    { value: '전라북도', label: '전라북도' },
    { value: '제주도', label: '제주도' },
    { value: '충청남도', label: '충청남도' },
    { value: '충청북도', label: '충청북도' },
  ]

  const sortingOptions = [
    { value: '최신순', label: '최신순' },
    { value: '인기순', label: '인기순' },
  ]

  const ExceptRegionOptions = ['공지', '자유', '리뷰']

  const filteredGroups = postData.filter((post) => {
    // 전체 카테고리 선택 시 모든 포스트 표시
    if (selectedCategory === '전체') {
      return true
    }

    // 지역 카테고리 선택 시 상세 지역 필터링
    if (selectedCategory === '지역') {
      // ExceptRegionOptions에 포함되지 않은 카테고리만 표시
      if (selectedDetailCategory === '지역 전체') {
        return !ExceptRegionOptions.includes(post.category)
      }
      return post.category === selectedDetailCategory
    }

    // 그 외 카테고리는 선택된 카테고리만 필터링
    return post.category === selectedCategory
  })

  const notice = postData.filter((post) => post.category === '공지')

  // 정렬 방식
  const sortedPosts = useMemo(() => {
    const sorted = [...filteredGroups]

    if (sortType === '최신순') {
      return sorted.sort((a, b) => {
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      })
    }
    return sorted.sort((a, b) => b.likes - a.likes)
  }, [filteredGroups, sortType])

  return (
    <div>
      <div className='flex flex-col mx-12'>
        {notice.map((post) => (
          <PostItem
            key={post.id}
            post={post}
          />
        ))}
      </div>

      {/* 카테고리 선택 드롭다운 */}
      <div className='flex justify-between mt-10 '>
        <div className='flex '>
          <div className='h-[40px] relative z-1000 mr-4 mx-24'>
            <DropdownSelector
              options={options}
              defaultValue={selectedCategory}
              onChange={handleRegionCategory}
            />
          </div>
          {/* 카테고리 '지역' 선택 시 표시되는 상세 지역 선택 드롭다운 */}
          {isDetailCategoryOpen && (
            <div>
              <RegionDropdown
                options={regionOptions}
                defaultValue={selectedDetailCategory}
                onChange={setSelectedDetailCategory}
              />
            </div>
          )}
        </div>
        <div className='h-[40px] relative z-1000 mx-24'>
          <DropdownSelector
            options={sortingOptions}
            defaultValue='최신순'
            onChange={setSortType}
          />
        </div>
      </div>
      <div className='flex flex-col  my-8 mx-12 '>
        {/* 선택한 카테고리를 기반으로 한 포스트 아이템 리스트 */}
        {filteredGroups.length === 0 ? (
          <div className='flex justify-center items-center h-32 text-darkGray'>
            해당하는 게시물이 없습니다.
          </div>
        ) : (
          sortedPosts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default PostListPage
