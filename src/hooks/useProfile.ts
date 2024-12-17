import { useState, useEffect } from 'react'
import axios from 'axios'
import { MemberProps } from '@/typings/member'

const useProfile = (token: string) => {
  const [profile, setProfile] = useState<MemberProps>()
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          'https://www.skypedia.shop/api/v1/member/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setProfile(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('error', error)
      }
    }

    fetchProfile()
  }, [token])

  return { profile, setProfile }
}

export default useProfile
