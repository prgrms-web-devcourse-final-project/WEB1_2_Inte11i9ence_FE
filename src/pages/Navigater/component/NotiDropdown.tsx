import { useState, useEffect } from 'react'
import CommentIcon from '@assets/svg/Comment.svg?react'
import LikeIcon from '@assets/svg/Like.svg?react'
import AnnouncementIcon from '@assets/svg/Announcement.svg?react'
import axios from 'axios'
import formatTime from '@/utils/formatTime'
import { Notification } from '@/typings/noti'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { useNavigate } from 'react-router-dom'

interface NotiDropdownProps {
  onClose: () => void
}

const useSSE = (addNotification: (newNoti: Notification) => void) => {
  useEffect(() => {
    const token = localStorage.getItem('access_token') // 저장된 토큰 가져오기
    const EventSource = EventSourcePolyfill || NativeEventSource
    if (token) {
      const lastEventId = sessionStorage.getItem('Last-Event-Id') || ''
      const eventSource = new EventSource(
        `https://www.skypedia.shop/api/v1/notify/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Last-Event-Id': lastEventId,
          },
        },
      )

      eventSource.onopen = () => {
        console.log('SSE 연결 성공')
      }

      eventSource.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data)
          console.log('새 알림 수신:', parsedData)
          addNotification(parsedData)

          sessionStorage.setItem('Last-Event-Id', event.lastEventId)
        } catch (error) {
          console.error('알림 파싱 실패:', error)
        }
      }

      eventSource.onerror = (error) => {
        console.error('SSE 연결 에러 발생:', error)
        eventSource.close()
      }

      return () => eventSource.close()
    }
  }, [])
}

const NotiDropdown = ({ onClose }: NotiDropdownProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const token = localStorage.getItem('access_token')
  const navigate = useNavigate()

  const fetchNotifications = async (filter: 'all' | 'unread') => {
    const url =
      filter === 'all'
        ? 'https://www.skypedia.shop/api/v1/notify'
        : 'https://www.skypedia.shop/api/v1/notify?read=true'
    try {
      const response = await axios.get<Notification[]>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setNotifications(response.data)
      console.log(response.data)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setNotifications([])
      } else {
        console.error('알림 조회 실패:', error)
      }
    }
  }
  useEffect(() => {
    fetchNotifications(filter)
  }, [filter])

  useSSE((newNoti) => setNotifications((prev) => [newNoti, ...prev]))

  const markAllAsRead = async () => {
    try {
      await axios.post(
        'https://www.skypedia.shop/api/v1/notify',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true })),
      )
    } catch (error) {
      console.error('모두 읽음 처리 실패:', error)
    }
  }

  const clickNotify = async (uri: string, id: number) => {
    const notifyNum = uri.split('post/')[1]
    navigate(`/post/${notifyNum}`)
    onClose()
    try {
      await axios.post(
        `https://www.skypedia.shop/api/v1/notify/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    } catch (error) {
      console.error('ERROR', error)
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
    <div className='absolute top-12 right-1 w-[400px] bg-white shadow-lg rounded-lg border border-lightGray z-50 p-4 pr-0 font-bold'>
      <div
        className='text-xs text-black overflow-y-auto overflow-x-hidden custom-scroll  '
        style={{ maxHeight: '15rem' }}
      >
        <div className='flex justify-between text-xs text-darkGray p-2 '>
          <div className='flex gap-1'>
            <button
              onClick={() => setFilter('all')}
              className={`${filter === 'all' ? 'text-darkBlue' : ''}`}
            >
              읽지 않음
            </button>
            <p>|</p>
            <button
              onClick={() => setFilter('unread')}
              className={`${filter === 'unread' ? 'text-darkBlue' : ''}`}
            >
              읽음
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
            key={notification.sentAt}
            className={`flex justify-between items-center p-4 gap-2 cursor-pointer  ${
              notification.viewed ? 'bg-gray-100' : 'bg-white'
            }`}
            onClick={() => clickNotify(notification.uri, notification.id)}
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
