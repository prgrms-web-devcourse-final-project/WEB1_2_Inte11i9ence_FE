import RegionCardItem from '../components/RegionCardItem';

const RegionCardList = () => {
    return (
        <div className="flex flex-col w-full mt-20 mb-24">
            <header className='flex justify-between items-center mb-4 px-10 w-full'>
                <h2 className='text-[1.5rem] font-bold'>지역</h2>
                <button className='text-darkGray hover:text-black'>더보기</button>
            </header>
        <RegionCardItem />
    </div>
    );
};

export default RegionCardList;