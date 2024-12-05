export const onLogout = () => {
  fetch('http://www.skypedia.shop:80/logout', {
    method: 'POST',
    credentials: 'include', // 쿠키를 포함시켜서 요청
  })
    .then((response) => {
      if (response.ok) {
        // 로그아웃 성공 후 로그인 페이지로 리디렉션
        window.location.href = '/' // 로그인 페이지로 이동
      } else {
        alert('Logout failed')
      }
    })
    .catch((error) => console.error('Logout failed', error))
}
