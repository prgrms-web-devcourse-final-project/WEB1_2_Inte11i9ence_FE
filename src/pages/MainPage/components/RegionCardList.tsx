import { Link } from 'react-router-dom'
import RegionCardItem from '../components/RegionCardItem'

const RegionCardList = () => {
  return (
    <div className='flex flex-col w-full px-16'>
      <header className='flex justify-between items-center mb-4 px-10 w-full'>
        <h2 className='text-2xl font-bold'>지역</h2>
        <Link
          to='postlist/region'
          className='text-darkGray hover:text-black text-sm'
        >
          더보기
        </Link>
      </header>
      <RegionCardItem />
    </div>
  )
}

export default RegionCardList
