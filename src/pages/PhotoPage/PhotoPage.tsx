import { useState, useEffect } from 'react'
import DropdownSelector from '@/components/DropdownSelector'
import { photoList } from './mockdata'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import PlusIcon from '@assets/svg/Plus.svg?react'
import { Link } from 'react-router-dom'
import PhotoDetail from './PhotoDetail'
import axios from 'axios'
import { Group } from 'lucide-react'
import formatTime from '@/utils/formatTime'

interface PhotoType {
  id: number
  nickname: string
  regionName: string
  type: string
  ImgUrl: string
  content: string
  date: string
  profileImg?: string
}

const PhotoPage = () => {
  const [postList, setPhotoList] = useState([])
  const [filteredPhotos, setFilteredPhotos] = useState([])
  const [selectedView, setSelectedView] = useState('지역 전체')
  const [selectedType, setSelectedType] = useState('인물')
  const [isPhotoDetailOpen, setIsPhotoDetailOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null) // 선택된 사진 상태 추가

  const options = [
    { value: '지역 전체', label: '지역 전체' },
    { value: '서울', label: '서울' },
    { value: '부산', label: '부산' },
    { value: '제주', label: '제주' },
    { value: '강릉', label: '강릉' },
  ]
  const typeOptions = [
    { value: '인물', label: '인물' },
    { value: '배경', label: '배경' },
    { value: '기타', label: '기타' },
  ]
  useEffect(() => {
    const fetchPhots = async () => {
      try {
        // const response = await axios.get('api/photos')
        // setPhotoList(response.data)
        // setFilteredPhotos(response.data)
        setPhotoList(Group)
      } catch (error) {
        console.error('Error', error)
      }
    }
    fetchPhots()
  }, [])
  // 필터링 로직
  useEffect(() => {
    const filtered = photoList.filter((photo) => {
      const matchesRegion =
        selectedView === '지역 전체' || photo.regionName === selectedView
      const matchesType = photo.type === selectedType
      return matchesRegion && matchesType
    })
    setFilteredPhotos(filtered)
  }, [selectedView, selectedType, photoList])
  return (
    <div className='flex-col flex '>
      <div className='flex y-[20px] mx-[70px] bg-white items-center justify-between'>
        <div className='flex gap-4'>
          <div className='h-[40px]  relative z-1000'>
            <DropdownSelector
              options={options}
              defaultValue='지역 전체'
              onChange={(selected) => setSelectedView(selected)}
            />
          </div>
          <div className='h-[40px]  relative z-1000'>
            <DropdownSelector
              options={typeOptions}
              defaultValue='인물'
              onChange={(selected) => setSelectedType(selected)}
            />
          </div>
        </div>
        <Link to={'/photo/add'}>
          <button>
            <PlusIcon
              width={20}
              height={20}
            />
          </button>
        </Link>
      </div>
      <div className='flex flex-wrap mt-4 h-auto w-full justify-center gap-y-12 gap-x-4'>
        {filteredPhotos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => {
              setSelectedPhoto(photo) // 선택된 사진 설정
              setIsPhotoDetailOpen(true)
            }}
            className='flex flex-col justify-between p-4 w-[45%] sm:w-[25%] lg:w-[20%] mx-2 bg-white shadow-lg rounded-lg border border-lightGray transition-transform hover:scale-105 hover:shadow-xl gap-8 aspect-[4/5]'
          >
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='w-6 h-6 rounded-full overflow-hidden'>
                    <img
                      src={photo.profileImg || defaultProfileImage}
                      alt='Profile'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <p className='text-xs font-bold text-black'>
                    {photo.nickname}
                  </p>
                </div>
                <div className='flex gap-1'>
                  <div className='border px-2 py-1 rounded-lg text-xs font-normal bg-[#ecf4f9]'>
                    {photo.regionName}
                  </div>
                  <div className='border px-2 py-1 rounded-lg text-xs font-normal bg-[#ecf4f9]'>
                    {photo.type}
                  </div>
                </div>
              </div>
              <div className='h-[20vh] '>
                <img
                  src={photo.ImgUrl}
                  alt='Group'
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
              <p className='font-bold text-sm text-black'>{photo.content}</p>
            </div>
            <div className='flex w-full justify-end text-darkGray text-xs'>
              <p>{formatTime(photo.date)}</p>
            </div>
          </button>
        ))}
      </div>
      {isPhotoDetailOpen && (
        <PhotoDetail
          photoInfo={selectedPhoto}
          onClose={() => setIsPhotoDetailOpen(false)}
        /> // 닫기 핸들러 전달
      )}
    </div>
  )
}

export default PhotoPage
