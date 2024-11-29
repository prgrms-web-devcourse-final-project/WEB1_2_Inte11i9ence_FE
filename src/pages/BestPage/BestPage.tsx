import React from 'react';
import { postData } from '@/temporaryData/allPostData';
import BestCardItem from '@/components/BestCardItem';

const BestPage = () => {
    const bestPosts = postData.sort((a,b) => b.likes - a.likes).slice(0, 20);
    return (
        <div className='flex flex-col items-center'>
            <div className='w-[55rem]'> 
                <div className='flex mb-20'> 
                    <span className='text-[1.5rem] font-bold mr-1'>금주의 인기 포스트</span>
                    <span className='text-[1.5rem] font-bold text-lightBlue'>TOP 20</span>
                </div>
                <div className='space-y-10'>
                {bestPosts.map((post) => (
                    <BestCardItem key={post.id} post={post} />))}
           </div>
        </div>
        </div>
    );
};

export default BestPage;