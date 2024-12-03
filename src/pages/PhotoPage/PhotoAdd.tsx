import { useState } from 'react'
import DropdownSelector from '@/components/DropdownSelector'
import axios from 'axios'

const MAX_FILE_SIZE = 10 * 1024 * 1024

const PhotoAdd = () => {
  const [selectedView, setSelectedView] = useState('서울')
  const [selectedType, setSelectedType] = useState('인물')
  const [photos, setPhotos] = useState([null, null]) // 사진 파일 저장
  const [uploadStatus, setUploadStatus] = useState(['', ''])

  const options = [
    { value: '서울', label: '서울' },
    { value: '오사카', label: '오사카' },
  ]

  const typeOptions = [
    { value: '인물', label: '인물' },
    { value: '배경', label: '배경' },
  ]
  const getPresignedUrls = async () => {
    try {
      const response = await axios.post('/api/v1/photo', [
        {
          originalFileName: photos[0]?.name,
          contentType: photos[0]?.type,
        },
        {
          originalFileName: photos[1]?.name,
          contentType: photos[1]?.type,
        },
      ])
      return response.data
    } catch (error) {
      console.error('Failed to get presigned URLs:', error)
      alert('Presigned URL 발급에 실패했습니다.')
      return []
    }
  }

  const handleUpload = async () => {
    if (!photos[0] || !photos[1]) {
      alert('사진 2장을 모두 선택해주세요.')
      return
    }

    const presignedUrls = await getPresignedUrls()
    if (presignedUrls.length !== 2) {
      alert('Presigned URL 발급에 실패했습니다.')
      return
    }

    const uploadPromises = photos.map((photo, index) =>
      axios
        .put(presignedUrls[index], photo, {
          headers: {
            'Content-Type': photo.type,
          },
        })
        .then(() => {
          const newStatus = [...uploadStatus]
          newStatus[index] = `${photo.name} 업로드 성공`
          setUploadStatus(newStatus)
        })
        .catch((error) => {
          console.error(`Failed to upload ${photo.name}:`, error)
          const newStatus = [...uploadStatus]
          newStatus[index] = `${photo.name} 업로드 실패`
          setUploadStatus(newStatus)
        }),
    )

    await Promise.all(uploadPromises)
    alert('사진 업로드가 완료되었습니다.')
  }

  const handleFileChange = (index: number, file: File | null) => {
    if (file && file.size > MAX_FILE_SIZE) {
      alert('파일 크기가 너무 큽니다. 10MB 이하의 파일을 선택해주세요.')
      return
    }

    const newPhotos = [...photos]
    newPhotos[index] = file
    setPhotos(newPhotos)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col flex-[4] relative gap-4'>
        <div>
          <div className='flex flex-col w-full mx-4  gap-7 items-start'>
            <div className='flex gap-4'>
              <div className='h-[40px]  relative z-1000'>
                <DropdownSelector
                  options={options}
                  defaultValue='서울'
                  onChange={(selected) => setSelectedView(selected)}
                />
              </div>
              <div className='h-[40px]  relative z-1000'>
                <DropdownSelector
                  options={typeOptions}
                  defaultValue='인물'
                  onChange={(selected) => setSelectedType(selected)}
                />
              </div>
            </div>
            <p className='font-bold text-lg'>사진 2장을 선택해주세요</p>
            <div className='flex gap-8 justify-center w-[90%] h-[30vh] '>
              {photos.map((_, index) => (
                <div className='flex  align-center justify-center bg-lightGray w-[80%] rounded-lg '>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) =>
                      handleFileChange(index, e.target.files?.[0] || null)
                    }
                  >
                    썸네일 사진 추가
                  </input>
                </div>
              ))}
            </div>
            <p className='font-bold text-lg'>내용을 입력하세요</p>

            <textarea className='rounded-lg border w-[92%] py-3 focus:outline-none'></textarea>
          </div>
        </div>
      </div>
      <div className='flex gap-4 justify-center'>
        <button className='bg-darkBlue text-white text-sm py-2 px-2 rounded-lg '>
          취소
        </button>
        <button className='bg-darkBlue text-white  text-sm py-2 px-2 rounded-lg '>
          완료
        </button>
      </div>
    </div>
  )
}
export default PhotoAdd
