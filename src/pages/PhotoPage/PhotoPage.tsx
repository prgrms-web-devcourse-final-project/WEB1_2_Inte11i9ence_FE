import { useState } from 'react'
import DropdownSelector from '@/components/DropdownSelector'
import { photoList } from './mockdata'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import PlusIcon from '@assets/svg/Plus.svg?react'
import { Link } from 'react-router-dom'
import PhotoDetail from './PhotoDetail'
const PhotoPage = () => {
  const [selectedView, setSelectedView] = useState('서울')
  const [selectedType, setSelectedType] = useState('인물')
  const [isPhotoDetailOpen, setIsPhotoDetailOpen] = useState(false)
  const options = [
    { value: '서울', label: '서울' },
    { value: '오사카', label: '오사카' },
  ]

  const typeOptions = [
    { value: '인물', label: '인물' },
    { value: '배경', label: '배경' },
  ]

  const filteredGroups = photoList.filter(
    (photo) => photo.regionName === selectedView && photo.type === selectedType,
  )

  return (
    <div className='flex-col flex '>
      <div className='flex y-[20px] mx-[70px] bg-white items-center justify-between'>
        <div className='flex gap-4'>
          <div className='h-[40px]  relative z-1000'>
            <DropdownSelector
              options={options}
              defaultValue='서울'
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
        {filteredGroups.map((photo) => (
          <button
            onClick={() => setIsPhotoDetailOpen(true)}
            className='flex flex-col justify-between p-4 w-[45%] sm:w-[25%] lg:w-[20%] mx-2 bg-white shadow-lg rounded-lg border border-lightGray transition-transform hover:scale-105 hover:shadow-xl gap-8 aspect-[4/5]'
          >
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='w-6 h-6 rounded-full overflow-hidden'>
                    <img
                      src={defaultProfileImage}
                      alt='Profile'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <p className='text-xs font-bold text-black'>닉네임</p>
                </div>
                <div className='flex gap-1'>
                  <div className='border px-2 py-1 rounded-lg text-xs font-normal bg-[#ecf4f9]'>
                    서울
                  </div>
                  <div className='border px-2 py-1 rounded-lg text-xs font-normal bg-[#ecf4f9]'>
                    인물
                  </div>
                </div>
              </div>
              <div className='h-[20vh]'>
                <img
                  src={photo.ImgUrl}
                  alt='Group'
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
              <p className='font-bold text-sm text-black'>{photo.content}</p>
            </div>
            <div className='flex justify-end text-darkGray text-xs'>
              <p>{photo.date}</p>
            </div>
          </button>
        ))}
      </div>
      {isPhotoDetailOpen && <PhotoDetail></PhotoDetail>}
    </div>
  )
}

export default PhotoPage
