import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // React Router 사용 시

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const state = params.get('state')

    if (code && state) {
      // 받은 코드를 서버로 전달하여 토큰 요청
      fetch('https://www.skypedia.shop/api/auth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, state }),
      })
        .then((response) => response.json())
        .then((data) => {
          // 로그인 성공 시 토큰 저장 및 메인 페이지로 이동
          localStorage.setItem('token', data.token)
          navigate('/postlist/region') // 메인 페이지로 이동
        })
        .catch((error) => {
          console.error('Error during OAuth callback:', error)
          navigate('/login') // 에러 시 로그인 페이지로 이동
        })
    } else {
      navigate('/login') // 필요한 정보가 없을 경우 로그인 페이지로 이동
    }
  }, [navigate])

  return <div>로그인 처리 중...</div>
}

export default OAuthCallback
