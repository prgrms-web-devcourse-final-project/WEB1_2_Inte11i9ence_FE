import React, { useEffect } from 'react'
// import axios from 'axios'
import Google from '../assets/png/Google.png'
import Naver from '../assets/png/Naver.png'

interface MainLoginProps {
  closeModal: () => void
}

const MainLogin: React.FC<MainLoginProps> = ({ closeModal }) => {
  const onLogin = (platform: 'google' | 'naver') => {
    window.location.href = `https://www.skypedia.shop/oauth2/authorization/${platform}`
  }

  // 로그인 성공 후 토큰을 처리하는 함수
  const handleToken = async () => {
    // 현재 페이지에 토큰이 담긴 JSON 응답이 오면 처리
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token') // 토큰이 URL 파라미터로 전달된다고 가정
    const response = '{"access_token":"xyz12345", "expires_in":3600}'
    const tokenData = JSON.parse(response)
    const accessToken = tokenData.access_token // access_token 추출

    console.log(accessToken) // 액세스 토큰을 추출하여 사용
    if (token) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('access_token', token)

      // 이제 토큰을 사용하여 API 호출 등 작업을 수행할 수 있습니다.
      console.log('토큰 저장됨:', token)
    }
    // 화면에 표시된 JSON을 JavaScript 객체로 변환
  }

  useEffect(() => {
    handleToken() // 컴포넌트가 렌더링될 때 토큰을 처리
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2F2F2F',
      }}
    >
      <div
        style={{
          width: '360px',
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '25px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#1C2B59',
          }}
        >
          나의 여행 기록을 남기고
          <br />
          경험을 나누는 공간
        </h2>
        <h1
          style={{
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#1C2B59',
            marginBottom: '100px',
          }}
        >
          Logo
        </h1>
        {/* 구글 로그인 버튼 */}
        <button
          onClick={() => onLogin('google')}
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <img
            src={Google}
            alt='Google Icon'
            style={{ marginRight: '10px', height: '40px' }}
          />
          <span>Google로 시작하기</span>
        </button>

        {/* 네이버 로그인 버튼 */}
        <button
          onClick={() => onLogin('naver')}
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#03C75A',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <img
            src={Naver}
            alt='Naver Icon'
            style={{ marginRight: '10px', height: '40px' }}
          />
          네이버로 시작하기
        </button>

        <p
          style={{
            fontSize: '12px',
            color: '#555',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={closeModal}
        >
          조금 더 둘러보고싶어요
        </p>
      </div>
    </div>
  )
}

export default MainLogin
