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

    // 숫자로 받은 평점 데이터를 별로 표시하기 위해 변환
    const numToStar = (num: number | undefined) => {
        switch(num) {
            case 1:
                return '★☆☆☆☆';
            // case 1.5:
            //     return '★½☆☆☆';
            case 2:
                return '★★☆☆☆';
            case 3:
                return '★★★☆☆';
            case 4:
                return '★★★★☆';
            case 5:
                return '★★★★★';
            default:
                return '평점 없음';
        }
    }
  return (
    <div>
      <Link
        to='/postpage' // 실제 링크로 변경
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
                    <p className='text-lightBlue font-bold text-[14px]'>
                       {post.category === '리뷰'?
                            (<span className={`border-2 rounded-[0.7rem] mx-2 px-1 pb-0.5 my-0.5 ${getCategoryColor(post.category)}`}>{numToStar(post.rating)}</span>)
                            :(<span className={`border-2 rounded-[0.7rem] mx-2 px-1 pb-0.5 my-0.5 ${getCategoryColor(post.category)}`}>{post.category}</span>)
                            }
                    </p>
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
                <span className='text-darkGray text-[14px]'>{post.likes}</span>
                <div className='text-darkGray'>
                  <CommentIcon
                    width={14}
                    height={14}
                  />
                </div>
                <span className='text-darkGray text-[14px]'>{post.replies}</span>
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
