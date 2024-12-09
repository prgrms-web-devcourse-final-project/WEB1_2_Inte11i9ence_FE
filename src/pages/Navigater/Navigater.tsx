import { useState } from 'react'
import { Link } from 'react-router-dom'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import NotiIcon from '@assets/svg/NotiIcon.svg?react'
import MyDropdown from './component/MyDropdown'
import NotiDropdown from './component/NotiDropdown'
import LiveNotiIcon from '@assets/svg/LiveNotiIcon.svg?react'
import MainLogin from '@/components/MainLogin'
import useProfile from '@/hooks/useProfile'
// import { onLogout } from './component/LogOut'

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
      <div className='fixed bg-white top-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl h-16 text-black text-base flex justify-between items-center z-50 px-12'>
        {/* 중앙 로고 */}
        <div className='flex justify-center align-center gap-5'>
          <div className=''>
            <Link to='/'>
              <button className='text-3xl font-title font-bold text-transparent bg-clip-text bg-gradient-to-tl from-[#68B8FF] via-[#1A2A6C] to-[#68B8FF]'>
                skypedia
              </button>
            </Link>
          </div>
          {/* 왼쪽 버튼들 */}
          <div className='flex gap-5 items-center text-[15px]'>
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
            <Link
              to='/photo'
              className='font-bold'
            >
              사진
            </Link>
          </div>
        </div>

        {/* 로그인 여부에 따른 오른쪽 버튼들 */}
        {isLogin && profile ? (
          <div className='flex gap-5 items-center relative'>
            <Link
              to='/WritePage'
              className='font-bold text-[15px]'
            >
              글쓰기
            </Link>
            <button
              className='w-7 h-7 rounded-full overflow-hidden'
              onClick={toggleMyDropdown}
            >
              <img
                src={
                  profile.profileUrl ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoV1w-qvi0_hmEVu_uemLxtPglSevwCJLa-A&s'
                }
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </button>
            <button onClick={toggleNotiDropdown}>
              <NotiIcon
                width={20}
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
                userProfileImage={
                  profile.profileUrl ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoV1w-qvi0_hmEVu_uemLxtPglSevwCJLa-A&s'
                }
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
            className='font-bold text-[15px]'
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
