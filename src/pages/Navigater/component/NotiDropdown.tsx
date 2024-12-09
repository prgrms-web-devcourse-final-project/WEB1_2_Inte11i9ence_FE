import { useState, useEffect } from 'react'
import CommentIcon from '@assets/svg/Comment.svg?react'
import LikeIcon from '@assets/svg/Like.svg?react'
import AnnouncementIcon from '@assets/svg/Announcement.svg?react'
import { mockNotifications } from './mockdata'
import formatTime from '@/utils/formatTime'

interface NotiDropdownProps {
  setHasUnreadNotifications: (value: boolean) => void
  onClose: () => void
}

const NotiDropdown = ({
  setHasUnreadNotifications,
  onClose,
}: NotiDropdownProps) => {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  // 읽지 않은 알림 여부를 부모에게 전달
  useEffect(() => {
    const hasUnread = notifications.some(
      (notification) => notification.viewed === 0,
    )
    setHasUnreadNotifications(hasUnread)
  }, [notifications, setHasUnreadNotifications])

  const getIcon = (type: string) => {
    switch (type) {
      case 'likes':
        return (
          <div className='text-[#1A2A6C]'>
            <LikeIcon
              width={18}
              height={18}
            />
          </div>
        )
      case 'comment':
        return (
          <div className='text-[#1A2A6C]'>
            <CommentIcon
              width={19}
              height={19}
            />
          </div>
        )
      case 'announcement':
        return (
          <AnnouncementIcon
            width={18}
            height={18}
          />
        )
      default:
        return null
    }
  }

  // 알림 읽음 처리 함수
  const markNotificationAsRead = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, viewed: 1 } // 클릭 시 읽음 처리
          : notification,
      ),
    )
  }

  // 전체 알림 읽음 처리
  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        viewed: 1, // 모든 알림을 읽음 처리
      })),
    )
  }

  // 필터링된 알림 리스트 반환
  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((notification) => notification.viewed === 0)
      : notifications

  return (
    <div className='absolute top-12 right-1 w-[400px] bg-white shadow-lg rounded-lg border border-lightGray z-50 p-4 font-bold'>
      <div className='text-xs text-black'>
        <div className='flex justify-between text-xs text-darkGray p-2'>
          <div className='flex gap-1'>
            <button
              onClick={() => setFilter('all')}
              className={`${
                filter === 'all' ? 'text-darkBlue' : ''
              } cursor-pointer`}
            >
              전체
            </button>
            <p>|</p>
            <button
              onClick={() => setFilter('unread')}
              className={`${
                filter === 'unread' ? 'text-darkBlue' : ''
              } cursor-pointer`}
            >
              읽지 않음
            </button>
          </div>

          <div className='flex gap-2 font-normal'>
            <button
              onClick={markAllAsRead}
              className='cursor-pointer'
            >
              모두 읽음
            </button>
          </div>
        </div>
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => {
              markNotificationAsRead(notification.id)
              onClose()
            }}
            className={`flex w-full justify-between items-center gap-2 p-4 cursor-pointer 
              ${notification.viewed === 0 ? 'bg-gray-100' : 'bg-white'} 
              `}
          >
            <div className='flex gap-2 items-center'>
              {getIcon(notification.type)}
              <p className='text-normal text-left font-bold text-black break-words'>
                {notification.content}
              </p>
            </div>
            <p className='w-[50px] text-[10px] text-darkGray font-normal'>
              {formatTime(notification.sent_at)}{' '}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotiDropdown
