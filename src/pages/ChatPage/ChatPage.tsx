import defaultProfileImage from '@assets/png/default-profile-2.png'
import ChatBox from './ChatBox'
import axios from 'axios'
import useProfile from '@/hooks/useProfile'
import { useEffect, useState } from 'react'
import { ChatRoom } from '@/typings/chat'

const ChatPage = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]) // 채팅방 목록
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom>() // 선택된 채팅방
  const [myNickName, setMyNickName] = useState('') // 내 닉네임
  const [myId, setMyId] = useState('') // 내 ID
  const token = localStorage.getItem('access_token') || '' // 토큰

  // 내 프로필 가져오기
  const { profile } = useProfile(token)
  useEffect(() => {
    if (profile) {
      setMyNickName(profile.username)
    }
  }, [profile])

  // 채팅방 목록 가져오기
  const getRooms = async () => {
    try {
      const response = await axios.get(
        'https://www.skypedia.shop/api/v1/chat/rooms',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      const rooms = response.data.content

      // 채팅방에 상대방 닉네임을 설정하고, 해당 닉네임에 맞는 프로필 이미지를 가져오기
      const updatedRooms = await Promise.all(
        rooms.map(async (room: ChatRoom) => {
          const otherNickName =
            room.creatorName === myNickName
              ? room.participantName
              : room.creatorName

          // useOtherProfile 훅을 통해 상대방의 프로필 정보를 가져옴
          const { otherProfile } = await getOtherProfile(otherNickName)

          return {
            ...room,
            otherNickName,
            otherProfileImg: otherProfile?.profileImage || defaultProfileImage, // 프로필 이미지 추가
          }
        }),
      )

      setChatRooms(updatedRooms)
    } catch (error) {
      console.error('ERROR', error)
    }
  }

  const getOtherProfile = async (username: string) => {
    try {
      const response = await axios.get(
        `https://www.skypedia.shop/api/v1/member/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      return { otherProfile: response.data }
    } catch (error) {
      console.error('Error fetching other profile', error)
      return { otherProfile: null }
    }
  }

  useEffect(() => {
    getRooms()
  }, [myNickName]) // myNickName이 바뀔 때마다 채팅방 목록을 다시 가져옴

  // 채팅방 선택 처리
  const handleRoomSelect = (room: ChatRoom) => {
    setSelectedRoom(room)
  }

  return (
    <div className='flex justify-center items-center w-full px-20 pt-10'>
      <div className='flex w-[80vw] h-[70vh] items-center justify-center gap-8'>
        <div className='flex flex-col flex-[4.5] h-full gap-6 justify-start items-start'>
          <div>
            <p>
              DM <span className='font-bold'>{chatRooms.length}</span>개
            </p>
          </div>
          <div className='flex flex-col gap-4 overflow-y-auto h-full w-full'>
            {chatRooms.map((room) => {
              return (
                <button
                  key={room.id}
                  className='flex border-b pb-3 w-full'
                  onClick={() => handleRoomSelect(room)}
                >
                  <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <img
                      src={room.otherProfileImg} // 상대방 프로필 이미지
                      alt='Profile'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='ml-4'>
                    <p className='flex items-start text-sm font-bold'>
                      여기 게시글 이름 추가할 거임
                    </p>
                    <p className='flex items-start text-xs text-darkGray truncate'>
                      {room.otherNickName} {/* 상대방 닉네임 출력 */}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
        <div className='flex-[7]'>
          {selectedRoom && (
            <ChatBox
              room={selectedRoom}
              myNickName={myNickName}
              myId={myId}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatPage
