import DropdownSelector from '@/components/DropdownSelector';
import SearchModal from '@/components/SearchModal';
import PostItem from './PostItem';
import React, { useEffect } from 'react';
import { postData } from '@/temporaryData/allPostData';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AllPostData } from '@/typings/post';

const SearchResultPage = () => {
    // 쿼리 파라미터 읽어오기
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword')|| '';
    const [sortType, setSortType] = useState('latest');
    const [allPosts, setAllPosts] = useState<AllPostData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPosts = async () => {
            if (!keyword.trim()) {return};
            
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await axios.get(
                    'api/v1/posts'
                    // 연결 확인한 목서버 주소, 요청 제한으로 인해 주석 처리
                    // `https://189bbcf2-b5c2-4dc4-8590-f889d9ed6579.mock.pstmn.io/api/v1/posts`
                );

                if (!response.data || !response.data) {
                    throw new Error('검색 결과를 불러오는데 실패했습니다.');
                }

                setAllPosts(response.data);
            } catch (error) {
                console.error('검색 결과 조회 실패:', error);
                setError('검색 결과를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        getPosts();
    }, [keyword]);

    // 검색어 기반 필터링
    const filteredPosts = useMemo(() => {
        if (!keyword.trim()) {return allPosts};
        
        const searchLower = keyword.toLowerCase();
        return allPosts.filter((post) => 
            // 제목 또는 내용에 검색어가 포함된 경우 필터링
            post.title.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower)
        );
    }, [allPosts, keyword]);

    const sortingOptions = [
        { value: 'latest', label: '최신순' },
        { value: 'likes', label: '인기순' },
        { value: 'title', label: '제목순' },
        { value: 'rating', label: '별점순' }
    ]

    // 클라이언트 정렬 로직 (API 실패 시)
  const sortedPosts = useMemo(() => {
    const sorted = [...filteredPosts];
    
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
}, [filteredPosts, sortType]);

const sortHandler = (selected: string) => {
  setSortType(selected);  // 정렬 타입 상태 업데이트
};

    return (
        <div>
            <SearchModal initialSearchTerm={keyword}  />
            <div className='h-[40px] relative z-1000 mb-40 mr-24 pt-10'>
                    <DropdownSelector
                        options={sortingOptions}
                        defaultValue='latest'
                        onChange={sortHandler}
                    />
                </div>
                {sortedPosts.length === 0 ? (
                    <div className='flex justify-center items-center h-32 text-darkGray'>
                        해당하는 게시물이 없습니다.
                        </div>
                        ):(
                            sortedPosts.map((post) => {
                                return <PostItem key={post.id} post={post} />;
                            })
                        )}
        </div>
    );
};

export default SearchResultPage;