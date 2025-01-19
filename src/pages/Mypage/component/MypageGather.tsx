import { useEffect, useState } from 'react'
import DropdownSelector from '@/components/DropdownSelector'
import { PostApiResponse } from '@/typings/post'
import axios from 'axios'
import PostItem from '../../PostListPage/PostItem'
import useProfile from '@/hooks/useProfile'

const MypageGather = () => {
  const [myPost, setMyPost] = useState<PostApiResponse | null>(null)
  const [selectedView, setSelectedView] = useState('posts')
  const [errorMessage, setErrorMessage] = useState('')

  const options = [
    { value: 'posts', label: '작성한 글' },
    { value: 'scrap', label: '스크랩' },
  ]

  const token = localStorage.getItem('access_token')
  const { profile, isLoading } = useProfile(token || '')

  useEffect(() => {
    const fetchMyPost = async () => {
      if (!profile?.username) {
        console.error('Profile username is undefined')
        return
      }

      try {
        const response = await axios.get(
          selectedView === 'posts'
            ? `https://www.skypedia.shop/api/v1/posts/${profile.username}`
            : 'https://www.skypedia.shop/api/v1/posts/scrap',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setMyPost(response.data)
        setErrorMessage('')
      } catch (error) {
        console.error('Error fetching posts:', error)
        setMyPost(null)
        setErrorMessage('목록이 존재하지 않습니다')
      }
    }

    if (!isLoading && profile?.username) {
      fetchMyPost()
    }
  }, [selectedView, profile?.username, token, isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col items-end'>
      <div className='h-[60px] relative z-1000 px-[68px]'>
        <DropdownSelector
          options={options}
          defaultValue='posts'
          onChange={(selected) => setSelectedView(selected)}
        />
      </div>
      <div className='mt-4 w-full px-[50px]'>
        {errorMessage && <div className='text-darkGray'>{errorMessage}</div>}{' '}
        {selectedView === 'posts' && myPost?.posts && (
          <div className='flex flex-col gap-4'>
            {myPost.posts.map((post) => (
              <div
                key={post.id}
                className='relative z-1000'
              >
                <PostItem post={post} />
              </div>
            ))}
          </div>
        )}
        {selectedView === 'scrap' && myPost?.posts && (
          <div className='flex flex-col gap-4'>
            {myPost.posts.map((post) => (
              <div
                key={post.id}
                className='relative z-1000'
              >
                <PostItem post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MypageGather
