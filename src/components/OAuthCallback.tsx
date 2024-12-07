import { useEffect } from 'react'

const OAuthCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const refreshToken = params.get('refreshToken')

    if (token && refreshToken) {
      localStorage.setItem('access_token', token)
      localStorage.setItem('refresh_token', refreshToken)
      window.location.replace('/') // replace를 사용하여 이전 페이지로 돌아가지 않게 함
    }
  }, [])

  return null // UI를 렌더링하지 않음
}

export default OAuthCallback
