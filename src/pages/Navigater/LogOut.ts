export const onLogout = async () => {
  try {
    const response = await fetch('/logout', {
      method: 'POST',
      credentials: 'include', // 쿠키 포함
    })

    if (response.ok) {
      // 로그아웃 성공 시 처리 (예: 로그인 페이지로 이동)
      window.location.href = '/login'
    } else {
      // 로그아웃 실패 시 처리
      const errorData = await response.json()
      alert(errorData.message || 'Logout failed')
    }
  } catch (error) {
    alert('Network error. Please try again.')
  }
}
//일단 수호님이 프론트 테스트 하신 코드 넣음
//aws 서버 경로가 나온 후 axios사용해서 수정 필요
