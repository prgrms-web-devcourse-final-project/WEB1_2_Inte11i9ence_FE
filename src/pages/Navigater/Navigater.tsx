import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import NotiIcon from '@assets/svg/NotiIcon.svg?react'
import MyDropdown from './MyDropdown'
import NotiDropdown from './NotiDropdown'
import LiveNotiIcon from '@assets/svg/LiveNotiIcon.svg?react'
import MainLogin from '@/components/MainLogin'//++

interface NavigationProps {
  userProfileImage?: string
}

const Navigation = ({ userProfileImage }: NavigationProps) => {
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false) // 모달 상태 추가 ++
  //로그인 여부 저장 변수
  const isLogin = false
  //드롭다운 외 화면 클릭시 드롭다운 닫힐 수 있도록 설정
  const myDropdownRef = useRef<HTMLButtonElement | null>(null)
  const notiDropdownRef = useRef<HTMLButtonElement | null>(null)

  const [isMyDropdownOpen, setMyDropdownOpen] = useState(false)
  const [isNotiDropdownOpen, setNotiDropdownOpen] = useState(false)

  // 외부 클릭 시 드롭다운 닫히게 처리
  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      const { target } = e
      if (
        isMyDropdownOpen &&
        myDropdownRef.current &&
        !myDropdownRef.current.contains(target as Node) &&
        !myDropdownRef.current?.parentElement?.contains(target as Node)
      ) {
        setMyDropdownOpen(false)
      }
      if (
        isNotiDropdownOpen &&
        notiDropdownRef.current &&
        !notiDropdownRef.current.contains(target as Node) &&
        !notiDropdownRef.current?.parentElement?.contains(target as Node)
      ) {
        setNotiDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', outSideClick)
    return () => {
      document.removeEventListener('mousedown', outSideClick)
    }
  }, [isMyDropdownOpen, isNotiDropdownOpen])

  const toggleDropdown = () => {
    setMyDropdownOpen((prev) => !prev)
    setNotiDropdownOpen(false)
  }

  const notiToggleDropdown = () => {
    setNotiDropdownOpen((prev) => !prev)
    setMyDropdownOpen(false)
  }

    // 모달 열고 닫는 함수++
    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)
 
  return (
    <div>
      <div className='fixed bg-white top-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl h-16 text-black text-base flex justify-between items-center z-50 px-12'>
        {/* 왼쪽 버튼들 */}
        <div className='flex gap-5'>
          <Link to='/postlist' className='font-bold'>게시판</Link>
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
        {isLogin ? (
          <div className='flex gap-5 items-center relative'>
            <button
              ref={myDropdownRef}
              onClick={toggleDropdown}
              className='w-8 h-8 rounded-full overflow-hidden'
            >
              <img
                src={userProfileImage || defaultProfileImage}
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </button>
            <button
              ref={notiDropdownRef}
              onClick={notiToggleDropdown}
            >
              <NotiIcon
                width={24}
                height={24}
              />
              {hasUnreadNotifications && (
                <LiveNotiIcon
                  width={5}
                  height={5}
                  className='absolute top-[1px] right-[-3px]'
                ></LiveNotiIcon>
              )}
            </button>

            {/* 드롭다운 */}
            {isMyDropdownOpen && (
              <MyDropdown userProfileImage={userProfileImage} />
            )}
            {isNotiDropdownOpen && (
              <NotiDropdown
                setHasUnreadNotifications={setHasUnreadNotifications}
              />
            )}
          </div>
        ) : (
          <button onClick={openModal} className='font-bold'>로그인</button>//++
        )}
      </div>
      <div className='fixed top-16 left-0 w-full border-b border-lightGray z-40'></div>
{/* 모달 ++ */}
{isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <MainLogin closeModal={closeModal}/>
         
        </div>
      )}

    </div>
  )
}

export default Navigation
