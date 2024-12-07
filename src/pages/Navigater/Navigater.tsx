import { useState } from 'react'
import { Link } from 'react-router-dom'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import NotiIcon from '@assets/svg/NotiIcon.svg?react'
import MyDropdown from './component/MyDropdown'
import NotiDropdown from './component/NotiDropdown'
import LiveNotiIcon from '@assets/svg/LiveNotiIcon.svg?react'
import MainLogin from '@/components/MainLogin'
import useProfile from '@/hooks/useProfile'
import { onLogout } from './component/LogOut'

const Navigation = () => {
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)

  // 로컬스토리지에서 토큰 확인
  const token = localStorage.getItem('access_token')
  const isLogin = Boolean(token) // 토큰이 있으면 로그인 상태

  // useProfile 훅 사용
  const { profile } = useProfile(token || '')

  const [isMyDropdownOpen, setMyDropdownOpen] = useState(false)
  const [isNotiDropdownOpen, setNotiDropdownOpen] = useState(false)

  const toggleMyDropdown = () => {
    setMyDropdownOpen((prev) => !prev)
    setNotiDropdownOpen(false)
  }

  const toggleNotiDropdown = () => {
    setNotiDropdownOpen((prev) => !prev)
    setMyDropdownOpen(false)
  }

  // 모달 열고 닫는 함수
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <div>
      {isLogin && (
        <button
          onClick={onLogout}
          className='flex items-center p-2 cursor-pointer font-normal text-darkGray text-xs '
        >
          로그아웃
        </button>
      )}

      <div className='fixed bg-white top-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl h-16 text-black text-base flex justify-between items-center z-50 px-12'>
        {/* 왼쪽 버튼들 */}
        <div className='flex gap-5'>
          <Link
            to='/postlist'
            className='font-bold'
          >
            게시판
          </Link>
          <Link
            to='/schedule'
            className='font-bold'
          >
            일정 공유
          </Link>
          <button className='font-bold'>
            <Link to='/photo'>사진</Link>
          </button>
        </div>

        {/* 중앙 로고 */}
        <div className='absolute left-1/2 transform -translate-x-1/2'>
          <Link to='/'>
            <button className='text-3xl font-title font-bold text-transparent bg-clip-text bg-gradient-to-tl from-[#68B8FF] via-[#1A2A6C] to-[#68B8FF]'>
              skypedia
            </button>
          </Link>
        </div>

        {/* 로그인 여부에 따른 오른쪽 버튼들 */}
        {isLogin && profile ? (
          <div className='flex gap-5 items-center relative'>
            <Link
              to='/WritePage'
              className='font-bold'
            >
              글쓰기
            </Link>
            <button
              className='w-8 h-8 rounded-full overflow-hidden'
              onClick={toggleMyDropdown}
            >
              <img
                src={profile.profileUrl || defaultProfileImage}
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </button>
            <button onClick={toggleNotiDropdown}>
              <NotiIcon
                width={24}
                height={24}
              />
              {hasUnreadNotifications && (
                <LiveNotiIcon
                  width={5}
                  height={5}
                  className='absolute top-[1px] right-[-3px]'
                />
              )}
            </button>

            {/* 드롭다운 */}
            {isMyDropdownOpen && (
              <MyDropdown
                onClose={() => setMyDropdownOpen(false)}
                username={profile.username}
                userProfileImage={profile.profileUrl}
              />
            )}
            {isNotiDropdownOpen && (
              <NotiDropdown
                onClose={() => setNotiDropdownOpen(false)}
                setHasUnreadNotifications={setHasUnreadNotifications}
              />
            )}
          </div>
        ) : (
          <button
            onClick={openModal}
            className='font-bold'
          >
            로그인
          </button>
        )}
      </div>
      <div className='fixed top-16 left-0 w-full border-b border-lightGray z-40'></div>
      {isModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
          <MainLogin closeModal={closeModal} />
        </div>
      )}
    </div>
  )
}

export default Navigation
