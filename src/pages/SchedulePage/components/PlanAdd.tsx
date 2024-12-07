import React, { useState, useRef } from 'react'
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api'
import ScheduleAdd from '../ScheduleAdd'
import PlusIcon from '@assets/svg/Plus.svg?react'
import SchedulePlan from './SchedulePlan'

type PlanAddProps = {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void // 장소 선택 시 상위 컴포넌트에 전달할 콜백
}
const PlanAdd = ({ onPlaceSelect }: PlanAddProps) => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [date, setDate] = useState('') // 날짜 상태
  const [memo, setMemo] = useState('') // 메모 상태
  const [place, setPlace] = useState<string | undefined>('') // 장소 상태

  // useRef의 타입을 Autocomplete 객체로 지정
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  const clickPlus = () => {
    setOpenAddModal(!openAddModal)
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  const handleMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value)
  }

  // 장소 선택 시
  const handlePlaceSelect = () => {
    const autocomplete = autocompleteRef.current
    if (autocomplete) {
      const place = autocomplete.getPlace()
      setPlace(place.name || '') // place.name이 undefined일 경우 빈 문자열로 처리
      onPlaceSelect(place) // 상위 컴포넌트에 선택한 장소 전달
    }
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
              <div>
                <LoadScript
                  googleMapsApiKey={import.meta.env.VITE_GOOGLE_API}
                  libraries={['places']}
                >
                  <Autocomplete
                    onPlaceChanged={handlePlaceSelect}
                    ref={autocompleteRef} // ref를 사용하여 Autocomplete에 접근
                  >
                    <input
                      type='text'
                      placeholder='장소 검색'
                      className='p-2 text-sm w-full border h-[5vh] text-darkGray'
                    />
                  </Autocomplete>
                </LoadScript>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col items-start gap-4'>
                  <p className='font-bold'>추가된 장소</p>
                  <div className='flex w-full border h-[5vh] p-2 text-gray-400 text-sm'>
                    {place ? place : '검색을 통해 장소를 추가해보세요'}
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
