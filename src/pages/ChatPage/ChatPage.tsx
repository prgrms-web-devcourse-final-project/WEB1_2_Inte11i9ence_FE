import defaultProfileImage from '@assets/png/default-profile-2.png'
import ChatBox from './ChatBox'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ChatPage = () => {
  const [chatRooms, setChatRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [myNickName, setMyNickName] = useState('')
  const [myId, setMyId] = useState('')
  const getMyNickName = async () => {
    const token = localStorage.getItem('access_token')

    try {
      const response = await axios.get(
        'https://www.skypedia.shop/api/v1/member/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      setMyNickName(response.data.nickName)
      setMyId(response.data.id)
    } catch (error) {
      console.error('ERROR', error)
    }
  }
  useEffect(() => {
    getMyNickName()
  }, [])

  const getRooms = async () => {
    const token = localStorage.getItem('access_token')
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
      setChatRooms(response.data.content)
    } catch (error) {
      console.error('ERROR', error)
    }
  }

  useEffect(() => {
    getRooms()
    console.log(chatRooms)
  }, [])
  const handleRoomSelect = (room) => {
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
            {chatRooms.map((room) => (
              <button
                key={room.id}
                className='flex border-b pb-3  w-full'
                onClick={() => handleRoomSelect(room)}
              >
                <div className='w-8 h-8 rounded-full overflow-hidden'>
                  <img
                    src={room.profileUrl || defaultProfileImage}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                </div>{' '}
                <div className='ml-4'>
                  <p className='flex items-start text-sm font-bold'>
                    여기 게시글 이름 추가할 거임
                  </p>
                  <p className=' flex items-start text-xs text-darkGray truncate'>
                    {myNickName === room.creatorName
                      ? room.creatorName
                      : room.participantName}{' '}
                  </p>
                </div>
              </button>
            ))}
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
