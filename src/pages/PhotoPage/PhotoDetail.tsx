import { useEffect, useState } from 'react'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import NextIcon from '@assets/svg/nextArrow.svg?react'
import PrevIcon from '@assets/svg/prevArrow.svg?react'
import VoteResults from './vote'
import PinIcon from '@assets/svg/Pin.svg?react'
import axios from 'axios'
import { Auth, PhotoDetailProp } from '@/typings/photo'
import { useNavigate } from 'react-router-dom'
import useProfile from '@/hooks/useProfile'

interface PhotoDetailProps {
  selectedPost: number | undefined
  author: Auth | undefined
  onClose: () => void
  refreshPosts: () => void
}

const PhotoDetail = ({
  selectedPost,
  author,
  onClose,
  refreshPosts,
}: PhotoDetailProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [postDetail, setPostDetail] = useState<PhotoDetailProp>()
  const token = localStorage.getItem('access_token')
  const { profile } = useProfile(token || '')
  const navigation = useNavigate()

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `https://www.skypedia.shop/api/v1/select-post/${selectedPost}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setPostDetail(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('ERROR', error)
      }
    }
    fetchPostDetail()
  }, [selectedPost, token])

  const images = [postDetail?.presignedUrls[0], postDetail?.presignedUrls[1]]

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

  const handleVote = () => {
    setHasVoted(true)
    setCurrentIndex(0)
  }

  const handleDelete = async () => {
    const token = localStorage.getItem('access_token')
    const confirmDelete = window.confirm('삭제 하시겠습니까?')

    if (confirmDelete) {
      try {
        await axios.delete(
          `https://www.skypedia.shop/api/v1/select-post/${selectedPost}?memberId=${profile?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        alert('삭제 완료되었습니다.')
        refreshPosts()
        onClose()
      } catch (error) {
        console.error('error', error)
        alert('삭제 중 오류가 발생했습니다.')
      }
    }
  }
  const handleEdit = () => {
    //postDetail 상태를 photoAdd에 prop로 넘겨주기
    console.log(postDetail)
    navigation('/photo/add', { state: { postDetailEdit: postDetail } })
  }

  return (
    <div>
      <div className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50'>
        <div
          className='bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[35%] lg:w-[25%] relative'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex justify-center items-center mb-4 gap-2'>
            <PinIcon
              width={20}
              height={20}
            />
          </div>
          <div className='flex justify-between  py-3 items-center'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full overflow-hidden'>
                <img
                  src={author?.profileUrl || defaultProfileImage}
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex flex-col justify-start items-start'>
                <p className='text-sm font-bold text-black'>
                  {author?.username}
                </p>
              </div>
            </div>
            {author?.username === profile?.username && (
              <div className='flex justify-center items-center gap-2 text-darkGray text-xs '>
                <button onClick={handleEdit}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </div>
            )}
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
              src={images[currentIndex]}
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
            {postDetail?.content}
          </p>
          {/* 투표 UI */}
          <div className='mt-4  p-2'>
            {!hasVoted ? (
              // 투표 전 UI
              <div className='flex flex-col border-t pt-2 items-center gap-3'>
                <div className='flex gap-4 pt-4 items-center'>
                  <button
                    className='bg-darkBlue text-white py-2 px-2 text-sm rounded-lg hover:bg-blue-600'
                    onClick={handleVote}
                  >
                    첫 번째 사진
                  </button>
                  <p className='font-bold text-lg'>VS</p>
                  <button
                    className='bg-darkBlue text-white py-2 px-2 text-sm rounded-lg hover:bg-blue-600'
                    onClick={handleVote}
                  >
                    두 번째 사진
                  </button>
                </div>
              </div>
            ) : (
              // 투표 후 UI
              <VoteResults />
            )}
          </div>
          <div className='flex w-full justify-center'>
            <button
              onClick={onClose}
              className='mt-4 mx-8'
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoDetail
