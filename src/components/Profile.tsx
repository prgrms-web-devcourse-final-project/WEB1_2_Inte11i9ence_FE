import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import useProfile from '@/hooks/useProfile'

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
  const token = localStorage.getItem('access_token')
  // useProfile 훅 사용
  const { setProfile } = useProfile(token || '')

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

  // 'File'을 배열로 수정
  const handleSave = async () => {
    const requestBody: { username?: string; profileURL?: string } = {}

    // 닉네임 변경
    if (nickname !== username) {
      requestBody.username = nickname
    }

    // 프로필 이미지 변경 (Base64로 변환하여 전송)
    if (newProfileImage) {
      // 1. S3 Presigned URL 요청 (newProfileImage를 배열로 전달)
      const presignedUrls = await fetchPresignedUrl([newProfileImage]) // 배열로 전달

      // 2. 이미지 업로드
      const uploadSuccess = await uploadImageToS3(
        presignedUrls[0],
        newProfileImage,
      ) // 첫 번째 URL 사용

      if (uploadSuccess) {
        requestBody.profileURL = presignedUrls[0] // 프로필 이미지 URL 업데이트
        sendRequest(requestBody)
      } else {
        console.error('Image upload failed')
      }
    } else {
      await sendRequest(requestBody)
      setProfile(undefined)
      onClose()
    }
  }

  // S3에 이미지 업로드
  const uploadImageToS3 = async (presignedUrl: string, file: File) => {
    if (!presignedUrl) {
      return false
    }

    try {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type, // 파일 타입 설정
        },
        body: file, // 업로드할 파일
      })

      return response.ok
    } catch (error) {
      console.error('Error uploading image to S3:', error)
      return false
    }
  }

  // fetchPresignedUrl 함수는 이미 올바르게 배열을 반환하는 코드로 수정됨
  const fetchPresignedUrl = async (files: File[]): Promise<string[]> => {
    // Validate MIME type (image validation)
    const validMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ] // Add more MIME types as necessary
    const invalidFiles = files.filter(
      (file) => !validMimeTypes.includes(file.type),
    )

    if (invalidFiles.length > 0) {
      console.error('Invalid file types detected')
      throw new Error('Invalid file types')
    }

    // Prepare the form data for the presigned URL request
    const formData = files.map((file) => ({
      originalFileName: file.name,
      contentType: file.type,
    }))

    try {
      const response = await axios.post(
        'https://www.skypedia.shop/api/v1/photo',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      const presignedUrls: string[] = response.data

      if (!Array.isArray(presignedUrls)) {
        throw new Error(
          'Invalid response format: Expected an array of presigned URLs',
        )
      }

      return presignedUrls
    } catch (error) {
      console.error('Error fetching presigned URL:', error)
      throw new Error('Image upload failed')
    }
  }

  // 요청 보내기
  const sendRequest = async (requestBody: {
    username?: string
    profileURL?: string
  }) => {
    try {
      const response = await axios.put(
        'https://www.skypedia.shop/api/v1/member/me',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      console.log('Updated user info:', response.data)
      console.log(response.data) // 응답 본문 확인
      setProfile(response.data) // 프로필 정보 업데이트
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
