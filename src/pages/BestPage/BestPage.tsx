import React from 'react';
import { postData } from '@/temporaryData/allPostData';
import BestCardItem from '@/components/BestCardItem';

const BestPage = () => {
    const bestPosts = postData.sort((a,b) => b.likes - a.likes);
    return (
        <div className='flex flex-col'>
            <div className='flex mb-10'>
                <span className='text-lg font-bold mr-1'>금주의 인기 포스트</span>
                <span className='text-lg font-bold text-lightBlue'>TOP 20</span>
            </div>
           <div className='space-y-4 w-9/12 ml-10'>
                {bestPosts.map((post) => (
                    <BestCardItem key={post.id} post={post} />))}
           </div>
        </div>
    );
};

export default BestPage;