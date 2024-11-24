import BestCardItem from './BestCardItem';
import { postData } from '@/temporaryData/postData';

const BestCardList = () => {
    const bestPosts = postData.sort((a,b) => b.likes - a.likes).slice(0, 3);
    return (
        <div className="flex flex-col w-full my-24">
            <div className='flex flex-row justify-center w-full'>
                <div className='mb-4 flex flex-row justify-between w-[calc(24rem+3rem)]'>
                    <span className='text-lg font-bold'>금주의 인기 포스트</span>
                    <button className='text-darkGray'>더보기</button>
                </div>
            </div>
            <div className='flex flex-col space-y-4 mx-12 w-[calc(26rem+7rem)]'>
      {bestPosts.map((post) => (
        <BestCardItem key={post.id} post={post} />
      ))}
    </div>
    </div>
    );
};

export default BestCardList;