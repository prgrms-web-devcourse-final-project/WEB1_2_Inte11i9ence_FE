import React, { useState, useRef, useEffect } from 'react'
import ScheduleRegionDrop from '@/components/ScheduleRegionDrop'
import PlanAdd from './components/PlanAdd'
import { createScheduleGroup } from '@/hooks/useCreateScheduleGroup'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import PlusIcon from '@assets/svg/Plus.svg?react'

const ScheduleAdd = () => {
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [regionId, setRegionId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [searchParams] = useSearchParams()
  const [selectedPlace, setSelectedPlace] = useState<string>('') // 선택된 장소 상태 추가
  const [placeCoordinates, setPlaceCoordinates] =
    useState<google.maps.LatLng | null>(null) // 장소 좌표 상태
  const [showPlanAdd, setShowPlanAdd] = useState(false) // PlanAdd 컴포넌트 보이기 여부 상태 추가
  const [selectedDate, setSelectedDate] = useState<string>('') // 선택된 날짜 상태
  const [memo, setMemo] = useState<string>('') // 메모 상태
  const navigate = useNavigate()
  const groupId = searchParams.get('groupId') // URL에서 groupId를 가져옵니다.

  const mapRef = useRef<HTMLDivElement | null>(null) // 지도 컨테이너 참조
  const mapInstance = useRef<google.maps.Map | null>(null) // 지도 인스턴스 참조
  const markerInstance = useRef<google.maps.Marker | null>(null) // 마커 인스턴스 참조
  // 지도 및 마커 초기화
  // Google Maps API 로드
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        // Google Maps API가 로드된 후에 지도 초기화
        if (mapRef.current) {
          mapInstance.current = new google.maps.Map(mapRef.current, {
            center: { lat: 37.5665, lng: 126.978 }, // 기본 서울 위치
            zoom: 10,
          })

          markerInstance.current = new google.maps.Marker({
            map: mapInstance.current,
            title: '선택된 장소',
          })
        }
      }
      document.body.appendChild(script)
    } else {
      // 이미 로드된 경우 바로 지도 초기화
      if (mapRef.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center: { lat: 37.5665, lng: 126.978 }, // 기본 서울 위치
          zoom: 10,
        })

        markerInstance.current = new google.maps.Marker({
          map: mapInstance.current,
          title: '선택된 장소',
        })
      }
    }
  }, [])
  // 선택된 장소에 대한 좌표 업데이트
  const handlePlaceSelected = (
    place: string,
    coordinates: google.maps.LatLng,
  ) => {
    setSelectedPlace(place)
    setPlaceCoordinates(coordinates)

    if (mapInstance.current && markerInstance.current) {
      mapInstance.current.panTo(coordinates) // 지도의 중심을 선택된 장소로 이동
      markerInstance.current.setPosition(coordinates) // 마커 위치 업데이트

      // 지도 줌을 20으로 설정
      mapInstance.current.setZoom(15)
    }
  }

  useEffect(() => {
    if (groupId) {
      fetchGroupDetail(groupId)
    }
  }, [groupId])

  const fetchGroupDetail = async (groupId: string) => {
    try {
      const response = await axios.get(
        `api/v1/plangroup/${groupId}`, // 실제 API URL로 변경
      )
      const data = response.data
      setTitle(data.title)
      setRegionId(data.regionId)
      setPreviewImage(data.groupImgUrl)
    } catch (error) {
      console.error('error', error)
    }
  }

  const handleSubmit = async () => {
    if (!title || !regionId) {
      alert('제목과 지역 선택은 필수입니다!')
      return
    }

    const formData = new FormData()
    formData.append('memberId', '2') // 실제 사용자 ID로 변경 필ㅇㅕ함
    formData.append('regionId', regionId.toString())
    formData.append('title', title)
    formData.append('groupImgUrl', thumbnailImage || previewImage || '')

    try {
      let response
      if (groupId) {
        // 수정!!!
        response = await axios.put(`/api/groups/${groupId}`, {
          memberId: 2, // 실제 사용자 ID
          regionId,
          title,
          groupImgUrl: 'group.jpg', // 수정된 이미지 URL
        })
        console.log('일정 그룹 수정 성공:', response.data)
      } else {
        response = await createScheduleGroup({
          memberId: 2, // 실제 사용자 ID로 변경
          regionId: regionId,
          title: title,
          groupImgUrl: 'group.jpg', // 업로드된 이미지 URL
        })
        console.log('일정 그룹 생성 성공:', response)
      }
    } catch (error) {
      alert('일정 그룹 처리에 실패했습니다.')
      console.error('error', error)
    }
  }

  // 파일 입력창 접근을 위한 ref 추가
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleRegionChange = (selectedRegionId: number | string) => {
    console.log('선택된 지역 ID:', selectedRegionId)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setThumbnailImage(file)
      setPreviewImage(URL.createObjectURL(file)) // 미리보기 이미지 생성
    }
  }

  const handleButtonClick = () => {
    // 버튼 클릭 시 숨겨진 input 클릭
    fileInputRef.current?.click()
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleAddClick = () => {
    setShowPlanAdd(true) // 세부 일정 추가 버튼 클릭 시 PlanAdd 보이기
  }

  const handleCompletion = () => {
    setShowPlanAdd(false) // 완료 버튼 클릭 시 PlanAdd 숨기기
  }

  return (
    <div className='flex flex-col gap-4 mt-10 px-20'>
      <div className='flex h-[70vh]'>
        <div className='flex flex-col flex-[4] relative gap-4 overflow-y-auto overflow-x-hidden max-w-full custom-scroll'>
          <div>
            <div className='flex flex-col w-full mx-4 gap-4 items-start'>
              <div className='h-[40px] relative z-1000'>
                <ScheduleRegionDrop onRegionChange={handleRegionChange} />
              </div>
              <input
                placeholder='제목을 입력하세요'
                value={title} // 제목 상태와 바인딩
                onChange={handleTitleChange} // 제목 변경 핸들러 연결
                className='font-bold text-2xl border-b w-[92%] py-3 focus:outline-none'
              />
            </div>
            <button
              onClick={handleButtonClick}
              className='flex w-[91%] p-2 bg-lightGray rounded-lg mx-6 justify-center mt-4'
            >
              <p className=' text-sm'>이미지 업로드</p>
            </button>
          </div>
          {!showPlanAdd && (
            <button
              onClick={handleAddClick}
              className='flex px-2 mx-2 justify-between'
            >
              <p className='font-bold text-lg'>세부 일정 추가</p>
              <PlusIcon
                width={24}
                height={30}
              />
            </button>
          )}
          {showPlanAdd && (
            <>
              <PlanAdd onPlaceSelected={handlePlaceSelected} />
              <button onClick={handleCompletion}>완료</button>
            </>
          )}
        </div>
        <div
          className='flex flex-[3] bg-darkGray'
          ref={mapRef}
          style={{ height: '100%' }}
        />
      </div>

      <div className='flex gap-4 justify-center'>
        <button
          onClick={() => navigate(-1)}
          className='bg-darkBlue text-white text-sm py-2 px-2 rounded-lg'
        >
          나가기
        </button>
        <button
          onClick={handleSubmit}
          className='bg-darkBlue text-white text-sm py-2 px-2 rounded-lg'
        >
          {groupId ? '수정하기' : '발행하기'}
        </button>
      </div>
    </div>
  )
}

export default ScheduleAdd
