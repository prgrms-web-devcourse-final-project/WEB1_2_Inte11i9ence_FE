import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import defaultProfileImage from '@assets/png/default-profile-2.png'

interface ProfileProps {
  title: string
  userProfileImage: string | null
  username: string
  onClose: () => void
}

const Profile: React.FC<ProfileProps> = ({
  title,
  userProfileImage,
  username,
  onClose,
}) => {
  const [nickname, setNickname] = useState(username)
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(
    userProfileImage,
  )

  // 이미지 업로드
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewProfileImage(file)
      setPreviewImage(URL.createObjectURL(file)) // 미리보기 이미지
    }
  }

  // 닉네임 중복 체크
  const handleNicknameChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value
    setNickname(value)
  }

  // 완료 버튼 클릭
  const handleSave = async () => {
    const formData = new FormData()
    if (nickname !== username) {
      formData.append('username', nickname) // 닉네임 변경
    }
    if (newProfileImage) {
      formData.append('profileImage', newProfileImage) // 프로필 이미지 변경
    }

    try {
      const response = await axios.put('/api/v1/member/me', formData, {
        headers: {
          Authorization: `Bearer 123`, // JWT 토큰 추가 근데 이거 로직짜여있다고 하셔서 나중에 뺄수도
        },
      })
      console.log('Updated user info:', response.data)
      onClose() // 프로필 업데이트 후 모달 닫기
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  useEffect(() => {
    setNickname(username)
  }, [username])

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div
      onClick={handleModalClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '27px',
          width: '400px',
          padding: '40px',
          borderRadius: '15px',
          backgroundColor: '#fff', // 카드 배경 흰색
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // 약간의 그림자 추가
          zIndex: 1001, // 모달 자체가 배경보다 위에 보이도록 설정
        }}
      >
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#1C2B59',
            marginBottom: '20px',
          }}
        >
          프로필 <span>{title}</span>
        </h1>

        {/* 프로필 사진 */}
        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className='flex justify-center items-center w-20 h-20 rounded-full overflow-hidden bg-gray-200 '>
            <img
              src={previewImage || defaultProfileImage}
              alt='Profile'
              className='w-full h-full object-cover object-center'
            />
          </div>
          <label
            style={{
              marginTop: '10px',
              backgroundColor: '#E5E5E5',
              border: 'none',
              borderRadius: '5px',
              padding: '2px 10px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            이미지 업로드
            <input
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* 닉네임 입력 */}
        <div style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
          <label
            htmlFor='nickname'
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#1C2B59',
              marginBottom: '5px',
            }}
          >
            닉네임
          </label>
          <input
            id='nickname'
            type='text'
            value={nickname}
            onChange={handleNicknameChange}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              outline: 'none',
            }}
          />
        </div>

        {/* 버튼 */}
        <div className='flex justify-center gap-4 h-[4vh] items-center'>
          <button
            onClick={onClose}
            className='bg-darkBlue text-white text-sm py-2 px-2 rounded-lg '
          >
            취소
          </button>
          <button
            className='bg-darkBlue text-white text-sm py-2 px-2 rounded-lg '
            onClick={handleSave}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(modalContent, document.body)
}

export default Profile
