import { useState } from 'react'
import DropdownSelector from '@/components/DropdownSelector'
import { AllPostData } from '@/typings/post'
import { myPosts } from './mockdata'
//나중에 api 연결할 때는 myPost 목데이터 대신 [myPosts, setMyPosts] 같이 사용
//스크랩, 내 글 모아보기 같음
// import PostItem from '@components/PostItem'

const MypageGather = () => {
  const [selectedView, setSelectedView] = useState('posts') // 선택된 보기 상태
  const options = [
    { value: 'posts', label: '작성한 글' },
    { value: 'scrap', label: '스크랩' },
  ]

  return (
    <div className='flex flex-col items-end'>
      <div className='h-[40px]  relative z-1000'>
        <DropdownSelector
          options={options}
          defaultValue='posts'
          onChange={(selected) => setSelectedView(selected)}
        />
      </div>
      {/* <div className='mt-4 w-full'>
        {selectedView === 'posts' && (
          <div className='flex flex-col gap-4'>
            {myPosts.map((post) => (
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
            {myPosts.map((post) => (
              <div
                key={post.id}
                className='relative z-1000'
              >
                <PostItem post={post} />
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  )
}

export default MypageGather
