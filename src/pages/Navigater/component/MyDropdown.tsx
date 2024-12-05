import AirplainIcon from '@assets/svg/Airplain.svg?react'
import NoteIcon from '@assets/svg/Note.svg?react'
import NextIcon from '@assets/svg/NextButton.svg?react'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Profile from '@/components/Profile'
import { onLogout } from './LogOut'
interface NavigationProps {
  onClose: () => void
  username: string
  userProfileImage: string | null
}

const MyDropdown = ({
  onClose,
  username,
  userProfileImage,
}: NavigationProps) => {
  //프로필 수정
  const [ProfileEdit, setProfileEdit] = useState(false)
  return (
    <div className='absolute top-12 right-1 w-60 text-xs text-black bg-white shadow-lg rounded-lg border border-lightGray z-10 p-4 font-bold'>
      <div className=' flex items-center justify-between p-2 cursor-pointer'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full overflow-hidden'>
            <img
              src={userProfileImage || defaultProfileImage}
              alt='Profile'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex-1'>
            <p className='text-black'>{username}</p>
          </div>
        </div>
        <button onClick={() => setProfileEdit(true)}>
          <NextIcon
            width={12}
            height={12}
          />
        </button>
      </div>
      <Link
        to={'/mypage'}
        onClick={() => onClose()}
      >
        <div className='flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100'>
          <AirplainIcon
            width={18}
            height={18}
          />
          내 여행
        </div>
      </Link>
      <Link
        to={'/mypage/gather'}
        onClick={() => onClose()}
      >
        <div className='flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100'>
          <NoteIcon
            width={18}
            height={18}
          />
          내 글 / 스크랩
        </div>
      </Link>
      <button
        onClick={onLogout}
        className='flex items-center p-2 cursor-pointer font-normal text-darkGray text-xs '
      >
        로그아웃
      </button>
      {ProfileEdit && (
        <Profile
          onClose={() => setProfileEdit(false)}
          title={'수정'}
          userProfileImage={userProfileImage}
          username={username}
        />
      )}
    </div>
  )
}

export default MyDropdown
