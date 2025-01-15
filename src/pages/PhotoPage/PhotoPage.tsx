import { useState, useEffect } from 'react'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import PlusIcon from '@assets/svg/Plus.svg?react'
import { Link } from 'react-router-dom'
import PhotoDetail from './PhotoDetail'
import axios from 'axios'
import formatTime from '@/utils/formatTime'
import { PhotoList, Auth } from '@/typings/photo'

const PhotoPage = () => {
  const [postList, setPostList] = useState<PhotoList>()
  const [isPhotoDetailOpen, setIsPhotoDetailOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<number>()
  const [author, setAuthor] = useState<Auth>()
  const token = localStorage.getItem('access_token')

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
    <div className='flex-col flex '>
      <div className='flex y-[20px] mx-[70px] bg-white items-center justify-between'>
        <Link to={'/photo/add'}>
          <button>
            <PlusIcon
              width={20}
              height={20}
            />
          </button>
        </Link>
      </div>
      <div className='flex flex-wrap mt-4 h-auto w-full justify-center gap-y-12 gap-x-4'>
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
              className='flex flex-col justify-between p-4 w-[45%] sm:w-[25%] lg:w-[20%] mx-2 bg-white shadow-lg rounded-lg border border-lightGray transition-transform hover:scale-105 hover:shadow-xl gap-8 aspect-[4/5]'
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
                <p className='font-bold text-sm text-black'>{photo.content}</p>
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
