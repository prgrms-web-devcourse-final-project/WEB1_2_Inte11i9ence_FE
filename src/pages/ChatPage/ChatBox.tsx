// import { useEffect, useRef, useState } from 'react'
// import ScrollableContainer from '@/components/Scroll'
// import { messages } from './mockdata'
// import axios from 'axios'
// import defaultProfileImage from '@assets/png/default-profile-2.png'

// const ChatBox = ({ socket, chatRoomId, messages, setMessages }) => {
//   const [newMessage, setNewMessage] = useState('')
//   // 스크롤을 관리할 ref 생성, 스크롤 맨 아래 이동에 사용ㅇ
//   const scrollContainerRef = useRef<HTMLDivElement>(null)
//   useEffect(() => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollTop =
//         scrollContainerRef.current.scrollHeight
//     }
//   }, [])
//   useEffect(() => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollTop =
//         scrollContainerRef.current.scrollHeight
//     }
//   }, [messages])

//   // 메시지 전송
//   const handleSendMessage = async () => {
//     if (newMessage.trim() && socket) {
//       const messageData = {
//         content: newMessage,
//         sender: messages.sender, // 실제 사용자 정보를 사용하도록 변경
//         sentAt: new Date().toISOString(),
//       }

//       socket.send(JSON.stringify(messageData)) // 웹소켓 전송
//       setMessages((prev) => [...prev, messageData]) // 로컬 상태 업데이트
//       setNewMessage('')
//     }
//   }

//   return (
//     <div className='flex flex-col h-[70vh] w-full mx-auto bg-white border shadow'>
//       <div className='flex items-center justify-between bg-lightGrays px-4 py-2 border-b'>
//         <div className='flex items-center gap-2'>
//           <div className='w-8 h-8 rounded-full overflow-hidden'>
//             <img
//               src={messages.profileImage || defaultProfileImage}
//               alt='Profile'
//               className='w-full h-full object-cover'
//             />
//           </div>
//           <p className='font-semibold text-black'>{messages.sender}</p>
//         </div>
//       </div>
//       <ScrollableContainer
//         ref={scrollContainerRef}
//         style={{ height: 'calc(100% - 90px)', overflowY: 'auto' }}
//       >
//         <div className='flex flex-col flex-1 p-4 gap-4'>
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div>
//                 <div
//                   className={`px-4 py-2 rounded-lg text-[13px] ${
//                     msg.sender === 'user'
//                       ? 'bg-darkBlue text-white'
//                       : 'bg-gray-200 text-black'
//                   }`}
//                 >
//                   <p>{msg.content}</p>
//                 </div>
//                 <span
//                   className={`text-xs mt-1 block ${
//                     msg.sender === 'user' ? 'text-right' : 'text-left'
//                   }`}
//                 >
//                   {msg.sentAt}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </ScrollableContainer>

//       <div className='flex items-center gap-2 p-4 border-t bg-gray-50'>
//         <input
//           type='text'
//           placeholder='메시지를 입력하세요...'
//           className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue'
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button
//           className='px-4 py-2 bg-darkBlue text-white rounded-lg hover:bg-blue-600'
//           onClick={handleSendMessage}
//         >
//           전송
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ChatBox
