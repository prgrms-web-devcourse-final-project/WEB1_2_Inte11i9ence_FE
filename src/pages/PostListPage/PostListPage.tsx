import React from 'react';
import PostItem from './PostItem';
import { useState } from 'react';
import { postData } from '@/temporaryData/allPostData';
import DropdownSelector from '@/components/DropdownSelector';
import RegionDropdown from '@/components/RegionDropdown';

const PostListPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('전체')
    const [selectedDetailCategory, setSelectedDetailCategory] = useState('지역 전체')
    const [isDetailCategoryOpen, setIsDetailCategoryOpen] = useState(false)

    const handleRegionCategory = (selected: string) => {
        setSelectedCategory(selected);
        // 지역이 아닌 다른 카테고리 선택시 지역 카테고리 비활성화
        if (selected !== '지역') {
            setIsDetailCategoryOpen(false);
            setSelectedDetailCategory('지역 전체');
        } else {
            setIsDetailCategoryOpen(true);
        }
    };

    const options = [
        { value: '전체', label: '전체' },
        // { value: '공지', label: '공지' },
        { value: '자유', label: '자유' },
        { value: '지역', label: '지역' },
        { value: '리뷰', label: '리뷰' },
    ]

    const regionOptions = [
        { value: '지역 전체', label: '지역 전체' },
        { value: '서울', label: '서울' },
        { value: '부산', label: '부산' },
        { value: '제주', label: '제주' },
        { value: '강릉', label: '강릉' },
    ]

    const ExceptRegionOptions = ['공지', '자유', '리뷰']

    const filteredGroups = postData.filter((post) => {
        // 전체 카테고리 선택시 모든 포스트 표시
        if (selectedCategory === '전체') {return true};
        
        // 지역 카테고리 선택시 상세 지역 필터링
        if (selectedCategory === '지역') {
            // ExceptRegionOptions에 포함되지 않은 카테고리만 표시
            if (selectedDetailCategory === '지역 전체') {
                return !ExceptRegionOptions.includes(post.category);
            }
            return post.category === selectedDetailCategory;
        }
        
        // 그 외 카테고리는 선택된 카테고리만 필터링
        return post.category === selectedCategory;
    })
    const notice = postData.filter(
        (post) => post.category === '공지',
    )

    return (
        <div>
            {/* 상단 고정된 공지사항 포스트 리스트 */}
            {notice.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
            {/* 카테고리 1 : '지역' / 카테고리 2 : '지역명' 선택 시 상단 공지 포스트 대신 해당 지역 캡션 표시 예정 */}
            {/* <div
            className='h-[12rem] w-full bg-cover bg-center text-black text-2xl font-bold flex items-center justify-center p-8'
            style={{ backgroundImage: `url('src/assets/jpg/postThumbnail.jpg')` }}>
                <div className='bg-white opacity-80 rounded-3xl p-4'>지역 정보 캡션 - 서울</div>
            </div> */}

            {/* 카테고리 선택 드롭다운 */}
            <div className='flex gap-4 mt-10'>
                <div className='h-[40px]  relative z-1000'>
                    <DropdownSelector
                    options={options}
                    defaultValue='전체'
                    onChange={handleRegionCategory}
                    />
                </div>
                {isDetailCategoryOpen &&(<RegionDropdown
                            isVisible={selectedCategory === '지역'}
                            options={regionOptions}
                            defaultValue={selectedDetailCategory}
                            onChange={setSelectedDetailCategory}
                />)}
        </div>
        <div className='flex flex-col  my-8 mx-12 '>
            {/* 선택한 카테고리를 기반으로 한 포스트 아이템 리스트 */}
          {filteredGroups.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
        </div>
    );
};

export default PostListPage;