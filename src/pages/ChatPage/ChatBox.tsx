import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import { ChatBoxProps, Message } from '@/typings/chat'
import { formatTime, groupMessagesByDate } from '@/utils/chatFormatTime'

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
          },
        },
      )
      setMessages(response.data.content || [])
    } catch (error) {
      console.error('ERROR', error)
      setMessages([])
    }
  }

  useEffect(() => {
    if (room) {
      getMessages()
    }
  }, [room])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'auto',
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

  const groupedMessages = groupMessagesByDate(messages)

  const handleDelete = async () => {
    const token = localStorage.getItem('access_token')
    const confirmDelete = window.confirm('삭제 하시겠습니까?')

    if (confirmDelete) {
      try {
        await axios.delete(
          `https://www.skypedia.shop/api/v1/chat/room/${room.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        alert('삭제 완료되었습니다.')
        window.location.reload()
      } catch (error) {
        console.error('error', error)
        alert('삭제 중 오류가 발생했습니다.')
      }
    }
  }

  return (
    <div className='flex flex-col rounded-xl h-[78vh] mt-20 w-full mx-auto bg-white border shadow'>
      <div className='flex items-center justify-between bg-lightGrays px-4 py-2 border-b'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex gap-2 items-center  '>
            <div className='w-8 h- rounded-full overflow-hidden'>
              <img
                src={room.otherProfileImg || defaultProfileImage}
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='flex w-full justify-between'>
              <p className='font-semibold text-[14px] text-black'>
                {room.otherNickName}
              </p>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className='text-red-500 text-[14px]'
          >
            삭제
          </button>
        </div>
      </div>

      <div className='flex flex-col flex-1 p-4 gap-4 custom-scroll'>
        {Object.keys(groupedMessages)
          .reverse()
          .map((dateStr) => (
            <div key={dateStr}>
              <div className='text-center text-darkGray text-[14px] mt-4 mb-2'>
                {dateStr}
              </div>
              {groupedMessages[dateStr]
                .slice()
                .reverse()
                .map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === myId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className='flex flex-col'>
                      <div
                        className={`flex inline-flex px-3 py-1 rounded-lg text-[13px] ${
                          msg.senderId === myId
                            ? 'bg-darkBlue text-white'
                            : 'bg-gray-200 text-black'
                        }`}
                      >
                        <p>{msg.content}</p>
                      </div>
                      <span
                        className={`text-[11px] my-1 ${
                          msg.senderId === myId ? 'text-right' : 'text-left'
                        }`}
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
          className='flex-1 px-3 py-1 text-[14px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue'
        />
        <button
          onClick={sendMessage}
          className='px-3 py-1 bg-darkBlue text-[14px] text-white rounded-lg hover:bg-blue-600'
        >
          전송
        </button>
      </div>
    </div>
  )
}

export default ChatBox
