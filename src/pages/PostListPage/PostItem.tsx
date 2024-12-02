import { AllPostData } from '@/typings/post'
import { Link } from 'react-router-dom'
import CommentIcon from '@/assets/svg/Comment.svg?react'
import LikeIcon from '@/assets/svg/Like.svg?react'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import formatTime from '@/utils/formatTime'
import noPhoto from '@assets/png/noPhoto.png'

interface PostItemProps {
  post: AllPostData
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <div>
      <Link
        to='#' // 실제 링크로 변경
      >
        <div className='flex justify-between align-center px-16 py-2 w-full position gap-16 '>
          <div className='flex flex-col justify-between  gap-2 w-[70%]'>
            <div className='flex-col flex gap-2 '>
              <div className='flex gap-2 align-center'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <img
                      src={post.author.profileUrl || defaultProfileImage}
                      alt='Profile'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex'>
                    <p className='text-darkGray font-bold text-[14px]'>
                      {post.author.nickname}
                    </p>
                  </div>
                  <div className='flex border rounded-lg border-lightBlue p-[2px] px-1'>
                    <p className='text-lightBlue font-bold text-[14px]'>
                      {post.category}
                    </p>
                  </div>
                </div>
              </div>
              <span className='flex justify-start text-[18px] text-left font-bold overflow-hidden'>
                <span className='line-clamp-1'>{post.title}</span>
              </span>
            </div>
            <span className='text-ml text-left text-[14px] text-darkGray overflow-hidden line-clamp-2'>
              {post.content}
            </span>
            <div className='flex gap-2'>
              <div className='flex items-center gap-1'>
                <div className='text-darkGray'>
                  <LikeIcon
                    width={13}
                    height={13}
                  />
                </div>
                <span className='text-darkGray text-[14px]'>10</span>
                <div className='text-darkGray'>
                  <CommentIcon
                    width={14}
                    height={14}
                  />
                </div>
                <span className='text-darkGray text-[14px]'>10</span>
              </div>
              <p className='text-darkGray text-[14px]'>
                {formatTime(post.postedAt)}
              </p>
            </div>
          </div>
          <div className='rounded-lg overflow-hidden'>
            <img
              src={post.photoUrl || noPhoto} // photoUrl이 없으면 기본 이미지 사용
              alt='게시글 썸네일'
              className='w-36 h-36 object-cover rounded-lg' // 부모 div에 꽉 차게 설정
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostItem
