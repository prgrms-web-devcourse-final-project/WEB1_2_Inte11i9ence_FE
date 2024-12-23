import defaultProfileImage from '@assets/png/default-profile-2.png'
import ChatBox from './ChatBox'
import axios from 'axios'
import useProfile from '@/hooks/useProfile'
import { useEffect, useState } from 'react'
import { ChatRoom } from '@/typings/chat'

const ChatPage = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom>()
  const [myNickName, setMyNickName] = useState('')
  const [myId, setMyId] = useState<number>()
  const token = localStorage.getItem('access_token') || ''

  const { profile } = useProfile(token)
  useEffect(() => {
    if (profile) {
      setMyNickName(profile.username)
      setMyId(profile.id)
    }
  }, [profile])

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

      const updatedRooms = await Promise.all(
        rooms.map(async (room: ChatRoom) => {
          const otherNickName =
            room.creatorName === myNickName
              ? room.participantName
              : room.creatorName

          const { otherProfile } = await getOtherProfile(otherNickName)

          return {
            ...room,
            otherNickName,
            otherProfileImg: otherProfile?.profileImage || defaultProfileImage,
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
  }, [myNickName])

  const handleRoomSelect = (room: ChatRoom) => {
    setSelectedRoom(room)
  }

  return (
    <div className='flex justify-center items-center w-full px-20 '>
      <div className='flex w-[80vw] h-[70vh] items-center justify-center gap-8'>
        <div className='flex flex-col flex-[3] h-full gap-6 justify-start items-start'>
          <div>
            <p className='text-[14px]'>
              DM <span className='font-bold'>{chatRooms.length}</span>개
            </p>
          </div>
          <div className='flex flex-col overflow-y-auto h-full w-full'>
            {chatRooms.map((room) => {
              const isSelected = selectedRoom?.id === room.id

              return (
                <button
                  key={room.id}
                  className={`flex border-b border-transparent py-3 pl-2 w-full align-center ${
                    isSelected
                      ? 'border-l-4 border-l-darkBlue'
                      : 'border-l-4 border-l-transparent'
                  }`}
                  onClick={() => handleRoomSelect(room)}
                >
                  <div className='w-6 h-6 rounded-full overflow-hidden'>
                    <img
                      src={room.otherProfileImg}
                      alt='Profile'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='ml-4 flex mt-1'>
                    <p className='flex items-start align-center text-xs text-black font-bold truncate'>
                      {room.otherNickName}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
        <div className='flex-[7] flex  justify-center items-center'>
          {selectedRoom ? (
            <ChatBox
              room={selectedRoom}
              myId={myId}
            />
          ) : (
            <div className='flex justify-center mt-20 rounded-xl items-center h-[78vh] w-full mx-auto bg-white border shadow text-darkGray '>
              채팅방을 누르고 채팅을 시작해보세요
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatPage
