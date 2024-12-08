import React from 'react';
import PostItem from './PostItem';
import { useState } from 'react';
import DropdownSelector from '@/components/DropdownSelector';
import RegionDropdown from '@/components/RegionDropdown';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AllPostData } from '@/typings/post';

const RegionPostListPage = () => {
    const [firstCategory, setFirstCategory] = useState('지역')
    const [secondCategory, setSecondCategory] = useState('지역 전체')
    const [isSecondCategoryOpen, setIsSecondCategoryOpen] = useState(true)
    const [sortType, setSortType] = useState('latest');
    const [regionPosts, setRegionPosts] = useState<AllPostData[]>([]);
    const [notice, setNotice] = useState<AllPostData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategory = async () => {
            try {
                // 지역 게시판은 프론트 UI 상으로만 구현하는 것이므로, 전체 포스트 가져온 후 지명으로 된 카테고리만 필터링 처리
                const response = await axios.get(
                    'api/v1/posts'
                    // 연결 확인한 목서버 주소, 요청 제한으로 인해 주석 처리
                    // `https://189bbcf2-b5c2-4dc4-8590-f889d9ed6579.mock.pstmn.io/api/v1/posts`
                ) // 전체 포스트 조회
                const filteredPosts = response.data.filter((post: { category: string; }) => post.category !== '자유' && post.category !== '공지' && post.category !== '리뷰')
                setRegionPosts(filteredPosts)
                const notice = response.data.filter((post: { category: string; }) => post.category === '공지')
                setNotice(notice)
            } catch (error) {
                console.error('지역 게시판 : 카테고리 조회 실패:', error);
            }
        }
        getCategory();
    }, []);

    useEffect(() => {
        // 컴포넌트 마운트 시 지역 카테고리가 선택된 상태라면 드롭다운 표시
        if (firstCategory === '지역') {
            setIsSecondCategoryOpen(true);
        }
    }, []);

    // 1번 드롭다운 change 이벤트 핸들러
    const handleCategory = (selected: string) => {
        setFirstCategory(selected);
        // 카테고리 '지역' 이외 선택 시 상세 지역 선택 드롭다운 미표시 및 postlist 라우터로 이동
        if (selected !== '지역') {
            setIsSecondCategoryOpen(false);
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
        // { value: '공지', label: '공지' },
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
        { value: 'latest', label: '최신순' },
        { value: 'likes', label: '인기순' },
        { value: 'title', label: '제목순' },
        // { value: 'rating', label: '별점순' }
    ]

    // const ExceptRegionOptions = ['공지', '자유', '리뷰']
    
    // 정렬 방식
    // 클라이언트 정렬 로직 (API 실패 시)
    const sortedPosts = useMemo(() => {
        const sorted = [...regionPosts];
        
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
                return sorted.sort((a, b) => 
                    (b.rating || 0) - (a.rating || 0)
                );
            default:
                return sorted;
        }
    }, [regionPosts, sortType]);

    const sortHandler = (selected: string) => {
        setSortType(selected);  // 정렬 타입 상태 업데이트
    };

    return (
        <div>
            {notice.map((post) => (
                <PostItem key={post.id} post={post} />
              )) 
              }

            {/* 카테고리 선택 드롭다운 */}
            <div className='flex justify-between mt-10'>
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
        <div className='flex flex-col  my-8 mx-12 '>
            {/* 선택한 카테고리를 기반으로 한 포스트 아이템 리스트 */}
            {regionPosts.length === 0 ? (
                <div className='flex justify-center items-center h-32 text-darkGray'>
                    해당하는 게시물이 없습니다.
                </div>
            ) : (
                sortedPosts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))
            )}
        </div>
        </div>
    );
};

export default RegionPostListPage;