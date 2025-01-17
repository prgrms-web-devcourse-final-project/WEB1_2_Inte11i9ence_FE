import { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import useProfile from '@hooks/useProfile'

const PhotoAdd = () => {
  const location = useLocation()
  const postDetailEdit = location.state?.postDetailEdit
  const token = localStorage.getItem('access_token')
  const { profile } = useProfile(token || '')
  const [thumbnail1, setThumbnail1] = useState<File | null>(null)
  const [thumbnail2, setThumbnail2] = useState<File | null>(null)
  const [imageUrl1, setImageUrl1] = useState<string | null>(
    postDetailEdit?.presignedUrls[0] || null,
  )
  const [imageUrl2, setImageUrl2] = useState<string | null>(
    postDetailEdit?.presignedUrls[1] || null,
  )
  const [content, setContent] = useState(postDetailEdit?.content || '')

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setImageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFile(file)
      setImageUrl(URL.createObjectURL(file)) // 미리보기 URL 설정
    }
  }

  const handleSubmit = async () => {
    if (!thumbnail1 || !thumbnail2 || !content) {
      alert('모든 필드를 입력하세요!')
      return
    }

    try {
      const uploadData = {
        content: content,
        uploads: [
          { originalFileName: thumbnail1.name, contentType: thumbnail1.type },
          { originalFileName: thumbnail2.name, contentType: thumbnail2.type },
        ],
      }

      let response

      // postDetailEdit이 있으면 PUT 요청, 없으면 POST 요청
      if (postDetailEdit) {
        response = await axios.put(
          `https://www.skypedia.shop/api/v1/select-post/${postDetailEdit.selectPostId}?memberId=${profile?.id}`,
          uploadData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
      } else {
        response = await axios.post(
          `https://www.skypedia.shop/api/v1/select-post?memberId=${profile?.id}`,
          uploadData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        )
      }

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
    <div className='flex flex-col gap-4 w-[90%] mx-auto'>
      <div className='flex flex-col relative gap-4'>
        <div>
          <div className='flex flex-col w-full gap-7 justify-center'>
            <p className='flex font-bold text-lg'>사진 2장을 선택해주세요</p>
            <div className='flex gap-8 justify-center w-full'>
              <div className='flex justify-center items-center bg-lightGray w-full h-[40vh] rounded-lg overflow-hidden'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) =>
                    handleFileChange(e, setThumbnail1, setImageUrl1)
                  }
                  className='hidden'
                  id='thumbnail1'
                />
                <label
                  htmlFor='thumbnail1'
                  className='cursor-pointer font-bold text-darkGray w-full h-full flex justify-center items-center'
                >
                  {imageUrl1 ? (
                    <img
                      src={imageUrl1}
                      alt='썸네일 미리보기'
                      className='object-cover w-full h-full rounded-lg'
                    />
                  ) : (
                    '첫번째 사진 업로드'
                  )}
                </label>
              </div>

              <div className='flex justify-center items-center bg-lightGray w-full h-[40vh] rounded-lg overflow-hidden'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) =>
                    handleFileChange(e, setThumbnail2, setImageUrl2)
                  }
                  className='hidden'
                  id='thumbnail2'
                />
                <label
                  htmlFor='thumbnail2'
                  className='cursor-pointer font-bold text-darkGray w-full h-full flex justify-center items-center'
                >
                  {imageUrl2 ? (
                    <img
                      src={imageUrl2}
                      alt='썸네일 미리보기'
                      className='object-cover w-full h-full rounded-lg'
                    />
                  ) : (
                    '두번째 사진 업로드'
                  )}
                </label>
              </div>
            </div>

            <p className='flex font-bold text-lg'>내용을 입력하세요</p>
            <textarea
              className='rounded-lg border w-full py-3 px-3 focus:outline-none'
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
