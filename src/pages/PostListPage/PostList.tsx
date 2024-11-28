import React from 'react';
import { postData } from '@/temporaryData/allPostData';
import PostItem from './PostItem';

const PostList = () => {

    return (
        <div className='flex flex-col gap-12 my-8 mx-12 '>
          {postData.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
    );
};

export default PostList;