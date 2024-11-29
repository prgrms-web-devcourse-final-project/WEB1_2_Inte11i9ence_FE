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
      <div className="flex justify-center w-full">
        <Link 
                to='#'
                style={{ backgroundImage: `url(${post.imageUrl})` }}
                className="font-bold h-[12rem] w-[55rem] rounded-[2rem] flex items-center justify-end"
            >
                <div className='flex flex-col justify-between bg-white opacity-90 rounded-[2rem] w-[25rem] h-[10rem] px-8 py-6 mr-4'>
                    <div className='flex flex-col'>
                        <span className='text-2xl font-bold mb-2'>{post.title}</span>
                        <span className='text-sm text-darkGray overflow-hidden line-clamp-3'>{post.content}</span>
                    </div>
                    <div className='flex flex-row-reverse items-center space-x-2'>
                        <div className='flex items-center ml-4'>
                            <CommentIcon className='w-4 h-4 mr-1' />
                            <span className='text-sm'>{post.commentCount}</span>
                        </div>
                        <div className='flex items-center'>
                            <LikeIcon className='w-4 h-4 mr-1' />
                            <span className='text-sm'>{post.likes}</span>
                        </div>
                    </div>
                </div>
            </Link>
      </div>
    );
};

export default BestCardItem;