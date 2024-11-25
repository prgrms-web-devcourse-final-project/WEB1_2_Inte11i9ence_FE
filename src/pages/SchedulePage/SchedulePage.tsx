import { useState } from 'react'
import DropdownSelector from '@/components/DropdownSelector'
import { groups } from '../Mypage/mockdata'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import CommentIcon from '@assets/svg/Comment.svg?react'
import LikeIcon from '@assets/svg/Like.svg?react'
import PlusIcon from '@assets/svg/Plus.svg?react'

const SchedulePage = () => {
  const [selectedView, setSelectedView] = useState('서울')

  const options = [
    { value: '서울', label: '서울' },
    { value: '오사카', label: '오사카' },
  ]

  const filteredGroups = groups.filter(
    (group) => group.regionId === selectedView,
  )

  return (
    <div>
      <div>검색박스</div>
      <div className='flex y-[20px] mx-[70px] bg-white items-center justify-between'>
        <div className='h-[40px]  relative z-1000'>
          <DropdownSelector
            options={options}
            defaultValue='서울'
            onChange={(selected) => setSelectedView(selected)}
          />
        </div>
        <button>
          <PlusIcon
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className='flex flex-wrap mt-12 h-auto w-full justify-center gap-y-12 gap-x-4'>
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className='flex flex-col justify-between p-4 w-[45%] sm:w-[25%] lg:w-[20%] mx-2 bg-white shadow-lg rounded-lg border border-lightGray transition-transform hover:scale-105 hover:shadow-xl gap-8 aspect-[4/5]'
          >
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='w-6 h-6 rounded-full overflow-hidden'>
                    <img
                      src={defaultProfileImage}
                      alt='Profile'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <p className='text-xs font-bold text-black'>닉네임</p>
                </div>
                <button className='border px-2 py-1 rounded-lg text-xs font-normal bg-[#ecf4f9]'>
                  서울{' '}
                </button>
              </div>
              <div className='h-[20vh]'>
                <img
                  src={group.groupImgUrl}
                  alt='Group'
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
              <p className='font-bold text-sm text-black'>{group.title}</p>
            </div>
            <div className='flex justify-between text-darkGray text-xs'>
              <div className='flex items-center gap-1'>
                <LikeIcon
                  width={13}
                  height={13}
                />
                <span>{group.likes}</span>
                <CommentIcon
                  width={13}
                  height={13}
                />
                <span>{group.comments}</span>
              </div>
              <p>{group.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SchedulePage
