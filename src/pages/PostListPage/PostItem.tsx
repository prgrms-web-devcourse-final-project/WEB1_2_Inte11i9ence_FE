import { AllPostData } from '@/typings/post';
import React from 'react';
import { Link } from 'react-router-dom';
import CommentIcon from '@/assets/svg/Comment.svg?react';
import LikeIcon from '@/assets/svg/Like.svg?react';

interface PostItemProps {
    post: AllPostData;
}

const PostItem = ({ post }: PostItemProps) => {

    // 카테고리별 색상 지정
    const getCategoryColor = (category: string) => {
        switch(category) {
            case '자유':
                return 'text-lightBlue border-lightBlue';
            case '리뷰':
                return 'text-yellow-500 border-yellow-500';
            case '공지':
                return 'text-pink-500 border-pink-500';
            default:
                return 'text-darkBlue border-darkBlue';
        }
    };

    return (
        <div>
            <div className="flex justify-center w-full">
        <Link 
                to='#'
                className="flex justify-between px-4 border-b-2 font-bold h-[12rem] w-[66rem]  flex items-center"
            >
                <div className='flex flex-col justify-around w-[48rem] h-[10rem] px-8 py-4 mr-4'>
                    <div className='flex flex-col space-y-3'>
                        <div className='flex'>
                            {post.category === '리뷰'?
                            (<span className={`border-2 rounded-xl mx-2 px-1 mt-0.5 ${getCategoryColor(post.category)}`}>{post.rating}</span>)
                            :(<span className={`border-2 rounded-xl mx-2 px-1 mt-0.5 ${getCategoryColor(post.category)}`}>{post.category}</span>)
                            }
                             {/* <span className={`border-2 rounded-xl mx-2 px-1 mt-0.5 ${getCategoryColor(post.category)}`}>{post.category}</span> */}
                        <span className='text-2xl font-bold'>{post.title}</span>
                        </div>
                        <span className='text-ml text-left text-darkGray overflow-hidden h-[3.2em] line-clamp-2'>{post.content}</span>
                        <div className='flex items-center space-x-2'>
                            <div className='flex items-center'>
                                <CommentIcon className='w-5 h-5 mr-1' />
                                <span className='text-ml'>{post.commentCount}</span>
                            </div>
                            <div className='flex items-center'>
                                <LikeIcon className='w-5 h-5 mx-1' />
                                <span className='text-ml'>{post.likes}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <img src="src\assets\jpg\postThumbnail.jpg" alt="게시글 썸네일" 
                    className='w-40 h-36 mr-2'/>
                </div>
            </Link>
      </div>
        </div>
    );
};

export default PostItem;