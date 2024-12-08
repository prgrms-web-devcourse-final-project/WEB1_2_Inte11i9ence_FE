import React, { useState, useEffect, useRef } from 'react'

const PlanAdd = () => {
  const [place, setPlace] = useState<string>('') // 선택된 장소
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null) // input 참조
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null) // Autocomplete 객체 참조
  const [date, setDate] = useState('') // 날짜 상태
  const [memo, setMemo] = useState('') // 메모 상태

  // Google Maps API 로드
  const loadGoogleMapsApi = () => {
    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeAutocomplete // Autocomplete 초기화
      document.body.appendChild(script)
    } else {
      initializeAutocomplete() // 이미 Google Maps가 로드된 경우 바로 초기화
    }
  }

  // Autocomplete 초기화
  const initializeAutocomplete = () => {
    if (autocompleteInputRef.current) {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        autocompleteInputRef.current,
      )
      autocompleteRef.current.addListener('place_changed', handlePlaceSelect)
    }
  }

  // 장소 선택 처리
  const handlePlaceSelect = () => {
    const placeDetails = autocompleteRef.current?.getPlace()
    if (placeDetails && placeDetails.name) {
      setPlace(placeDetails.name) // 선택된 장소 이름 저장
      console.log('선택된 장소:', placeDetails.name)
    } else {
      console.log('장소 정보를 가져올 수 없습니다.')
    }
  }

  useEffect(() => {
    loadGoogleMapsApi()
  }, [])

  // 날짜 입력 값 변경 처리
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  // 메모 입력 값 변경 처리
  const handleMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value)
  }

  return (
    <div>
      <div className='flex mx-4 justify-between'>
        <p className='font-bold text-lg'>세부 일정 추가</p>
      </div>

      <div className='flex flex-col p-4'>
        <div>
          <input
            ref={autocompleteInputRef} // input 참조
            type='text'
            placeholder='장소 검색'
            className='p-2 text-sm w-full border h-[5vh] text-darkGray'
            value={place} // 선택된 장소 출력
            onChange={(e) => setPlace(e.target.value)} // 사용자가 직접 입력 시
          />
        </div>

        <div className='flex flex-col items-start gap-4'>
          <p className='font-bold'>추가된 장소</p>
          <div className='flex w-full border h-[5vh] p-2 text-gray-400 text-sm'>
            {place ? place : '검색을 통해 장소를 추가해보세요'}{' '}
            {/* 선택된 장소 출력 */}
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
          <p className='font-bold'>이 장소에 대해 메모를 남길 수 있어요!</p>
          <input
            value={memo}
            onChange={handleMemoChange}
            className='w-full border h-[15vh]'
          />
        </div>

        <div className='flex justify-center gap-3 text-darkGray pb-4 text-sm'>
          <button>취소</button>
          <button>완료</button>
        </div>
      </div>
    </div>
  )
}

export default PlanAdd
