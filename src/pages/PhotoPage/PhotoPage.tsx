import { useState, useEffect } from 'react'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import { Link } from 'react-router-dom'
import PhotoDetail from './PhotoDetail'
import axios from 'axios'
import formatTime from '@/utils/formatTime'
import { PhotoList, Auth } from '@/typings/photo'
import 'aos/dist/aos.css'
import AOS from 'aos'

const PhotoPage = () => {
  const [postList, setPostList] = useState<PhotoList>()
  const [isPhotoDetailOpen, setIsPhotoDetailOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<number>()
  const [author, setAuthor] = useState<Auth>()
  const token = localStorage.getItem('access_token')

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    })
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        'https://www.skypedia.shop/api/v1/select-post?size=60',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setPostList(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error', error)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className='flex-col flex mt-[-50px]'>
      {/* 소개 섹션 */}
      <div
        className='flex-col flex bg-black'
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
        }}
      >
        <section
          className='text-white py-60 bg-cover bg-center relative'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581930385341-ab81d2f8f09b?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
          }}
        >
          <div
            className='absolute inset-0 bg-black bg-opacity-40 z-0'
            style={{ pointerEvents: 'none' }}
          ></div>
          <div
            className='max-w-full mx-auto text-end px-[5%] relative z-10'
            data-aos='fade-up'
            data-aos-delay='400'
            data-aos-duration='1000'
            style={{ transform: 'translateY(-120%)' }}
          >
            <p className='text-5xl font-bold leading-relaxed p-4 rounded-lg'>
              여행은 잘 다녀오셨나요?
            </p>
          </div>
          <img
            id='plane'
            src='https://cdn-icons-png.flaticon.com/128/7893/7893974.png'
            alt='Airplane'
            style={{
              position: 'absolute',
              top: '10%',
              left: '0',
              zIndex: 20,
              width: '80px',
              height: 'auto',
              animation: 'flyPlane 2s ease-out forwards',
            }}
          />
          <style>
            {`
          @keyframes flyPlane {
            0% {
              transform: translateX(0) rotate(0deg);
              opacity: 1;
            }
            70% {
              transform: translateX(50vw) translateY(-10px) rotate(10deg);
              opacity: 0.8;
            }
            100% {
              transform: translateX(70vw) translateY(-10px) rotate(20deg);
              opacity: 0;
            }
          }
        `}
          </style>
        </section>
        <section
          className='text-white py-40 bg-black relative'
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
          }}
          data-aos='fade-up'
          data-aos-delay='600'
        >
          <div className='absolute inset-0 z-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 200 200'
              className='w-full h-full opacity-20'
              style={{
                animation: 'svgAnimation 3s ease-in-out infinite',
              }}
            >
              <circle
                cx='100'
                cy='100'
                r='50'
                fill='white'
              />
              <circle
                cx='60'
                cy='60'
                r='30'
                fill='lightblue'
              />
            </svg>
          </div>
          <div className='max-w-4xl mx-auto text-center relative z-10'>
            <p className='text-3xl font-semibold leading-relaxed'>
              그곳에서 찍은 수많은 사진들 중,{' '}
              <span className='text-lightBlue'>단 하나의 특별한 순간이</span>
              있을 거예요.
            </p>
          </div>
        </section>
        <section
          className='text-white bg-black relative'
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
          }}
          data-aos='fade-up'
          data-aos-delay='1000'
        >
          <div className='max-w-4xl mx-auto pb-24 text-center relative z-10'>
            <p className='text-3xl font-semibold leading-relaxed'>
              어쩌면 그 순간은{' '}
              <span className='text-lightBlue'>아무도 모르는</span> 당신만의{' '}
              <span className='text-lightBlue'>작은 인생샷</span>일지도 모르죠.
            </p>
          </div>
        </section>
        <section
          className='text-white py-20 bg-gradient-to-t from-black to-gray-700'
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            overflow: 'hidden',
          }}
          data-aos='slide-right'
          data-aos-delay='1200'
        >
          <div className='relative max-w-4xl mx-auto text-center z-10'>
            <p className='text-3xl font-semibold leading-relaxed'>
              여행 중 마주친 그 소중한 순간을 이곳에서{' '}
              <span className='text-lightBlue'>다른 사람들과 함께 나누며,</span>
              <p> 그 기억을 더욱 빛나게 해보세요.</p>
            </p>
          </div>
        </section>
        <section
          className='text-white pb-20 bg-black'
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
          }}
          data-aos='zoom-out'
          data-aos-delay='800'
        >
          <div className='max-w-4xl mx-auto text-center'>
            <div className='space-x-8'>
              <Link
                to={'/photo/add'}
                className='inline-block px-8 py-3 text-lg font-semibold bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-all'
              >
                사진 업로드 하기
              </Link>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  const targetElement = document.getElementById('photo-gallery')

                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className='inline-block px-8 py-3 text-lg font-semibold bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-all'
              >
                사진 게시글 보기
              </a>
            </div>
          </div>
        </section>
      </div>
      {/* 게시글 목록*/}
      <div
        id='photo-gallery'
        className='flex flex-wrap pt-20  h-auto w-full justify-center gap-y-12 gap-x-4'
      >
        {postList?.selectPosts.length === 0 ? (
          <p className='text-center text-darkGray '>게시글이 없습니다.</p>
        ) : (
          postList?.selectPosts.map((photo) => (
            <button
              key={photo.selectPostId}
              onClick={() => {
                setSelectedPost(photo.selectPostId)
                setAuthor(photo.author)
                setIsPhotoDetailOpen(true)
              }}
              className='flex flex-col justify-between p-4 w-[45%] sm:w-[25%] lg:w-[20%] mx-2 bg-white shadow-lg rounded-lg border border-lightGray transition-transform hover:scale-105 hover:shadow-xl gap-4 aspect-[4/5]'
              data-aos='zoom-in'
            >
              <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 rounded-full overflow-hidden'>
                      <img
                        src={photo.author.profileUrl || defaultProfileImage}
                        alt='Profile'
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <p className='text-xs font-bold text-black'>
                      {photo.author.username}
                    </p>
                  </div>
                </div>
                <div className='h-[20vh] '>
                  <img
                    src={photo.presignedUrls[0]}
                    alt='Group'
                    className='w-full h-full object-cover rounded-md'
                  />
                </div>
                <p className='font-bold text-sm text-black line-clamp-2'>
                  {photo.content}
                </p>
              </div>
              <div className='flex w-full justify-end text-darkGray text-xs'>
                <p>{formatTime(photo.createdAt)}</p>
              </div>
            </button>
          ))
        )}
      </div>
      {isPhotoDetailOpen && (
        <PhotoDetail
          selectedPost={selectedPost}
          author={author}
          onClose={() => setIsPhotoDetailOpen(false)}
          refreshPosts={fetchPosts}
        />
      )}
    </div>
  )
}

export default PhotoPage
