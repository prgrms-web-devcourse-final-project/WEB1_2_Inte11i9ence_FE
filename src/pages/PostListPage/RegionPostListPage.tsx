import React from 'react';
import PostItem from './PostItem';
import { useState } from 'react';
import DropdownSelector from '@/components/DropdownSelector';
import RegionDropdown from '@/components/RegionDropdown';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AllPostData, CategoryData } from '@/typings/post';
// import { postData } from '@/temporaryData/allPostData';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

const RegionPostListPage = () => {
    const [firstCategory, setFirstCategory] = useState('지역')
    const [secondCategory, setSecondCategory] = useState('지역 전체')
    const [isSecondCategoryOpen, setIsSecondCategoryOpen] = useState(true)
    const [sortType, setSortType] = useState('latest');
    const [notice, setNotice] = useState<AllPostData[]>([]);
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState<CategoryData[]>([])

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
        } = useInfiniteQuery(['posts', sortType], fetchPosts, {
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
        }, [sortType, refetch]);

        const filteredPosts = useMemo(() => {
            if (!data) {return []};
            return data.pages
              .flat()
              .filter((post) => post.category !== '공지' && post.category !== '자유' && post.category !== '리뷰');
          }, [data]);
      
    useEffect(() => {
        // 컴포넌트 마운트 시 지역 카테고리가 선택된 상태라면 드롭다운 표시
        if (firstCategory === '지역') {
            setIsSecondCategoryOpen(true);
        }
    }, []);

    // 1번 드롭다운 change 이벤트 핸들러
    const handleCategory = (selected: string) => {
        setFirstCategory(selected);
        // 카테고리 '지역' 이외 선택 시 postlist 라우터로 이동
        if (selected !== '지역') {
            // setIsSecondCategoryOpen(false);
            navigate('/postlist', {
                state: { selectedCategory: selected } // 선택한 카테고리 정보를 state로 전달
            });
        }
    };

    // 2번 드롭다운 change 이벤트 핸들러
    const handleRegionCategory = (selected: string) => {

        // '지역 전체' 선택 시 2번 카테고리 표시
        if (selected === '지역 전체') {
            setIsSecondCategoryOpen(true);
        } else {
            setSecondCategory(selected);
            navigate(`/postlist/region/${selected}`);
        }
    }

    const options = [
        { value: '전체', label: '전체' },
        { value: '자유', label: '자유' },
        { value: '지역', label: '지역' },
        { value: '리뷰', label: '리뷰' },
    ]

    const regionOptions = 
    categoryList
    .map((category)=>({value: category.name, label: category.name}))
    .filter((region)=> region.value !== '공지' && region.value !== '자유' && region.value !== '리뷰'&& region.value !== '도쿄')

    regionOptions.unshift({ value: '지역 전체', label: '지역 전체' });

    const sortingOptions = [
        { value: 'latest', label: '최신순' },
        { value: 'likes', label: '인기순' },
        { value: 'title', label: '제목순' }
    ]


    const sortHandler = (selected: string) => {
        setSortType(selected);  // 정렬 타입 상태 업데이트
    };

    return (
        <div>
            <div className='flex flex-col mx-12'>
            {notice.map((post) => (
                <PostItem key={post.id} post={post} />
              )) 
              }
            </div>
            {/* 카테고리 선택 드롭다운 */}
            <div className='flex justify-between w-[87%] mx-auto mt-10'>
                <div className='flex'>
                <div className='h-[40px] relative z-1000 mr-4'>
                    <DropdownSelector
                    options={options}
                    defaultValue={firstCategory}
                    onChange={handleCategory}
                    />
                </div>
                {/* 지역 카테고리 선택 시 상세 지역 선택 드롭다운 */}
                {isSecondCategoryOpen &&(
                    <RegionDropdown
                            options={regionOptions}
                            defaultValue={secondCategory}
                            onChange={handleRegionCategory}
                />)}
                </div>
                <div className='h-[40px] relative z-1000'>
                    <DropdownSelector
                        options={sortingOptions}
                        defaultValue='latest'
                        onChange={sortHandler}
                    />
                </div>
                
        </div>
        <InfiniteScroll
        dataLength={filteredPosts.length}
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
            filteredPosts.map((post: AllPostData) => (
              <PostItem key={post.id} post={post} />
            ))
          )}
        </div>
      </InfiniteScroll>
        </div>
    );
};

export default RegionPostListPage;