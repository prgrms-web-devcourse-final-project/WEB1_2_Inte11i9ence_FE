// S3PresignedUploader 컴포넌트
import { useState } from 'react'

interface S3PresignedUploaderProps {
  photoUrls: string[] // S3로 업로드할 URL 배열
}

const S3PresignedUploader = ({ photoUrls }: S3PresignedUploaderProps) => {
  const [file, setFile] = useState<File | null>(null) // 선택된 파일 상태
  const [uploadStatus, setUploadStatus] = useState('') // 업로드 상태 메시지

  // 파일 선택 이벤트 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null)
  }

  // S3 업로드 요청 핸들러
  const handleUpload = async (url: string) => {
    if (!file) {
      alert('Please select a file first.')
      return
    }

    try {
      // S3로 PUT 요청 보내기
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type, // 파일 타입 설정
        },
        body: file, // 업로드할 파일
      })

      if (response.ok) {
        setUploadStatus(`File "${file.name}" uploaded successfully!`)
      } else {
        setUploadStatus(
          `Failed to upload file "${file.name}". Please check the URL and try again.`,
        )
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      setUploadStatus('Error uploading file. Please try again.')
    }
  }

  return (
    <div>
      <h1>S3 Presigned URL Uploader</h1>
      <input
        type='file'
        onChange={handleFileChange}
      />
      <div>
        {photoUrls.map((url, index) => (
          <div key={index}>
            <button onClick={() => handleUpload(url)}>Upload to S3</button>
          </div>
        ))}
      </div>
      <p>{uploadStatus}</p>
    </div>
  )
}

export default S3PresignedUploader
