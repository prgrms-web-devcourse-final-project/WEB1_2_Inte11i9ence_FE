import React from 'react';
import PostItem from './PostItem';
import { useState } from 'react';
import { postData } from '@/temporaryData/allPostData';
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

const SelectedRegionPostList = () => {
    const { id } = useParams();
    const [selectedCategory, setSelectedCategory] = useState('지역')
    // id가 있을 경우 decodeURIComponent(id)로 디코딩하여 상세 지역 선택되도록 설정 (지역 카드 클릭하여 들어왔을 경우)
    const [selectedDetailCategory, setSelectedDetailCategory] = useState(id ? decodeURIComponent(id) : '지역 전체');

    const [isDetailCategoryOpen, setIsDetailCategoryOpen] = useState(true)
    const [sortType, setSortType] = useState('최신순');
    
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // 디코딩한 id를 상세 지역 선택 카테고리로 설정
            const decodedRegion = decodeURIComponent(id);
            setSelectedDetailCategory(decodedRegion);
            setSelectedCategory('지역');
            setIsDetailCategoryOpen(true);
        }
    }, [id]);

    // 1번 드롭다운 change 이벤트 핸들러
    const handleCategory = (selected: string) => {
        setSelectedCategory(selected);
        // 1번 드롭다운에서 '지역' 이외 선택 시 상세 지역 선택 드롭다운 미표시 및 postlist 라우터로 이동
        if (selected !== '지역') {
            setIsDetailCategoryOpen(false);
            navigate('/postlist');
        } else {
            setIsDetailCategoryOpen(true);
        }
    };

    // 2번 드롭다운 change 이벤트 핸들러
    const handleRegionCategory = (selected: string) => {
        setSelectedCategory(selected);

        // '지역 전체' 카테고리 선택 시 postlist/region 라우터로 이동
        if (selected === '지역 전체') {
            navigate('/postlist/region');
        } else {
            // 지명 선택 시 postlist/region/:id 라우터로 이동
            setSelectedDetailCategory(selected);
            navigate(`/postlist/region/${encodeURIComponent(selected)}`);
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
        { value: '최신순', label: '최신순' },
        { value: '인기순', label: '인기순' },
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

    // 정렬 방식
    const sortedPosts = useMemo(() => {
        const sorted = [...filteredGroups]; // 필터링된 결과 복사
        
        if (sortType === '최신순') {
            return sorted.sort((a, b) => {
                return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
            });
        } 
            return sorted.sort((a, b) => b.likes - a.likes);
        
    }, [filteredGroups, sortType]);

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
        const imageUrl = regionImages[selectedDetailCategory];
        return imageUrl ? `url(${imageUrl})` : '';
    }

    return (
        <div>
            
                <div
                className='h-[12rem] w-full bg-cover bg-center text-black text-2xl font-bold flex items-center justify-center p-8'
                style={{ backgroundImage: regionInfoImg() }}>
                    <div className='bg-white opacity-80 rounded-3xl p-4'>지역 정보 캡션 - {selectedDetailCategory}</div>
                </div>
            
            {/* 카테고리 선택 드롭다운 */}
            <div className='flex justify-between mt-10'>
                <div className='flex'>
                <div className='h-[40px] relative z-1000 mr-4'>
                    <DropdownSelector
                    options={options}
                    defaultValue={selectedCategory}
                    onChange={handleCategory}
                    />
                </div>
                {/* 지역 카테고리 선택 시 상세 지역 선택 드롭다운 */}
                {isDetailCategoryOpen &&(
                    <RegionDropdown
                            options={regionOptions}
                            defaultValue={selectedDetailCategory}
                            onChange={handleRegionCategory}
                />)}
                </div>
                <div className='h-[40px] relative z-1000'>
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
                    <PostItem key={post.id} post={post} />
                ))
            )}
        </div>
        </div>
    );
};

export default SelectedRegionPostList;