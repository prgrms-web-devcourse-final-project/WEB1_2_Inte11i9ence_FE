import { useState } from 'react'
import axios from 'axios'

const PhotoAdd = () => {
  const [thumbnail1, setThumbnail1] = useState<File | null>(null)
  const [thumbnail2, setThumbnail2] = useState<File | null>(null)
  const [content, setContent] = useState('')
  const token = localStorage.getItem('access_token')

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const truncateFileName = (name: string) =>
    name.length > 20 ? `${name.slice(0, 20)}...` : name

  const handleSubmit = async () => {
    if (!thumbnail1 || !thumbnail2 || !content) {
      alert('모든 필드를 입력하세요!')
      return
    }

    try {
      const response = await axios.post(
        'https://www.skypedia.shop/api/v1/select-post?memberId=4',
        {
          content: content,
          uploads: [
            { originalFileName: thumbnail1.name, contentType: thumbnail1.type },
            { originalFileName: thumbnail2.name, contentType: thumbnail2.type },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      console.log('서버 응답:', response.data)

      const uploads = response.data
      if (!uploads || uploads.length !== 2) {
        alert('파일 업로드를 위한 URL을 받지 못했습니다.')
        return
      }

      const uploadPromises = [
        uploadToS3(thumbnail1, uploads[0].photoUrl),
        uploadToS3(thumbnail2, uploads[1].photoUrl),
      ]

      await Promise.all(uploadPromises)

      alert('게시글이 성공적으로 업로드되었습니다!')
    } catch (error) {
      console.error('업로드 실패:', error)
    }
  }

  const uploadToS3 = async (file: File, url: string) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      })

      if (!response.ok) {
        throw new Error(`파일 "${file.name}" 업로드 실패.`)
      }

      console.log(`파일 "${file.name}" 업로드 성공!`)
    } catch (error) {
      console.error(`파일 "${file.name}" 업로드 중 오류 발생:`, error)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col flex-[4] relative gap-4'>
        <div>
          <div className='flex flex-col w-full mx-20 pr-10 gap-7 items-start'>
            <p className='font-bold text-lg'>사진 2장을 선택해주세요</p>
            <div className='flex gap-8 justify-center w-[90%] h-[30vh]'>
              <div className='flex align-center justify-center bg-lightGray w-[80%] rounded-lg'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleFileChange(e, setThumbnail1)}
                  className='hidden'
                  id='thumbnail1'
                />
                <label
                  htmlFor='thumbnail1'
                  className='cursor-pointer'
                >
                  {thumbnail1
                    ? truncateFileName(thumbnail1.name)
                    : '썸네일 사진 추가'}
                </label>
              </div>
              <div className='flex align-center justify-center bg-lightGray w-[80%] rounded-lg'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleFileChange(e, setThumbnail2)}
                  className='hidden'
                  id='thumbnail2'
                />
                <label
                  htmlFor='thumbnail2'
                  className='cursor-pointer'
                >
                  {thumbnail2
                    ? truncateFileName(thumbnail2.name)
                    : '썸네일 사진 추가'}
                </label>
              </div>
            </div>
            <p className='font-bold text-lg'>내용을 입력하세요</p>
            <textarea
              className='rounded-lg border w-[92%] py-3 focus:outline-none'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className='flex gap-4 justify-center'>
        <button className='bg-darkBlue text-white text-sm py-2 px-2 rounded-lg'>
          나가기
        </button>
        <button
          onClick={handleSubmit}
          className='bg-darkBlue text-white text-sm py-2 px-2 rounded-lg'
        >
          발행하기
        </button>
      </div>
    </div>
  )
}

export default PhotoAdd
