import DropdownSelector from '@/components/DropdownSelector';
import SearchModal from '@/components/SearchModal';
import PostItem from './PostItem';
import React from 'react';
import { postData } from '@/temporaryData/allPostData';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResultPage = () => {
    // 쿼리 파라미터 읽어오기
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword')|| '';
    const [sortType, setSortType] = useState('최신순');

    const sortingOptions = [
        { value: '최신순', label: '최신순' },
        { value: '인기순', label: '인기순' },
    ]

    // 검색어 기반 포스트 필터링
    const filteredPosts = postData.filter((post) => {
        const searchLower = keyword.toLowerCase();
        return (
            // 제목 또는 내용에 검색어가 포함된 경우 필터링
            post.title.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower)
        );
    });

    // 정렬 방식
    const sortedPosts = useMemo(() => {
        const sorted = [...filteredPosts];
        
        if (sortType === '최신순') {
            return sorted.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
        } 
            return sorted.sort((a, b) => b.likes - a.likes);
        
    }, [filteredPosts, sortType]);

    return (
        <div>
            <SearchModal initialSearchTerm={keyword}  />
            <div className='h-[40px] relative z-1000 mb-10'>
                    <DropdownSelector
                        options={sortingOptions}
                        defaultValue='최신순'
                        onChange={setSortType}
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