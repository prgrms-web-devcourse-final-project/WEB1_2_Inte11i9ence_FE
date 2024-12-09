import { useEffect, useState } from 'react'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import defaultProfileImageOne from '@assets/png/default-profile-1.png'
import NextIcon from '@assets/svg/nextArrow.svg?react'
import PrevIcon from '@assets/svg/prevArrow.svg?react'
import VoteResults from './vote'
import PinIcon from '@assets/svg/Pin.svg?react'
import axios from 'axios'

interface PhotoDetailProps {
  photoId: number
  onClose: () => void
}

const PhotoDetail = ({ photoId, onClose }: PhotoDetailProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [photoDetail, setPhotoDetail] = useState(null)
  const [voteResults, setVoteResults] = useState(null)

  useEffect(() => {
    const fetchPhotoDetail = async () => {
      try {
        const response = await axios.get(`api/photos/${photoId}`)
        setPhotoDetail(response.data)
      } catch (error) {
        console.error('Error', error)
      }
    }
    fetchPhotoDetail()
  }, [photoId])

  const handleVote = async (photoId: string) => {
    try {
      const response = await axios.post('/api/vote', {
        photoId, // 투표된 사진 ID
        userId: 'user123', // 사용자 ID (로그인 사용자 기준)
      })
      if (response.data.success) {
        console.log('투표 성공:', response.data.voteResults)
        setHasVoted(true) // 투표 상태 업데이트
        setVoteResults(response.data.voteResults) // 결과 UI 업데이트
      }
    } catch (error) {
      console.error('투표 실패:', error)
    }
  }
  const images = [defaultProfileImage, defaultProfileImageOne]

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    )
  }

  return (
    <div>
      <div className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50'>
        <div
          className='bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[45%] lg:w-[30%] relative'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex justify-center items-center mb-4 gap-2'>
            <PinIcon
              width={20}
              height={20}
            />
            <p className='font-bold text-lg'>{photoDetail.regionName}</p>
          </div>
          <div className='flex justify-between  py-3 items-center'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full overflow-hidden'>
                <img
                  src={photoDetail.profileImg || defaultProfileImage}
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex flex-col justify-start items-start'>
                <p className='text-sm font-bold text-black'>닉네임</p>
                <div className='flex text-[10px] text-darkGray gap-2'>
                  <p>{photoDetail.createAt}</p>
                  <p>{photoDetail.views}</p>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center gap-2 text-darkGray pb-4 text-xs mx-5'>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
          <div className='h-[40vh] relative flex items-center justify-center'>
            <button
              onClick={handlePrev}
              className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center z-10'
            >
              <PrevIcon
                width={15}
                height={15}
              />
            </button>
            <img
              src={images[currentIndex]} //api로 오는 사진으로 변경
              alt={`Photo ${currentIndex + 1}`}
              className='w-full h-full object-cover rounded-md'
            />
            <button
              onClick={handleNext}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 '
            >
              <NextIcon
                width={15}
                height={15}
              />
            </button>
          </div>
          <p className='font-bold text-sm text-black mt-4'>
            {photoDetail.content}
          </p>
          {/* 투표 UI */}
          <div className='mt-4  p-2'>
            {!hasVoted ? (
              // 투표 전 UI
              <div className='flex flex-col border-t pt-2 items-center gap-3'>
                <div className='flex gap-4 items-center'>
                  <button
                    className='bg-darkBlue text-white py-2 px-2 text-sm rounded-lg hover:bg-blue-600'
                    onClick={() => handleVote(photo1Id)}
                  >
                    첫 번째 사진
                  </button>
                  <p className='font-bold text-lg'>VS</p>
                  <button
                    className='bg-darkBlue text-white py-2 px-2 text-sm rounded-lg hover:bg-blue-600'
                    onClick={() => handleVote(photo2Id)}
                  >
                    두 번째 사진
                  </button>
                </div>
              </div>
            ) : (
              // 투표 후 UI, 글의 작성자인지, 투표를 한 사람인ㅇ지에 대한 정보랑, 투표수 전달해서 보여주기
              <VoteResults voteResults={voteResults} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoDetail
