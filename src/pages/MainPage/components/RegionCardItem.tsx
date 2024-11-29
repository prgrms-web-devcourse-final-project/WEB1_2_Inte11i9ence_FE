import { Link } from 'react-router-dom';
import { regionData } from '@/temporaryData/regionData';
import NextArrowIcon from '@/assets/svg/nextArrow.svg?react';
import PrevArrowIcon from '@/assets/svg/prevArrow.svg?react';
import { useState } from 'react';

const RegionCardItem = () => {

    // 현재 보여지는 지역 카드 인덱스 상태
    const [startIndex, setStartIndex] = useState(0);

    const itemsPerPage = 4;

    // 지역 카드 - 다음 페이지 핸들러
    const nextBtnHandler = () => {
        console.log('regionCardHandler');
        if (startIndex + itemsPerPage < regionData.length) {
            setStartIndex(startIndex + itemsPerPage);
        } else {
            setStartIndex(0);
        }
    }

    // 지역 카드 - 이전 페이지 핸들러
    const prevBtnHandler = () => {
        console.log('prevBtnHandler');
    if (startIndex === 0) {
        // 첫 페이지에서 이전 버튼 클릭 시 마지막 페이지로 이동
        const lastPageStart = Math.floor((regionData.length - 1) / itemsPerPage) * itemsPerPage;
        setStartIndex(lastPageStart);
    } else {
        // 이전 페이지로 이동
        setStartIndex(startIndex - itemsPerPage);
    }
    }

    // 현재 보여줄 데이터 조절
    const currentItems = regionData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex flex-row justify-center items-center my-8 w-full">
            <PrevArrowIcon 
            onClick={prevBtnHandler}
            className='w-6 h-6 mr-10'></PrevArrowIcon>
            <div className="flex flex-row space-x-10">
                  {currentItems.map((region)=>(
                    <Link
                    key={region.id}
                    to={region.path}
                    style={{ backgroundImage: `url(${region.thumbnail})` }}
                    className='font-bold text-xl w-44 h-56 text-white rounded-[2rem] flex items-end justify-center py-4 bg-cover bg-center bg-no-repeat'
                    >
                    {region.name}
                  </Link>
                  ))}  
            </div>
            <NextArrowIcon 
            onClick={nextBtnHandler}
            className='w-6 h-6 ml-10'></NextArrowIcon>
        </div>
    );
};

export default RegionCardItem;