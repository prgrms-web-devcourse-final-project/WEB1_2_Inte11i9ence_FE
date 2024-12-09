import LikeIcon from '@assets/svg/Like.svg?react'
import CommentIcon from '@assets/svg/Comment.svg?react'
import { Group } from '@/typings/region'
import noPhoto from '@assets/png/noPhoto.png'
import formatTime from '@/utils/formatTime'
import './scroll.css'
interface MypagePostListProps {
  postList: Group[]
  selectedRegionName: string
}

const MypagePostList = ({
  postList,
  selectedRegionName,
}: MypagePostListProps) => {
  // api명세서 확정나면 타입 구체적으로 바꿀 예정

  return (
    <div className='flex flex-[7] flex-col gap-6 h-full'>
      <div className='flex justify-between'>
        <button className='border bg-[#ecf4f9] p-[1vw] py-1 w-auto rounded-lg text-black text-sm shadow-md font-bold'>
          {selectedRegionName}
        </button>
      </div>

      <div className='flex flex-wrap h-[100%]  gap-y-6 overflow-y-auto custom-scroll'>
        {postList.map((group) => (
          <div
            key={group.groupId}
            className='flex-col flex justify-between h-[30vh] p-[1vw] w-[13vw] mx-[1vw] bg-white shadow-lg rounded-lg border border-lightGray z-10 font-bold transition-transform transform hover:scale-105 hover:shadow-xl'
          >
            <div className='flex flex-col gap-2'>
              <div className='h-[16vh]'>
                <img
                  src={group.groupImgUrl || noPhoto}
                  alt='Group Image'
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
              <p className='font-bold text-black text-sm'>{group.title}</p>{' '}
            </div>

            <div className='flex justify-between font-normal'>
              <div className='flex gap-0.5 text-darkGray text-xs font-bold'>
                <div className='text-darkGray'>
                  <LikeIcon
                    width={13}
                    height={13}
                  />
                </div>
                <div>{group.likes}</div>
                <div className='text-darkGray'>
                  <CommentIcon
                    width={13}
                    height={13}
                  />
                </div>
                <div>{group.replies}</div>
              </div>
              <p className='text-[9px] text-darkGray'>
                {formatTime(group.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MypagePostList
