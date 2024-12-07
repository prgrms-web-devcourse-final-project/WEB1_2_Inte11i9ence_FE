import ScheduleAdd from '../ScheduleAdd'
import { useState } from 'react'
import PlusIcon from '@assets/svg/Plus.svg?react'
import SchedulePlan from './SchedulePlan'
const PlanAdd = () => {
  const [openAddModal, setOpenAddModal] = useState(false)

  const [date, setDate] = useState('') // 날짜 상태
  const [memo, setMemo] = useState('') // 메모 상태
  const clickPlus = () => {
    setOpenAddModal(!openAddModal)
  }
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  const handleMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value)
  }
  return (
    <div>
      <div className='flex mx-4 justify-between'>
        <p className='font-bold text-lg'>세부 일정 추가</p>
        <button onClick={clickPlus}>
          <PlusIcon
            width={24}
            height={24}
          />
        </button>
      </div>
      <SchedulePlan />
      {openAddModal && (
        <div className='absolute top-[8%] left-[10%] w-[80%] h-[90%] flex justify-center items-start z-50 bg-white shadow-lg rounded-lg border border-lightGray'>
          <div className='flex flex-col h-full w-full justify-between'>
            <div className='flex flex-col gap-4 p-4'>
              <div>검색컴포넌트</div>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col items-start gap-4'>
                  <p className='font-bold'>추가된 장소</p>
                  <div className='flex w-full border h-[5vh] p-2 text-gray-400 text-sm'>
                    검색을 통해 장소를 추가해보세요
                  </div>
                </div>
                <div className='flex flex-col items-start gap-4'>
                  <p className='font-bold'>어느 날짜에 방문했나요?</p>
                  <input
                    placeholder='ex) 0000-00-00'
                    value={date}
                    onChange={handleDateChange}
                    className='p-2 text-sm w-full border h-[5vh] text-darkGray'
                  />
                </div>
                <div className='flex flex-col items-start gap-4'>
                  <p className='font-bold'>
                    이 장소에 대해 메모를 남길 수 있어요!
                  </p>
                  <input
                    value={memo}
                    onChange={handleMemoChange}
                    className='w-full border h-[15vh]'
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-center gap-3 text-darkGray pb-4 text-sm'>
              <button>취소</button>
              <button>완료</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default PlanAdd
