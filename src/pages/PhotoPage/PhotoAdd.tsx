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

    const thumbnail1Url = URL.createObjectURL(thumbnail1) // 로컬 파일을 URL로 변환 (테스트용)
    const thumbnail2Url = URL.createObjectURL(thumbnail2) // 로컬 파일을 URL로 변환 (테스트용)

    // 요청 데이터 구성 (파일은 URL로)
    const requestBody = {
      content: content,
      uploads: [
        {
          originalFileName: thumbnail1Url, // 파일 URL
          contentType: thumbnail1.type, // 파일 타입
        },
        {
          originalFileName: thumbnail2Url, // 파일 URL
          contentType: thumbnail2.type, // 파일 타입
        },
      ],
    }

    console.log('Request Body:', requestBody)

    try {
      // 서버로 JSON 데이터 전송
      const response = await axios.post(
        'https://www.skypedia.shop/api/v1/select-post?memberId=4',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Raw JSON으로 전송
          },
        },
      )

      alert('게시글이 성공적으로 업로드되었습니다!')
      console.log('Response:', response.data)
    } catch (error) {
      console.error('업로드 실패:', error)
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
