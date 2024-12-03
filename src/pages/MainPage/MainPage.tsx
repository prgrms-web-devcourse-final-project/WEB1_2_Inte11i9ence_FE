import RegionCardList from '@/pages/MainPage/components/RegionCardList'
import BestCardList from '@/pages/MainPage/components/BestCardList'
import SearchModal from '../../components/SearchModal'

const MainPage = () => {
  return (
    <div className='flex flex-col h-full gap-12'>
      <SearchModal />
      <RegionCardList />
      <BestCardList />
    </div>
  )
}

export default MainPage
