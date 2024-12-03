import { useState, useEffect } from 'react'
import axios from 'axios'
import { MemberProps } from '@/typings/member'

const useProfile = (token: string) => {
  const [profile, setProfile] = useState<MemberProps>()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          'https://f7c2d6d8-6cd5-46ec-b36b-d4496b4280c6.mock.pstmn.io/api/v1/member/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setProfile(response.data)
      } catch (error) {
        console.error('error', error)
      }
    }

    fetchProfile()
  }, [token])

  return { profile }
}

export default useProfile
