import RegionCardList from '@/pages/MainPage/components/RegionCardList';
import BestCardList from '@/pages/MainPage/components/BestCardList';
import SearchModal from '../../components/SearchModal';

const MainPage = () => {
    
    return (
        <div className="h-full">
            <SearchModal/>
            <RegionCardList />
            <BestCardList/>
        </div>
    );
};

export default MainPage;