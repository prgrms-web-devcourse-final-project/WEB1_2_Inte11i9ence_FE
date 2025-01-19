import React, { useCallback } from 'react';
import PostItem from './PostItem';
import { useState } from 'react';
import { AllPostData,CategoryData } from '@/typings/post';
import DropdownSelector from '@/components/DropdownSelector';
import RegionDropdown from '@/components/RegionDropdown';
import { useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GangwonImg from '@/assets/jpg/강원도.jpg';
import GeonggiImg from '@/assets/jpg/경기도.jpg';
import GeongbukImg from '@/assets/jpg/경상북도.jpg';
import GeongnamImg from '@/assets/jpg/경상남도.jpg';
import GwangjuImg from '@/assets/jpg/광주.jpg';
import DaeguImg from '@/assets/jpg/대구.jpg';
import DaejeonImg from '@/assets/jpg/대전.jpg';
import BusanImg from '@/assets/jpg/부산.jpg';
import SeoulImg from '@/assets/jpg/서울.jpg';
import SejongImg from '@/assets/jpg/세종.jpg';
import UlsanImg from '@/assets/jpg/울산.jpg';
import IncheonImg from '@/assets/jpg/인천.jpg';
import JeonbukImg from '@/assets/jpg/전라북도.jpg';
import JeonnamImg from '@/assets/jpg/전라남도.jpg';
import JejuImg from '@/assets/jpg/제주도.jpg';
import ChungbukImg from '@/assets/jpg/충청북도.jpg';
import ChungnamImg from '@/assets/jpg/충청남도.jpg';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

const SelectedRegionPostList = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [firstCategory, setFirstCategory] = useState('지역')        // 1번 드롭다운 카테고리 '지역' 선택
    // id가 있을 경우 decodeURIComponent(id)로 디코딩하여 상세 지역 선택되도록 설정 (지역 카드 클릭하여 들어왔을 경우)
    const [secondCategory, setSecondCategory] = useState(id ? decodeURIComponent(id) : '지역 전체');
    const [isSeconedCategoryOpen, setIsSeconedCategoryOpen] = useState(true)  //2번 드롭다운 표시 여부
    const [sortType, setSortType] = useState('latest');                     //정렬 방식
    const [regionList, setRegionList] = useState<CategoryData[]>([]);       //전체 지역 정보
    const [selectedRegionInfo, setSelectedRegionInfo] = useState({});       //선택된 지역

    // 지역명 디코딩
    useEffect(() => {
        if (id) {
            // 디코딩한 id를 상세 지역 선택 카테고리로 설정
            const decodedRegion = decodeURIComponent(id);
            setSecondCategory(decodedRegion);   //
            setFirstCategory('지역');
            setIsSeconedCategoryOpen(true);
        }
    }, [id]);

    // 전체 지역 정보 가져오기
    useEffect(()=>{
        const fetchCategoryList = async ()=> {
            const token = localStorage.getItem('access_token')
            if (!token) {
              throw new Error('토큰이 없습니다.');
            }
        const response = await axios.get(`https://www.skypedia.shop/api/v1/post-category`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        
        }
        } )  
        setRegionList(response.data)
    }
    fetchCategoryList();
    },[])

    // 선택한 지역의 정보 가져오기
    useEffect(()=>{
        const fetchCategory = async () =>{
          const token = localStorage.getItem('access_token')
              if (!token) {
                throw new Error('토큰이 없습니다.');
              }
          const response = await axios.get(`https://www.skypedia.shop/api/v1/post-category/${secondCategory}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
      
          }
        } ) 
        setSelectedRegionInfo(response.data)
        }
        fetchCategory();
      },[secondCategory])

        // 전체 포스트 가져오기 
    const fetchPosts = async ({pageParam = 0,}) => {
        const token = localStorage.getItem('access_token')
            if (!token) {
                throw new Error('토큰이 없습니다.');
              }
            let endpoint = `https://www.skypedia.shop/api/v1/posts?page=${pageParam}`;
            if (sortType !== 'latest') {
                endpoint += `&order=${sortType}`; 
            }
            if (secondCategory !== '지역 전체'){
                endpoint += `&category=${secondCategory}`
            }
            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                });
                return response.data.posts; // 포스트 반환
              } catch (error) {
                console.error('포스트 조회 실패:', error);
                return []; // 오류 발생 시 빈 배열 반환
              }
    }

        const {
            // 무한스크롤
                  data,
                  fetchNextPage,
                  hasNextPage,
                  status,
                  refetch
                } = useInfiniteQuery(['posts', sortType, secondCategory], fetchPosts, {
                  getNextPageParam: (lastPage,pages) => {
                    if(lastPage.length === 10) {
                      return pages.length;
                    } 
                      return undefined;
                  },
                  enabled: !!secondCategory, // secondCategory가 있을 때만 쿼리 실행
                })

        // sortType 변경될 때마다 refetch 실행
        useEffect(() => {
            if (secondCategory) {
            refetch();
            }
        }, [sortType, secondCategory, refetch]);

        const filteredPosts = useMemo(() => {
          if (!data?.pages) {return []};
             return data.pages
               .flat()
               .filter((post) => post.category !== '공지' && post.category !== '자유' && post.category !== '리뷰');
        }, [data]);

    // 1번 드롭다운 change 이벤트 핸들러
    const handleCategory = async (selected: string) => {
        setFirstCategory(selected);
        // 1번 드롭다운 '지역' 이외 선택 시 2번 드롭다운 미표시 및 라우터 이동
        if (selected !== '지역') {
            setIsSeconedCategoryOpen(false);
            navigate('/postlist', {
                state: { selectedCategory: selected } // 선택한 카테고리 정보를 state로 전달
        });
        } else {
            setIsSeconedCategoryOpen(true);
        }
    };

    // 2번 드롭다운 change 이벤트 핸들러
    const handleRegionCategory = async (selected: string) => {
        setSecondCategory(selected);
        
        if (selected === '지역 전체') {
            navigate('/postlist/region');
        } else {
            // await fetchPosts(selected);
            navigate(`/postlist/region/${encodeURIComponent(selected)}`);
        }
    };

    const options = [
        { value: '전체', label: '전체' },
        { value: '자유', label: '자유' },
        { value: '지역', label: '지역' },
        { value: '리뷰', label: '리뷰' },
    ]

    const regionOptions = 
    regionList
    .map((category)=>({value: category.name, label: category.name}))
    .filter((region)=> region.value !== '공지' && region.value !== '자유' && region.value !== '리뷰'&& region.value !== '도쿄')

    regionOptions.unshift({ value: '지역 전체', label: '지역 전체' });

    const sortingOptions = [
        { value: 'latest', label: '최신순' },
        { value: 'likes', label: '인기순' },
        { value: 'title', label: '제목순' },
    ]

    const sortHandler = (selected: string) => {
        setSortType(selected);  // 정렬 타입 상태 업데이트
    };

    const regionImages: Record<string, string> = {
        '강원도': GangwonImg,
        '경기도': GeonggiImg,
        '경상남도': GeongnamImg,
        '경상북도': GeongbukImg,
        '광주': GwangjuImg,
        '대구': DaeguImg,
        '대전': DaejeonImg,
        '부산': BusanImg,
        '서울': SeoulImg,
        '세종': SejongImg,
        '울산': UlsanImg,
        '인천': IncheonImg,
        '전라남도': JeonnamImg,
        '전라북도': JeonbukImg,
        '제주도': JejuImg,
        '충청남도': ChungnamImg,
        '충청북도': ChungbukImg,
    }

    // 지역별 이미지 매칭
    const regionInfoImg = () => {
        const imageUrl = regionImages[secondCategory];
        return imageUrl ? `url(${imageUrl})` : '';
    }

    return (
        <div>
            
            <div
            className='relative h-[23rem] w-full bg-cover bg-center'
            style={{ backgroundImage: regionInfoImg() }}
            >
            {/* 배경 오버레이 */}
            <div className='absolute inset-0 bg-black bg-opacity-30'></div>
            
            {/* 컨텐츠 */}
            <div className='relative z-10 h-full flex flex-col items-center justify-center p-8'>
                <div className='bg-white/90 rounded-3xl p-8 shadow-lg w-[50rem] backdrop-blur-sm'>
                    <h1 className='font-bold text-4xl mb-6 text-darkBlue'>
                        {secondCategory}
                    </h1>
                        <p className='text-lg leading-relaxed text-darkGray'>
                            {selectedRegionInfo.description}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* 카테고리 선택 드롭다운 */}
            <div className='flex w-[87%] mx-auto justify-between mt-10'>
                <div className='flex'>
                <div className='h-[40px] relative z-1000 mr-4'>
                    <DropdownSelector
                    options={options}
                    defaultValue={firstCategory}
                    onChange={handleCategory}
                    />
                </div>
                {/* 지역 카테고리 선택 시 상세 지역 선택 드롭다운 */}
                {isSeconedCategoryOpen &&(
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

export default SelectedRegionPostList;