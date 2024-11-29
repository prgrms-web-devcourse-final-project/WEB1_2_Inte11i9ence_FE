import { useState } from 'react'

interface ScheduleBoxProps {
  regionName: string
  content?: string
}

const ScheduleBox = ({ regionName, content }: ScheduleBoxProps) => {
  const [isMemoVisible, setIsMemoVisible] = useState(false)

  const toggleView = () => {
    setIsMemoVisible(!isMemoVisible)
  }

  return (
    <div className='bg-white w-[95%] shadow rounded-lg border border-lightGray my-4 py-3 px-3'>
      <div className='text-black text-[15px]'>
        {isMemoVisible ? content || '메모가 없습니다.' : regionName}
      </div>
      <div className='flex justify-end gap-2 text-darkGray text-[12px]'>
        <button onClick={toggleView}>
          {isMemoVisible ? '주소 보기' : '메모 보기'}
        </button>
        {/* <button>수정</button>
        <button>삭제</button> */}
        {/* 위 부분, add일때는수정삭제로 되게 해야함  */}
      </div>
    </div>
  )
}

export default ScheduleBox
