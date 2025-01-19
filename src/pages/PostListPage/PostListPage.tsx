import React from 'react'
import PostItem from './PostItem'
import { useState, useEffect, useMemo } from 'react'
// import { postData } from '@/temporaryData/allPostData'
import DropdownSelector from '@/components/DropdownSelector'
import RegionDropdown from '@/components/RegionDropdown'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AllPostData, CategoryData } from '@/typings/post'
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

const PostListPage = () => {
  const location = useLocation()
  const initCategory = location.state?.selectedCategory || '전체'
  const [selectedCategory, setSelectedCategory] = useState(initCategory)
  // const [selectedDetailCategory, setSelectedDetailCategory] =
  //   useState('지역 전체')
  // const [isDetailCategoryOpen, setIsDetailCategoryOpen] = useState(false)
  const [sortType, setSortType] = useState('latest')
  const navigate = useNavigate()
  const [categoryList, setCategoryList] = useState<CategoryData[]>([])
  const [notice, setNotice] = useState<AllPostData[]>([])
  
  // const [allPosts, setAllPosts] = useState<AllPostData[]>([])
  // const [filteredGroups, setFilteredGroups] = useState<AllPostData[]>([])
  
  // 전체 지역 정보 가져오기
  useEffect(()=>{
  const fetchCategory = async () =>{
    const token = localStorage.getItem('access_token')
        if (!token) {
          throw new Error('토큰이 없습니다.');
        }
    const response = await axios.get('https://www.skypedia.shop/api/v1/post-category', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      }
    } )
    setCategoryList(response.data)
    }
    fetchCategory();
  },[])

  // 전체 포스트 가져오기
  const fetchPosts = async ({pageParam = 0}) => {
    let endpoint = `https://www.skypedia.shop/api/v1/posts?page=${pageParam}`;

      if (sortType !== 'latest') {
        endpoint += `&order=${sortType}`; 
      }
      if(selectedCategory !== '전체') {
        endpoint += `&category=${selectedCategory}`
      }
      try {
        const response = await axios.get(endpoint);
        return response.data.posts; // 포스트 반환
      } catch (error) {
        console.error('포스트 조회 실패:', error);
        return []; // 오류 발생 시 빈 배열 반환
      }
  } 
  // 상단에 고정할 공지 포스트 가져오기
  useEffect(()=>{
    const fetchNoticePosts = async() => {
        const response = await axios.get(`https://www.skypedia.shop/api/v1/posts?category=공지`)
        setNotice(response.data.posts)
      }
      fetchNoticePosts();
  },[])

    // 무한스크롤
    const {
      data,
      fetchNextPage,
      hasNextPage,
      status,
      refetch
    } = useInfiniteQuery(['posts', sortType, selectedCategory], fetchPosts, {
      getNextPageParam: (lastPage,pages) => {
        if(lastPage.length === 10) {
          return pages.length;
        } 
          return undefined;
      }
    })

    // sortType 변경될 때마다 refetch 실행
    useEffect(() => {
      refetch(); 
    }, [sortType, selectedCategory, refetch]);

  const flatedPosts = useMemo(() => {
              if (!data) {return []};
              return data.pages
                .flat();
            }, [data]);

// 카테고리 변경 핸들러
  const handleCategory = (selected: string) => {
    setSelectedCategory(selected)

    // '지역' 카테고리 선택 시 postlist/region 라우터로 이동
    if (selected === '지역') {
      navigate('/postlist/region')
    }
  }

  const options = [
    { value: '전체', label: '전체' },
    { value: '자유', label: '자유' },
    { value: '지역', label: '지역' },
    { value: '리뷰', label: '리뷰' },
  ]
  
  const regionOptions = 
  categoryList.map((category)=>({value: category.name, label: category.name}))
  regionOptions.unshift({ value: '지역 전체', label: '지역 전체' });

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

  const sortHandler = (selected: string) => {
    setSortType(selected) // 정렬 타입 상태 업데이트
  }

  return (
    <div>
      <div className='flex flex-col mx-12'>
        {/* 공지사항 */}
        {notice.map((post) => (
                <PostItem key={post.id} post={post} />
              )) 
              }
      </div>

      {/* 카테고리 선택 드롭다운 */}
      <div className='flex justify-between mt-10'>
        <div className='flex '>
          <div className='h-[40px] relative z-1000 mr-4 mx-[4.5rem]'>
            <DropdownSelector
              options={options}
              defaultValue={selectedCategory}
              onChange={handleCategory}
            />
          </div>
          {/* 카테고리 '지역' 선택 시 표시되는 상세 지역 선택 드롭다운 */}
          {/* {isDetailCategoryOpen && (
            <div>
              <RegionDropdown
                options={regionOptions}
                defaultValue={selectedDetailCategory}
                onChange={setSelectedDetailCategory}
              />
            </div>
          )} */}
        </div>
        <div className='h-[40px] relative z-1000 mx-[4.7rem]'>
          <DropdownSelector
            options={sortingOptions}
            defaultValue='latest'
            onChange={sortHandler}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={flatedPosts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>데이터를 불러오는 중입니다...</h4>}
        endMessage={<p>모든 게시물을 불러왔습니다.</p>}
      >
         <div className='flex flex-col my-8 mx-12'>
          {status === 'loading' && (
            <div className='flex justify-center items-center h-32 text-darkGray'>
              로딩 중...
            </div>
          )}
          {status === 'error' && (
            <div className='flex justify-center items-center h-32 text-darkGray'>
              게시글 조회 실패
            </div>
          )}
          {status !== 'loading' && status !== 'error' && (
            flatedPosts.map((post: AllPostData) => (
              <PostItem key={post.id} post={post} />
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default PostListPage
