import LikeIcon from '@assets/svg/Like.svg?react'
import CommentIcon from '@assets/svg/Comment.svg?react'
import { useEffect, useState } from 'react'
import { groups } from './mockdata'

const MypagePostList = ({ regionId }: { regionId: number }) => {
  // api명세서 확정나면 타입 구체적으로 바꿀 예정
  const [filteredGroups, setFilteredGroups] = useState<any[]>([])

  useEffect(() => {
    const filtered = groups.filter((group) => group.regionId === regionId)
    setFilteredGroups(filtered)
  }, [regionId])

  return (
    <div className='flex flex-[7] flex-col gap-6'>
      <div className='flex  justify-between'>
        <button className='border bg-[#ecf4f9] p-[1vw] py-1 w-auto rounded-lg text-black text-sm shadow-md font-bold'>
          {regionId}
        </button>
      </div>

      <div className='flex flex-wrap h-[470px] w-full mx-0 gap-y-4'>
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className='flex-col flex justify-between h-[30vh] p-[1vw] w-[13vw] mx-[1vw] bg-white shadow-lg rounded-lg border border-lightGray z-10 font-bold transition-transform transform hover:scale-105 hover:shadow-xl'
          >
            <div className='flex flex-col gap-2'>
              <div className='h-[14vh]'>
                <img
                  src={group.groupImgUrl}
                  alt='Group Image'
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
              <p className='font-bold text-black text-xs'>{group.title}</p>{' '}
            </div>

            <div className='flex justify-between font-normal'>
              <div className='flex gap-0.5 text-darkGray text-[10px] font-bold'>
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
                <div>{group.comments}</div>
              </div>
              <p className='text-[9px] text-darkGray'>{group.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MypagePostList
