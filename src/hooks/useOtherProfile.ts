import { MemberProps } from '@/typings/member'
import axios from 'axios'
import { error } from 'console'
import { useState, useEffect } from 'react'

const useOtherProfile = (username: string, token: string) => {
  const [otherProfile, setOtherProfile] = useState<MemberProps>()

  useEffect(() => {
    const getOtherProfile = async () => {
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
        setOtherProfile(response.data)
      } catch {
        console.error('Error', error)
      }
    }
    getOtherProfile()
  }, [username, token])
  return { otherProfile }
}

export default useOtherProfile
