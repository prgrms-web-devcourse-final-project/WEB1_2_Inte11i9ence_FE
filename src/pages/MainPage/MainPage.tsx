import RegionCardList from '@/pages/MainPage/components/RegionCardList';
import BestCardList from '@/pages/MainPage/components/BestCardList';
import SearchIcon from '@/assets/svg/search.svg?react';

const MainPage = () => {
    return (
        <div className="h-full">
            <div className="max-w-2xl mx-auto px-4">
                <form action="#">
                    <div className='relative flex items-center'>
                        <input 
                            type="text" 
                            className='w-full h-12 my-12 pl-4 pr-12 border border-darkGray rounded-3xl' 
                            placeholder='검색어를 입력하세요'
                        />
                        <button 
                            className='absolute right-4 top-1/2 -translate-y-1/2'
                            type='submit'
                        >
                            <SearchIcon className='w-5 h-5'></SearchIcon>
                        </button>
                    </div>
                </form>
                <RegionCardList />
                <BestCardList/>
            </div>
        </div>
    );
};

export default MainPage;