import { useEffect, useState } from 'react'
import DropdownSelector from '@/components/DropdownSelector'
import { PostApiResponse } from '@/typings/post'
import axios from 'axios'
import PostItem from '../PostListPage/PostItem'

const MypageGather = () => {
  // 상태 타입을 PostApiResponse로 설정
  const [myPost, setMyPost] = useState<PostApiResponse | null>(null)
  const [selectedView, setSelectedView] = useState('posts') // 선택된 보기 상태

  const options = [
    { value: 'posts', label: '작성한 글' },
    { value: 'scrap', label: '스크랩' },
  ]

  useEffect(() => {
    const fetchMyPost = async () => {
      try {
        const response = await axios.get(
          'https://f7c2d6d8-6cd5-46ec-b36b-d4496b4280c6.mock.pstmn.io/api/v1/posts/chaejeong',
        )
        setMyPost(response.data)
      } catch (error) {
        console.error('error', error)
      }
    }
    fetchMyPost()
  }, [selectedView])

  return (
    <div className='flex flex-col items-end'>
      <div className='h-[40px] relative z-1000 px-16'>
        <DropdownSelector
          options={options}
          defaultValue='posts'
          onChange={(selected) => setSelectedView(selected)}
        />
      </div>
      <div className='mt-4 w-full'>
        {selectedView === 'posts' && (
          <div className='flex flex-col gap-4'>
            {myPost?.result?.map((post) => (
              <div
                key={post.id}
                className='relative z-1000'
              >
                <PostItem post={post} />
              </div>
            ))}
          </div>
        )}
        {selectedView === 'scrap' && (
          <div className='flex flex-col gap-4'>
            {myPost?.result?.map((post) => (
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
