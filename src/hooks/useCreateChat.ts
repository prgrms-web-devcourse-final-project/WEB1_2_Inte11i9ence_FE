import axios from 'axios'
import { useState, useEffect } from 'react'

const useCreateChat = (targetNickName: string) => {
  const [targetId, setTargetId] = useState<string | null>(null)
  useEffect(() => {
    if (!targetNickName) {
      return
    }

    const getTargetId = async () => {
      try {
        const response = await axios.get(
          `https://www.skypedia.shop/api/v1/member/${targetNickName}`,
        )
        setTargetId(response.data.id)
      } catch (error) {
        console.error('ERROR', error)
      }
    }
    getTargetId()
  }, [targetNickName])

  const createChatRoom = async () => {
    const token = localStorage.getItem('access_token')
    try {
      const response = await axios.post(
        `https://www.skypedia.shop/api/v1/chat/room?targetUserId=${targetId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      console.log('채팅방 생성 성공', response.data)
    } catch (error) {
      console.error('ERROR', error)
    }
  }
  return {
    createChatRoom,
    targetId,
  }
}

export default useCreateChat
