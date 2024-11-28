import React from 'react';
import PostList from './PostList';

const PostListPage = () => {

    return (
        <div>
            postListPage 컴포넌트
            <div>상단에 pin할 공지사항</div>
            
            <PostList/>
        </div>
    );
};

export default PostListPage;