import AirplainIcon from '@assets/svg/Airplain.svg?react'
import NoteIcon from '@assets/svg/Note.svg?react'
import NextIcon from '@assets/svg/NextButton.svg?react'
import defaultProfileImage from '@assets/png/default-profile-2.png'

interface NavigationProps {
  userProfileImage?: string
}

const MyDropdown = ({ userProfileImage }: NavigationProps) => {
  return (
    <div className='absolute top-12 right-1  w-60 bg-white shadow-lg rounded-lg border border-lightGray z-50 p-4 font-bold'>
      <ul className='text-xs text-black'>
        {/* 프로필 정보 */}
        <div className='flex items-center justify-between p-2 cursor-pointer'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-full overflow-hidden'>
              <img
                src={userProfileImage || defaultProfileImage}
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='flex-1'>
              <p className='text-black'>닉네임</p>
            </div>
          </div>
          <NextIcon
            width={12}
            height={12}
          />
        </div>
        <li className='flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100'>
          <AirplainIcon
            width={18}
            height={18}
          />
          내 여행
        </li>
        <li className='flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100'>
          <NoteIcon
            width={18}
            height={18}
          />
          내 글 / 스크랩
        </li>
        <li className='flex items-center p-2 cursor-pointer font-normal text-darkGray text-xs '>
          로그아웃
        </li>
      </ul>
    </div>
  )
}

export default MyDropdown
