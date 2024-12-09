import { useState } from 'react'

interface ScheduleBoxProps {
  regionName: string
  content?: string
  orderNumber: number
}

const ScheduleBox = ({
  regionName,
  content,
  orderNumber,
}: ScheduleBoxProps) => {
  const [isMemoVisible, setIsMemoVisible] = useState(false)

  const toggleView = () => {
    setIsMemoVisible(!isMemoVisible)
  }

  return (
    <div className='bg-white w-[95%] shadow rounded-lg border border-lightGray my-4 py-3 px-3'>
      <div className='flex-col'>
        <div className='flex text-darkGray text-[12px] w-5 h-5 bg-darkBlue rounded-3xl justify-center items-center'>
          <span className='font-bold text-white justify-start '>
            {orderNumber}
          </span>
        </div>
        <div className='flex justify-center text-black text-[15px] font-bold'>
          {isMemoVisible ? (
            <span className='font-normal py-2'>
              {content || '메모가 없습니다.'}
            </span>
          ) : (
            regionName
          )}
        </div>
      </div>
      <div className='flex justify-end gap-2 text-darkGray text-[12px]'>
        <button onClick={toggleView}>
          {isMemoVisible ? '주소 보기' : '메모 보기'}
        </button>
      </div>
    </div>
  )
}

export default ScheduleBox
