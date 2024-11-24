import RegionCardItem from './RegionCardItem';

const RegionCardList = () => {
    return (
        <div className="flex flex-col w-full my-24">
            <div className='flex flex-row justify-center w-full'>
                <div className='mb-4 flex flex-row justify-between w-[calc(24rem+3rem)]'>
                    <span className='text-lg font-bold'>지역</span>
                    <button className='text-darkGray'>더보기</button>
                </div>
            </div>
        <RegionCardItem />
    </div>
    );
};

export default RegionCardList;