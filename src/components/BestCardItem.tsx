import { Link } from 'react-router-dom'
import LikeIcon from '@/assets/svg/like.svg?react'
import CommentIcon from '@/assets/svg/comment.svg?react'
import { AllPostData } from '@/typings/post'

interface PostItemProps {
  post: AllPostData
}

const BestCardItem = ({ post }: PostItemProps) => {
  return (
    <div className='flex justify-center w-full'>
      <Link
        to={`/post/${post.id}`}
        style={{ backgroundImage: `url(${post.photoUrl})` }}
        className='font-bold h-[12rem] w-[55rem] rounded-xl flex items-center justify-end bg-cover bg-center relative'
      >
        <div className='absolute top-0 left-0 w-full h-full bg-[#000000] bg-opacity-50 rounded-xl'></div>

        <div className='flex flex-col justify-between bg-white opacity-80 rounded-xl w-[30rem] h-[10rem] px-4 py-3 mr-5 z-10 justify-center align-center'>
          <span className='text-xl font-bold '>{post.title}</span>
          <span className='text-sm text-darkGray overflow-hidden line-clamp-3'>
            {post.content}
          </span>
          <div className='flex gap-2 text-left justify-end'>
            <div className='flex items-center gap-1'>
              <div className='text-darkGray'>
                <LikeIcon
                  width={17}
                  height={20}
                />
              </div>
              <span className='text-darkGray text-[15px]'>{post.likes}</span>
              <div className='text-darkGray'>
                <CommentIcon
                  width={18}
                  height={20}
                />
              </div>
              <span className='text-darkGray text-[15px]'>{post.replies}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BestCardItem
