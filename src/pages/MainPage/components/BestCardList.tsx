import { Link } from 'react-router-dom';
import BestCardItem from '../../../components/BestCardItem';
import { postData } from '@/temporaryData/allPostData';

const BestCardList = () => {
    const bestPosts = postData.sort((a,b) => b.likes - a.likes).slice(0, 3);
    return (
        <div className="flex flex-col w-full my-26">
            <header className='flex justify-between items-center mb-4 px-10 w-full'>
                <h2 className='text-[1.5rem] font-bold'>금주의 인기 포스트</h2>
                <Link 
                    to='/bestpage' 
                    className='text-darkGray hover:text-black'
                >
                    더보기
                </Link>
            </header>
            <div className='flex flex-col gap-12 my-8 mx-12 '>
      {bestPosts.map((post) => (
        <BestCardItem key={post.id} post={post} />
      ))}
    </div>
    </div>
    );
};

export default BestCardList;