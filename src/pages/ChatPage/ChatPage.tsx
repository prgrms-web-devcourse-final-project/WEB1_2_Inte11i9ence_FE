import defaultProfileImage from '@assets/png/default-profile-2.png'
import ChatBox from './ChatBox'
import ScrollableContainer from '@/components/Scroll'
import { chats } from './mockdata'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {
  // const [chatList, setChatList] = useState([])
  // const [currentChatRoomId, setCurrentChatRoomId] = useState<number | null>(
  //   null,
  // )
  // const [messages, setMessages] = useState([])
  // const [socket, setSocket] = useState<WebSocket | null>(null)
  // //채팅방 목록 가져오기
  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       const response = await axios.get('api/v1/chat/chatRoom')
  //       setChatList(response.data)
  //     } catch (error) {
  //       console.error('채팅방 목록을 가져오는 데 실패했습니다', error)
  //     }
  //   }
  //   fetchChats()
  // }, [])
  // // 선택된 채팅방 메시지 가져오기
  // useEffect(() => {
  //   if (currentChatRoomId) {
  //     const fetchMessages = async () => {
  //       try {
  //         const response = await axios.get(`/api/v1/chat/${currentChatRoomId}`)
  //         setMessages(response.data)
  //       } catch (error) {
  //         console.error('채팅 메시지를 가져오는 데 실패했습니다', error)
  //       }
  //     }
  //     fetchMessages()
  //   }
  // }, [currentChatRoomId])
  // // 웹소켓 연결
  // useEffect(() => {
  //   if (currentChatRoomId) {
  //     const socket = new WebSocket(
  //       `ws://localhost:8080/chat-room/${currentChatRoomId}`,
  //     )
  //     socket.onopen = () => {
  //       console.log('웹소켓 연결 성공')
  //     }
  //     socket.onmessage = (event) => {
  //       const message = JSON.parse(event.data)
  //       // 새로운 메시지를 받은 후 처리 (ChatBox에 전달 등)
  //       setMessages((prevMessages) => [...prevMessages, message]) // 실시간 메시지 추가
  //     }
  //     socket.onclose = () => {
  //       console.log('웹소켓 연결 종료')
  //     }
  //     setSocket(socket)
  //     return () => {
  //       if (socket) {
  //         socket.close()
  //       }
  //     }
  //   }
  // }, [currentChatRoomId])
  // //채팅방 클릭 시 해당 방의 채팅 열림
  // const handleChatRoomClick = (currentChatRoomId: number) => {
  //   setCurrentChatRoomId(currentChatRoomId)
  // }
  // return (
  //   <div className='flex justify-center items-center w-full'>
  //     <div className='flex w-[80vw] h-[70vh] items-center justify-center gap-16'>
  //       <div className='flex flex-col flex-[4] h-full gap-6 justify-start items-start'>
  //         <div>
  //           <p>
  //             DM <span className='font-bold'>{chatList.length}</span>개
  //           </p>
  //         </div>
  //         <ScrollableContainer style={{ height: 'calc(100% - 40px)' }}>
  //           <div className='flex flex-col gap-4'>
  //             {chatList.map((chat) => (
  //               <button
  //                 key={chat.id}
  //                 className='flex border-b pb-3  w-full'
  //                 onClick={() => handleChatRoomClick(chat.id)}
  //               >
  //                 <div className='w-8 h-8 rounded-full overflow-hidden'>
  //                   <img
  //                     src={chat.profileImage || defaultProfileImage}
  //                     alt='Profile'
  //                     className='w-full h-full object-cover'
  //                   />
  //                 </div>{' '}
  //                 <div className='ml-4'>
  //                   <p className='flex items-start text-sm font-bold'>
  //                     {chat.content}
  //                   </p>
  //                   <p className=' flex items-start text-xs text-darkGray truncate'>
  //                     {chat.nickname}
  //                   </p>
  //                 </div>
  //               </button>
  //             ))}
  //           </div>
  //         </ScrollableContainer>
  //       </div>
  //       <div className='flex-[7]'>
  //         {currentChatRoomId && (
  //           <ChatBox
  //             socket={socket}
  //             chatRoomId={currentChatRoomId}
  //             messages={messages}
  //             setMessages={setMessages}
  //           />
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // )
}
export default ChatPage
