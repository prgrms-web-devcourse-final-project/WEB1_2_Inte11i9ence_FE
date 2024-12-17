import { useState, useEffect } from 'react'
import CommentIcon from '@assets/svg/Comment.svg?react'
import LikeIcon from '@assets/svg/Like.svg?react'
import AnnouncementIcon from '@assets/svg/Announcement.svg?react'
import axios from 'axios'
import formatTime from '@/utils/formatTime'
import { Notification } from '@/typings/noti'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'

interface NotiDropdownProps {
  setHasUnreadNotifications: (value: boolean) => void
  onClose: () => void
}

const useSSE = (addNotification: (newNoti: Notification) => void) => {
  useEffect(() => {
    const token = localStorage.getItem('access_token') // 저장된 토큰 가져오기
    const EventSource = EventSourcePolyfill || NativeEventSource

    if (token) {
      // 'Last-Event-Id'를 세션 스토리지에서 가져옵니다.
      const lastEventId = sessionStorage.getItem('Last-Event-Id') || ''

      const eventSource = new EventSource(
        `https://www.skypedia.shop/api/v1/notify/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Last-Event-Id': lastEventId, // Last-Event-Id 헤더 추가
          },
        },
      )

      eventSource.onopen = () => {
        console.log('SSE 연결 성공') // SSE 연결 성공 여부 확인
      }

      eventSource.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data)
          console.log('새 알림 수신:', parsedData) // 새 알림 수신 여부 확인
          addNotification(parsedData) // 새로운 알림 추가

          // 새 이벤트가 수신되면 Last-Event-Id 갱신
          sessionStorage.setItem('Last-Event-Id', event.lastEventId)
        } catch (error) {
          console.error('알림 파싱 실패:', error)
        }
      }

      eventSource.onerror = (error) => {
        console.error('SSE 연결 에러 발생:', error) // 에러 발생 시 로깅
        eventSource.close()
      }

      // SSE 연결 상태를 return에서 관리하고 확인할 수 있습니다
      return () => eventSource.close()
    }
  }, []) // 의존성 배열이 비어 있으므로 한 번만 실행됩니다.
}

const NotiDropdown = ({
  setHasUnreadNotifications,
  onClose,
}: NotiDropdownProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  // 초기 알림 불러오기
  useEffect(() => {
    const getNotifications = async (read: boolean) => {
      const token = localStorage.getItem('access_token')
      try {
        const response = await axios.get<Notification[]>(
          `https://www.skypedia.shop/api/v1/notify?read=${read}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setNotifications(response.data)
      } catch (error) {
        console.error('알림 조회 실패:', error)
      }
    }
    const isRead = filter === 'unread' ? false : true
    getNotifications(isRead)
  }, [filter])

  // SSE 훅으로 실시간 알림 수신
  useSSE((newNoti) => setNotifications((prev) => [newNoti, ...prev]))

  // 읽지 않은 알림 여부를 부모에게 전달
  useEffect(() => {
    const hasUnread = notifications.some((notification) => !notification.read)
    setHasUnreadNotifications(hasUnread)
  }, [notifications, setHasUnreadNotifications])

  const markAllAsRead = async () => {
    try {
      // 서버에 읽음 상태 업데이트 요청
      await axios.put(
        'https://www.skypedia.shop/api/v1/notify',
        {},
        { withCredentials: true },
      )
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true })),
      )
    } catch (error) {
      console.error('모두 읽음 처리 실패:', error)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case '댓글':
        return (
          <CommentIcon
            width={19}
            height={19}
          />
        )
      case '채팅':
        return (
          <LikeIcon
            width={18}
            height={18}
          />
        )
      case '공지':
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

  return (
    <div className='absolute top-12 right-1 w-[400px] bg-white shadow-lg rounded-lg border border-lightGray z-50 p-4 font-bold'>
      <div className='text-xs text-black'>
        <div className='flex justify-between text-xs text-darkGray p-2'>
          <div className='flex gap-1'>
            <button
              onClick={() => setFilter('all')}
              className={`${filter === 'all' ? 'text-darkBlue' : ''}`}
            >
              전체
            </button>
            <p>|</p>
            <button
              onClick={() => setFilter('unread')}
              className={`${filter === 'unread' ? 'text-darkBlue' : ''}`}
            >
              읽지 않음
            </button>
          </div>
          <button
            onClick={markAllAsRead}
            className='font-normal'
          >
            모두 읽음
          </button>
        </div>

        {notifications.map((notification) => (
          <div
            key={notification.id} // `sentAt` 대신 고유 ID 사용
            className={`flex justify-between items-center p-4 gap-2 cursor-pointer ${
              notification.read ? 'bg-gray-100' : 'bg-white'
            }`}
            onClick={() => onClose()}
          >
            <div className='flex items-center gap-2'>
              {getIcon(notification.type)}
              <p className='text-normal font-bold'>{notification.content}</p>
            </div>
            <p className='w-[50px] text-[10px] text-gray-400'>
              {formatTime(notification.sentAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotiDropdown
