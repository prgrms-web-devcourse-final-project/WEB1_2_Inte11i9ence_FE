// PlanAdd.tsx
import React, { useState, useRef, useEffect } from 'react'

interface PlanAddProps {
  onPlaceSelected: (place: string, coordinates: google.maps.LatLng) => void // 좌표를 포함한 장소 정보 전달
}

const PlanAdd: React.FC<PlanAddProps> = ({ onPlaceSelected }) => {
  const [place, setPlace] = useState<string>('') // 선택된 장소
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null) // input 참조
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null) // Autocomplete 객체 참조
  const [date, setDate] = useState('') // 날짜 상태
  const [memo, setMemo] = useState('') // 메모 상태
  const [coordinates, setCoordinates] = useState<google.maps.LatLng | null>(
    null,
  ) // 장소 좌표 상태

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
    if (placeDetails && placeDetails.name && placeDetails.geometry?.location) {
      setPlace(placeDetails.name) // 선택된 장소 이름 저장
      setCoordinates(placeDetails.geometry.location) // 선택된 장소 좌표 저장
    } else {
      console.log('장소 정보를 가져올 수 없습니다.')
    }
  }

  // "완료" 버튼 클릭 시 부모 컴포넌트로 선택된 장소와 좌표 전달
  const handleComplete = () => {
    if (place && coordinates) {
      onPlaceSelected(place, coordinates)
    }
  }

  useEffect(() => {
    loadGoogleMapsApi()
  }, [])

  return (
    <div>
      <div className='flex mx-4 justify-between'>
        <p className='font-bold text-lg'>세부 일정 추가</p>

        <div className='flex justify-center gap-3 text-darkGray pb-4 text-sm'>
          <button onClick={handleComplete}>장소 보기</button>
        </div>
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
          <p className='font-bold pt-3'>어느 날짜에 방문했나요?</p>
          <input
            placeholder='ex) 0000-00-00'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='p-2 text-sm w-full border h-[5vh] text-darkGray'
          />
        </div>

        <div className='flex flex-col items-start gap-4'>
          <p className='font-bold pt-3'>
            이 장소에 대해 메모를 남길 수 있어요!
          </p>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className='w-full border h-[15vh] py-4 px-2 text-darkGray text-sm'
          />
        </div>
      </div>
    </div>
  )
}

export default PlanAdd
