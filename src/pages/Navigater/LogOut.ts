const onLogout = async () => {
  try {
    await fetch('https://www.skypedia.shop/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    localStorage.clear()
    alert('로그아웃되었습니다.')
    window.location.href = '/'
  } catch (err) {
    console.error(err)
    alert('로그아웃 실패')
  }
}

export default onLogout
