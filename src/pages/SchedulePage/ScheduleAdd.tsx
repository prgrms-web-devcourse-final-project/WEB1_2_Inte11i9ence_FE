import PlusIcon from '@assets/svg/Plus.svg?react'
import { useState } from 'react'
import SchedulePlan from './components/SchedulePlan'
const ScheduleAdd = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const clickPlus = () => {
    setOpenAddModal(!openAddModal)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex h-[70vh] '>
        <div className='flex flex-col flex-[4] relative gap-4 overflow-y-auto overflow-x-hidden max-w-full'>
          <div>
            <div className='flex flex-col w-full mx-4  gap-4 items-start'>
              <p className='font-bold '>지역 선택 버튼 추가 예정</p>

              <input
                placeholder='제목을 입력하세요'
                className='font-bold text-2xl border-b w-[92%] py-3 focus:outline-none'
              ></input>
              <div className='flex  justify-center w-[90%] h-[30vh] '>
                <div className='flex align-center justify-center bg-lightGray w-[80%] rounded-lg '>
                  <button className=' '>썸네일 사진 추가</button>
                </div>
              </div>
            </div>
          </div>
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
                      <div className='flex w-full border h-[5vh] p-2 text-gray-400 text-sm '>
                        검색을 통해 장소를 추가해보세요
                      </div>
                    </div>
                    <div className='flex flex-col items-start gap-4'>
                      <p className='font-bold'>어느 날짜에 방문했나요?</p>
                      <input
                        placeholder='ex) 0000-00-00'
                        className=' p-2 text-sm w-full border h-[5vh]  text-darkGray '
                      ></input>
                    </div>
                    <div className='flex flex-col items-start gap-4'>
                      <p className='font-bold'>
                        이 장소에 대해 메모를 남길 수 있어요!
                      </p>
                      <input className='w-full border h-[15vh]'></input>
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
        <div className='flex flex-[5]  bg-darkGray'>오른쪽 지도</div>
      </div>
      <div className='flex gap-4 justify-center'>
        <button className='bg-darkBlue text-white text-sm py-2 px-2 rounded-lg '>
          나가기
        </button>
        <button className='bg-darkBlue text-white  text-sm py-2 px-2 rounded-lg '>
          발행하기
        </button>
      </div>
    </div>
  )
}
export default ScheduleAdd
