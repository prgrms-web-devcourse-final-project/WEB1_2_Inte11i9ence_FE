import './scroll.css' // 스크롤 스타일링
import { useEffect, useState } from 'react'
import axios from 'axios'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs' // WebSocket 클라이언트 라이브러리
import { ChatRoom } from '@/typings/chat'
import defaultProfileImage from '@assets/png/default-profile-2.png'

interface Message {
  id: string
  content: string
  senderId: string
  createdAt: string
}

interface ChatBoxProps {
  room: ChatRoom
  myNickName: string
  myId: number
}

const ChatBox = ({ room, myNickName, myId }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]) // 메시지 상태 관리
  const [newMessage, setNewMessage] = useState('') // 새 메시지 입력 상태
  const [client, setClient] = useState<Client | null>(null) // WebSocket 클라이언트 상태

  // 메시지 목록 가져오기 함수
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
      setMessages(response.data || []) // 응답 데이터 설정 (빈 배열 대체)
    } catch (error) {
      console.error('ERROR', error)
      setMessages([]) // 오류 발생 시 빈 배열로 초기화
    }
  }
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

        stompClient.subscribe(
          `/sub/chat/room/${room.id}/status`,
          (statusMessage) => {
            const status = JSON.parse(statusMessage.body)
            if (status === 'DELETED' || status === 'BLOCKED') {
              console.log('채팅방이 삭제되었거나 차단되었습니다.')
            }
          },
        )
      }

      stompClient.onDisconnect = () => {
        console.log('WebSocket 연결이 종료되었습니다.')
      }

      stompClient.activate()
      setClient(stompClient)

      // cleanup function to deactivate client when component unmounts or room changes
      return () => {
        if (stompClient && stompClient.active) {
          stompClient.deactivate() // 연결이 활성화되었을 때만 종료
          console.log('WebSocket 연결이 종료되었습니다.')
        }
      }
    }
  }, [room]) // room이 변경될 때마다 새로운 WebSocket 연결을 시작합니다.

  // 메시지 가져오기 실행
  useEffect(() => {
    if (room) {
      getMessages()
    }
  }, [room])

  // 메시지 전송 함수
  const sendMessage = () => {
    if (!client || !client.active) {
      console.log('WebSocket 클라이언트가 연결되지 않았습니다.')
      return
    }

    // 값들 출력해보기
    console.log('room.id:', room.id)
    console.log('newMessage:', newMessage)
    console.log('userId:', myId)

    // 데이터가 유효한지 체크
    if (!room.id || !newMessage.trim() || !myId) {
      console.log('메시지 전송에 필요한 데이터가 부족합니다.')
      return // 데이터 부족 시 종료
    }

    // 메시지 전송
    try {
      client.publish({
        destination: `/pub/chat/message`, // WebSocket 경로 수정
        body: JSON.stringify({
          roomId: room.id,
          content: newMessage,
          senderId: myId,
        }),
      })

      console.log('메시지가 성공적으로 전송되었습니다.')
      setNewMessage('') // 메시지 전송 후 초기화
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error)
    }
  }

  return (
    <div className='flex flex-col h-[78vh] mt-20 w-full mx-auto bg-white border shadow custom-scroll'>
      {/* 상단 채팅방 정보 */}
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

      {/* 메시지 목록 */}
      <div className='flex flex-col flex-1 p-4 gap-4 overflow-y-auto'>
        {Array.isArray(messages) && messages.length === 0 ? (
          <p className='text-center text-gray-500'>메시지가 비어 있습니다.</p>
        ) : (
          Array.isArray(messages) &&
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === room.creatorId ? 'justify-end' : 'justify-start'}`}
            >
              <div>
                <div
                  className={`px-4 py-2 rounded-lg text-[13px] ${msg.senderId === room.creatorId ? 'bg-darkBlue text-white' : 'bg-gray-200 text-black'}`}
                >
                  <p>{msg.content}</p>
                </div>
                <span
                  className={`text-xs mt-1 block ${msg.senderId === room.creatorId ? 'text-right' : 'text-left'}`}
                >
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 입력창 및 전송 버튼 */}
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
