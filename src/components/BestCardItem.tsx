import { Link } from 'react-router-dom';
import LikeIcon from '@/assets/svg/like.svg?react';
import CommentIcon from '@/assets/svg/comment.svg?react';

interface PostItemProps {
    post: {
      id: number;
      title: string;
      text: string;
      path: string;
      images: string[];
      likes: number;
      comments: number;
    };
  }

const BestCardItem = ({ post }: PostItemProps) => {
    return (
        <Link 
        to={post.path}
        style={{ backgroundImage: `url(${post.images})` }}
        className="font-bold h-36 rounded-3xl flex items-center justify-end"
      >
        <div className='flex flex-col bg-white opacity-90 rounded-3xl w-64 h-28 p-4 mr-4 relative'>
          <span className='text-lg font-bold '>{post.title}</span>
          <span className='text-xs text-darkGray overflow-hidden line-clamp-2'>{post.text}</span>
          <div className='flex flex-row-reverse items-center space-x-2 absolute bottom-3 right-4'>
            <div className='flex items-center ml-4'>
              <CommentIcon className='w-3.5 h-3.5 mr-1' />
              <span className='text-sm'>{post.comments}</span>
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