import React from 'react'
import PostItem from './PostItem'
import { useState, useEffect, useMemo } from 'react'
import { postData } from '@/temporaryData/allPostData'
import DropdownSelector from '@/components/DropdownSelector'
import RegionDropdown from '@/components/RegionDropdown'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AllPostData } from '@/typings/post'

const PostListPage = () => {
  const location = useLocation()
  const initCategory = location.state?.selectedCategory || '전체'
  const [selectedCategory, setSelectedCategory] = useState(initCategory)
  const [selectedDetailCategory, setSelectedDetailCategory] =
    useState('지역 전체')
  const [isDetailCategoryOpen, setIsDetailCategoryOpen] = useState(false)
  const [sortType, setSortType] = useState('latest')
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null) // 에러 메시지

  const [allPosts, setAllPosts] = useState<AllPostData[]>([])
  const [filteredGroups, setFilteredGroups] = useState<AllPostData[]>([])
  const [notice, setNotice] = useState<AllPostData[]>([])
  
// 최초 마운트 시 전체 게시글 조회
useEffect(() => {
  setAllPosts(postData)
},[])

  // 게시글 필터링 - 마운트 시 전체 게시글, 최신순으로 조회 (옵션 없는 경우)
    //    useEffect(() => {
    //     let mounted = true;

    //     const getFilteredPosts = async () => {
    //         try {
    //             const response = await axios.get(
    //               'https://www.skypedia.shop/api/v1/posts'
    //               // 연결 확인한 목서버 주소, 요청 제한으로 인해 주석 처리
    //               // `https://189bbcf2-b5c2-4dc4-8590-f889d9ed6579.mock.pstmn.io/api/v1/posts`
    //             )
    //             if(mounted && response.data){
    //               setAllPosts(response.data)
    //             }
    //         }catch (error) {
    //             if (mounted) {
    //             console.error('게시글 조회 실패:', error)
    //             setError('게시글 조회 실패')
    //             }
    //         }    
    //     }
    //     getFilteredPosts();

    //     return () => {
    //         mounted = false;
    //     }
  // }, [])

// 게시글 필터링 및 공지 게시글 분리 - 2개 드롭다운 변경마다
useEffect(() => {
  const filterPosts = () => {
    const ExceptRegionOptions = ['공지', '자유', '리뷰'];

    const filtered = allPosts.filter((post) => {
      if (post.category === '공지') {return false};

      if (selectedCategory === '전체') {
        return true;
      }

      if (selectedCategory === '지역') {
        if (selectedDetailCategory === '지역 전체') {
          return !ExceptRegionOptions.includes(post.category);
        }
        return post.category === selectedDetailCategory;
      }

      return post.category === selectedCategory;
    });

    setFilteredGroups(filtered);
  };
  const noticePost = allPosts.filter((post) => post.category === '공지');
  setNotice(noticePost);

  filterPosts();
}, [selectedCategory, selectedDetailCategory, allPosts]);

// 카테고리 변경 핸들러
  const handleRegionCategory = (selected: string) => {
    setSelectedCategory(selected)

    // '지역' 카테고리 선택 시 상세 지역 선택 드롭다운 표시 및 postlist/region 라우터로 이동
    if (selected === '지역') {
      setIsDetailCategoryOpen(true)
      navigate('/postlist/region')
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

  // 동적으로 정렬 옵션 설정
  const sortingOptions = useMemo(() => {
    const options = [
      { value: 'latest', label: '최신순' },
      { value: 'likes', label: '인기순' },
      { value: 'title', label: '제목순' },
    ];

    if (selectedCategory === '리뷰') {
      options.push({ value: 'rating', label: '별점순' });
    }

    return options;
  }, [selectedCategory]);

  // 클라이언트 정렬 로직 (API 실패 시)
  const sortedPosts = useMemo(() => {
    const sorted = [...filteredGroups];
    
    switch(sortType) {
        case 'latest':
            return sorted.sort((a, b) => 
                new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
            );
        case 'likes':
            return sorted.sort((a, b) => b.likes - a.likes);
        case 'title':
            return sorted.sort((a, b) => 
                a.title.localeCompare(b.title)
            );
        case 'rating':
            return sorted
            // .filter((post) => post.rating !== undefined)
            .sort((a, b) => 
                (b.rating || 0) - (a.rating || 0)
            );
        default:
            return sorted;
    }
  }, [filteredGroups, sortType])

  const sortHandler = (selected: string) => {
    setSortType(selected) // 정렬 타입 상태 업데이트
  }

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
      <div className='flex justify-between mt-10'>
        <div className='flex '>
          <div className='h-[40px] relative z-1000 mr-4 mx-[4.5rem]'>
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
        <div className='h-[40px] relative z-1000 mx-[4.7rem]'>
          <DropdownSelector
            options={sortingOptions}
            defaultValue='latest'
            onChange={sortHandler}
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
