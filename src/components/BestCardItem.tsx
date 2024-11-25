import { Link } from 'react-router-dom';
import LikeIcon from '@/assets/svg/like.svg?react';
import CommentIcon from '@/assets/svg/comment.svg?react';

interface PostItemProps {
    post: {
      id: number; 
      title: string;
      content: string;
      imageUrl: string;
      nickname: string;
      likes: number;
      views: number;
      createdAt: string;
      commentCount: number;
    };
  }

const BestCardItem = ({ post }: PostItemProps) => {
    return (
        <Link 
        to='#'
        style={{ backgroundImage: `url(${post.imageUrl})` }}
        className="font-bold h-36 rounded-3xl flex items-center justify-end"
      >
        <div className='flex flex-col bg-white opacity-90 rounded-3xl w-64 h-28 p-4 mr-4 relative'>
          <span className='text-lg font-bold '>{post.title}</span>
          <span className='text-xs text-darkGray overflow-hidden line-clamp-2'>{post.content}</span>
          <div className='flex flex-row-reverse items-center space-x-2 absolute bottom-3 right-4'>
            <div className='flex items-center ml-4'>
              <CommentIcon className='w-3.5 h-3.5 mr-1' />
              <span className='text-sm'>{post.commentCount}</span>
            </div>
            <div className='flex items-center'>
              <LikeIcon className='w-3.5 h-3.5 mr-1' />
              <span className='text-sm'>{post.likes}</span>
            </div>
          </div>
        </div>
      </Link>
    );
};

export default BestCardItem;