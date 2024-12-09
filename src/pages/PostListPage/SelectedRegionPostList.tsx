import React, { useCallback } from 'react';
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
import axios from 'axios';
import { categoryData } from '@/temporaryData/categoryData';

const SelectedRegionPostList = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [firstCategory, setFirstCategory] = useState('지역')        // 1번 드롭다운 카테고리 '지역' 선택
    // id가 있을 경우 decodeURIComponent(id)로 디코딩하여 상세 지역 선택되도록 설정 (지역 카드 클릭하여 들어왔을 경우)
    const [secondCategory, setSecondCategory] = useState(id ? decodeURIComponent(id) : '지역 전체');
    const [isSeconedCategoryOpen, setIsSeconedCategoryOpen] = useState(true)  //2번 드롭다운 표시 여부
    const [sortType, setSortType] = useState('latest');                     //정렬 방식
    const [error, setError] = useState<string | null>(null);                //에러 메시지
    const [detailposts, setDetailPosts] = useState<any[]>([]);              //포스트 데이터
    const [regionInfo, setRegionInfo] = useState<any[]>([]);                //전체 지역 정보
    const [selectedRegionInfo, setSelectedRegionInfo] = useState('');       //선택된 지역

    useEffect(() => {
        if (id) {
            // 디코딩한 id를 상세 지역 선택 카테고리로 설정
            const decodedRegion = decodeURIComponent(id);
            setSecondCategory(decodedRegion);   //
            setFirstCategory('지역');
            setIsSeconedCategoryOpen(true);
        }
    }, [id]);

        // 포스트, 지역 정보 가져오기 
        // const getAllDataInfo = async (category: string) => {
        //     try {
        //         // 병렬로 API 호출
        //         const [postsResponse, regionResponse] = await Promise.all([
        //             axios.get(
        //                 'api/v1/posts'
        //                 // 연결 확인한 목서버 주소, 요청 제한으로 인해 주석 처리
        //                 // `https://189bbcf2-b5c2-4dc4-8590-f889d9ed6579.mock.pstmn.io/api/v1/posts`
        //             ),
        //             axios.get(
        //                 'api/v1/category'
        //                 // 연결 확인한 목서버 주소, 요청 제한으로 인해 주석 처리
        //                 // `https://189bbcf2-b5c2-4dc4-8590-f889d9ed6579.mock.pstmn.io/api/v1/category`
        //             )
        //         ]);
        
        //         // 지역 정보 설정
        //         if (regionResponse.data) {
        //             setRegionInfo(regionResponse.data);
        //             if (category !== '지역 전체') {
        //                 const currentRegion = regionResponse.data.find(
        //                     (region: { name: string }) => region.name === category
        //                 );
        //                 setSelectedRegionInfo(currentRegion ? currentRegion.description : '');
        //             }
        //         }
        
        //         // 포스트 데이터 필터링 및 설정
        //         if (postsResponse.data) {
        //             const filteredPosts = postsResponse.data.filter(
        //                 (post: { category: string }) => 
        //                     post.category === category
        //             );
        //             setDetailPosts(filteredPosts);
        //         }
        //     } catch (error) {
        //         console.error('데이터 로딩 실패:', error);
        //         setError('데이터를 불러오는데 실패했습니다.');
        //     }
        // };

        // useEffect(() => {
        //     getAllDataInfo(secondCategory);
        // }, [secondCategory]);

    // 클라이언트 데이터로 대체
    const getAllDataInfo = async (category: string) => {
        const currentRegion = categoryData.find(
            (region) => region.name === category
        );
        setSelectedRegionInfo(currentRegion ? currentRegion.description : '');

        const filteredPosts = postData.filter(
            (post) => post.category === category
        );
        setDetailPosts(filteredPosts);
    }

    useEffect(() => {
        getAllDataInfo(secondCategory);
    }, [secondCategory]);

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
            await getAllDataInfo(selected);
            navigate(`/postlist/region/${encodeURIComponent(selected)}`);
        }
    };

    // 3번 드롭다운 : 정렬 방식
    // 좋아요(likes), 제목순(title), 별점순(rating)
    // 실제 서버 연결 시 해당 코드 사용 (API 변경)
    // const sortHandler = async (selected: string) => {
    //     try {
    //         setSortType(selected);
    //         const response = await axios.get(`https://26de9924-f2e0-4ef3-a959-02a7b8ce62ab.mock.pstmn.io/api/v1/posts?category=${secondCategory}&order=${selected}`);
    //         if (response.data && response.data.result) {
    //             setDetailPosts(response.data.result);
    //             console.log(`3번 카테고리 변경: 데이터 로딩 성공:`, detailposts);
    //         }
        
    //     } catch (error) {
    //         console.error('3번 카테고리 변경: 데이터 로딩 실패:', error);
    //         setError('정렬 실패');
    //     }
    // }

    const options = [
        { value: '전체', label: '전체' },
        // { value: '공지', label: '공지' },
        { value: '자유', label: '자유' },
        { value: '지역', label: '지역' },
        { value: '리뷰', label: '리뷰' },
    ]

    const regionOptions = [
        // categoryData.map((region) => ({
        //     value: region.name,
        //     label: region.name
        // }))
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

    // 클라이언트 정렬 로직 (API 실패 시)
    const sortedPosts = useMemo(() => {
        const sorted = [...detailposts];
        
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
    }, [detailposts, sortType]);

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
                {selectedRegionInfo}
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
        <div className='flex flex-col  my-8 mx-12 '>
            {/* 선택한 카테고리를 기반으로 한 포스트 아이템 리스트 */}
            {detailposts.length === 0 ? (
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