import SchedulePlan from './components/SchedulePlan'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import LikeIcon from '@assets/svg/Like.svg?react'
import CommentIcon from '@assets/svg/Comment.svg?react'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { Group } from '@/typings/region'
import formatTime from '@/utils/formatTime'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { region } from './components/mockData'

const ScheduleDetail = () => {
  const [groupDetail, setGroupDetail] = useState<Group>({} as Group)
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const handleEdit = () => {
    if (groupDetail.groupId) {
      navigate(`/schedule/add?groupId=${groupDetail.groupId}`)
    } else {
      console.error('그룹 ID가 없습니다.')
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `api/v1/plan-group/${groupDetail.groupId}`,
      )
      alert(response.data.message)
    } catch (error) {
      console.error('error', error)
    }
  }

  const initializeMap = () => {
    if (mapRef.current && groupDetail.details) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.5665, lng: 126.978 },
        zoom: 10,
      })

      let totalLat = 0
      let totalLng = 0
      let validLocations = 0

      groupDetail.details.forEach((detail, index) => {
        const location = detail.location
        const geocoder = new google.maps.Geocoder()

        geocoder.geocode({ address: location }, (results, status) => {
          if (
            status === google.maps.GeocoderStatus.OK &&
            results &&
            results[0]
          ) {
            const position = results[0].geometry.location
            totalLat += position.lat()
            totalLng += position.lng()
            validLocations++

            new google.maps.Marker({
              position,
              map,
              title: location,
              label: `${index + 1}`,
            })
          } else {
            console.error(`Geocoding failed for ${location}: ${status}`)
          }

          if (validLocations === groupDetail.details.length) {
            const avgLat = totalLat / validLocations
            const avgLng = totalLng / validLocations
            map.setCenter({ lat: avgLat, lng: avgLng })
            map.setZoom(10)
          }
        })
      })
    }
  }

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (typeof google === 'undefined') {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API}`
        script.async = true
        script.defer = true
        script.onload = () => setGoogleMapsLoaded(true)
        document.body.appendChild(script)
        script.onerror = () => {
          console.error('Google Maps script failed to load')
        }
      } else {
        setGoogleMapsLoaded(true)
      }
    }

    loadGoogleMaps()
  }, [])

  useEffect(() => {
    if (googleMapsLoaded && groupDetail.details) {
      initializeMap()
    }
  }, [googleMapsLoaded, groupDetail])

  useEffect(() => {
    const fetchGroupDetail = async () => {
      try {
        setGroupDetail(region) // Mock 데이터 설정
      } catch (error) {
        console.error('error', error)
      }
    }

    fetchGroupDetail()

    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = '' // 기존 지도 제거
      }
    }
  }, [])

  return (
    <div className='flex-col flex gap-12'>
      <div className='flex h-[70vh] '>
        <div className='flex-[4] flex-col overflow-y-auto overflow-x-hidden '>
          <div className='font-bold text-2xl'>{groupDetail.title}</div>
          <div className='flex justify-between px-4 py-3 items-center align-center'>
            <div className='flex items-center gap-2 '>
              <div className='w-8 h-8 rounded-full overflow-hidden'>
                <img
                  src={groupDetail?.author?.profileUrl || defaultProfileImage}
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex flex-col justify-start items-start'>
                <p className='text-sm font-bold text-black'>
                  {groupDetail?.author?.username}
                </p>
                <div className='flex text-[10px] text-darkGray gap-1 '>
                  <p>{formatTime(groupDetail.createdAt)}</p>
                  <div className='flex gap-[2px]'>
                    <Eye
                      width={14}
                      height={15}
                    />
                    <p>{groupDetail.views}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex '>
              <span
                className={`border-2 rounded-[0.7rem]  px-1 pb-0.5 my-0.5 border-darkBlue text-darkBlue font-bold text-[14px]`}
              >
                서울
              </span>
              <div className='flex justify-center items-center align-center gap-2 text-darkGray text-xs mx-2'>
                <div className='flex  justify-center align-center gap-1'>
                  <button onClick={handleEdit}>수정</button>
                  <button onClick={handleDelete}>삭제</button>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col relative gap-4 overflow-y-auto overflow-x-hidden max-w-full'>
            <SchedulePlan details={groupDetail.details} />
          </div>
        </div>
        <div
          ref={mapRef}
          className='flex flex-[5] bg-darkGray'
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      <div className='w-full '>
        <div className='flex items-center gap-1'>
          <div className='text-darkGray'>
            <LikeIcon
              width={13}
              height={13}
            />
          </div>
          <span className='text-darkGray'>{groupDetail.likes}</span>
          <div className='text-darkGray'>
            <CommentIcon
              width={14}
              height={14}
            />
          </div>
          <span className='text-darkGray'>{groupDetail.replies}</span>
        </div>
      </div>
    </div>
  )
}

export default ScheduleDetail
