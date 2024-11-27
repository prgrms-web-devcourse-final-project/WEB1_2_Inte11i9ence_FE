import { useState } from 'react'
import DropdownSelector from '@/components/DropdownSelector'

const MypageGather = () => {
  const [selectedView, setSelectedView] = useState('posts') // 선택된 보기 상태

  const options = [
    { value: 'posts', label: '작성한 글' },
    { value: 'scrap', label: '스크랩' },
  ]

  return (
    <div className='flex flex-col items-end'>
      <DropdownSelector
        options={options}
        defaultValue='posts'
        onChange={(selected) => setSelectedView(selected)}
      />
      <div className='mt-4 w-full'>
        {selectedView === 'posts' && (
          <div className='p-4 border rounded-lg shadow-md'>작성한 글 내용</div>
        )}
        {selectedView === 'scrap' && (
          <div className='p-4 border rounded-lg shadow-md'>스크랩 내용</div>
        )}
      </div>
    </div>
  )
}

export default MypageGather
