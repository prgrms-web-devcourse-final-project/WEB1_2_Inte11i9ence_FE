import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { ChatRoom } from '@/typings/chat'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import './scroll.css'

interface Message {
  id: string
  content: string
  senderId: number
  createdAt: string
}

interface ChatBoxProps {
  room: ChatRoom
  myId: number | undefined
}

const ChatBox = ({ room, myId }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [client, setClient] = useState<Client | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const getMessages = async () => {
    const token = localStorage.getItem('access_token')
    try {
      const response = await axios.get(
        `https://www.skypedia.shop/api/v1/chat/room/${room.id}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      setMessages(response.data.content || [])
    } catch (error) {
      console.error('ERROR', error)
      setMessages([])
    }
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (room) {
      const token = localStorage.getItem('access_token')
      if (!token) {
        console.error('토큰이 없습니다. WebSocket 연결을 시작할 수 없습니다.')
        return
      }
      const socket = new SockJS('https://www.skypedia.shop/ws-stomp')
      const stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        debug: (str) => {
          console.log('WebSocket Debug:', str)
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      })

      stompClient.onConnect = () => {
        console.log('WebSocket에 연결되었습니다.')
        stompClient.subscribe(`/sub/chat/room/${room.id}`, (message) => {
          const receivedMessage = JSON.parse(message.body)
          setMessages((prev) => [...prev, receivedMessage])
        })
      }

      stompClient.onDisconnect = () => {
        console.log('WebSocket 연결이 종료되었습니다.')
      }

      stompClient.activate()
      setClient(stompClient)

      return () => {
        if (stompClient && stompClient.active) {
          stompClient.deactivate()
        }
      }
    }
  }, [room])

  useEffect(() => {
    if (room) {
      getMessages()
    }
  }, [room])

  const sendMessage = () => {
    if (!client || !client.active) {
      console.log('WebSocket 클라이언트가 연결되지 않았습니다.')
      return
    }
    try {
      client.publish({
        destination: `/pub/chat/message`,
        body: JSON.stringify({
          roomId: room.id,
          content: newMessage,
          senderId: myId,
        }),
      })
      setNewMessage('')
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error)
    }
  }

  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  const groupMessagesByDate = (messages: Message[]) => {
    const grouped: { [key: string]: Message[] } = {}
    messages.forEach((msg) => {
      const date = new Date(msg.createdAt)
      const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      if (!grouped[dateStr]) {
        grouped[dateStr] = []
      }
      grouped[dateStr].push(msg)
    })
    return grouped
  }

  const groupedMessages = groupMessagesByDate(messages)

  return (
    <div className='flex flex-col h-[78vh] mt-20 w-full mx-auto bg-white border shadow'>
      <div className='flex items-center justify-between bg-lightGrays px-4 py-2 border-b'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full overflow-hidden'>
            <img
              src={room.otherProfileImg || defaultProfileImage}
              alt='Profile'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex w-full justify-between'>
            <p className='font-semibold text-black'>{room.otherNickName}</p>
            <p className='font-semibold text-black'>| 게시글이름추가</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col flex-1 p-4 gap-4 custom-scroll'>
        {Object.keys(groupedMessages).map((dateStr) => (
          <div key={dateStr}>
            <div className='text-center text-gray-400 mt-4 mb-2'>{dateStr}</div>
            {groupedMessages[dateStr].map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === myId ? 'justify-end' : 'justify-start'}`}
              >
                <div className='flex flex-col'>
                  <div
                    className={`flex inline-flex px-4 py-2 rounded-lg text-[13px] ${
                      msg.senderId === myId
                        ? 'bg-darkBlue text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    <p>{msg.content}</p>
                  </div>
                  <span
                    className={`text-[11px] my-1 ${msg.senderId === myId ? 'text-right' : 'text-left'}`}
                  >
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className='flex items-center gap-2 p-4 border-t bg-gray-50'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='메시지를 입력하세요...'
          className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue'
        />
        <button
          onClick={sendMessage}
          className='px-4 py-2 bg-darkBlue text-white rounded-lg hover:bg-blue-600'
        >
          전송
        </button>
      </div>
    </div>
  )
}

export default ChatBox
