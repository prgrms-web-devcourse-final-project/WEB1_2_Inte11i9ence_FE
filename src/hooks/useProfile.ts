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
              Authorization: `Bearer ${token}`, // JWT 토큰 추가 근데 이거 로직짜여있다고 하셔서 나중에 뺄수도
            },
          },
        )
        setProfile(response.data)
      } catch (error) {
        console.error('error', error)
      }
    }

    fetchProfile()
  }, [token, profile])

  return { profile, setProfile }
}

export default useProfile
