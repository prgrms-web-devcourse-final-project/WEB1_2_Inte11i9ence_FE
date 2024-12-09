import { useEffect, useState } from 'react'
import axios from 'axios'
import DropdownSelector from '@/components/DropdownSelector'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import CommentIcon from '@assets/svg/Comment.svg?react'
import LikeIcon from '@assets/svg/Like.svg?react'
import PlusIcon from '@assets/svg/Plus.svg?react'
import { Link } from 'react-router-dom'
import { Group } from '@/typings/region'
import noPhoto from '@assets/png/noPhoto.png'
import formatTime from '@/utils/formatTime'
import { scheduleList, regionAll, region } from './components/mockData'
const SchedulePage = () => {
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([])
  const [groups, setGroups] = useState<Group[]>([]) // 일정 그룹 데이터
  // const [selectedRegionId, setSelectedRegionId] = useState<number | string>() // 선택된 지역 ID

  // 지역 목록 가져오기
  const fetchRegions = async () => {
    try {
      // const response = await axios.get('/api/v1/region')
      // const regionsData = response.data
      // const allRegions = [{ id: 0, name: '지역 전체' }, ...regionsData]
      // setRegions(allRegions)
      setRegions(regionAll)
    } catch (error) {
      console.error('Error', error)
    }
  }

  // 일정 그룹 가져오기 (모든 그룹 또는 특정 지역 그룹)
  const fetchGroups = async (regionId: number | string | null = null) => {
    try {
      // const response = regionId
      //   ? await axios.get(`/api/v1/plangroup/region/${regionId}`)
      //   : await axios.get('/api/v1/plangroup')
      // setGroups(response.data)
      // console.log(`그룹${response.data}`)
      setGroups(regionId ? region : scheduleList)
    } catch (error) {
      console.error('Error', error)
    }
  }

  useEffect(() => {
    fetchRegions()
    fetchGroups()
  }, [])

  // 지역 선택 핸들러
  const handleRegionChange = (selected: number | string) => {
    fetchGroups(selected) // 선택된 지역에 따라 그룹 데이터 호출
  }

  const options = regions.map((region) => ({
    value: region.id,
    label: region.name,
  }))

  return (
    <div className='flex-col flex'>
      <div className='flex y-[20px] mx-[70px] bg-white items-center justify-between'>
        <div className='h-[40px] relative z-1000'>
          <DropdownSelector
            options={options}
            defaultValue={0}
            onChange={(selected) => handleRegionChange(selected)}
          />
        </div>
        <Link to={'/schedule/add'}>
          <button>
            <PlusIcon
              width={20}
              height={20}
            />
          </button>
        </Link>
      </div>
      <div className='flex flex-wrap mx-16 mt-4 h-auto w-full justify-start gap-y-12 gap-x-4'>
        {groups.map((group) => (
          <Link
            to={'detail'}
            key={group.groupId}
            className='flex flex-col justify-between p-4 w-[45%] sm:w-[25%] lg:w-[20%] mx-2 bg-white shadow-lg rounded-lg border border-lightGray transition-transform hover:scale-105 hover:shadow-xl gap-5 aspect-[4/5]'
          >
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between '>
                <div className='flex items-center gap-2 '>
                  <div className='w-6 h-6 rounded-full overflow-hidden'>
                    <img
                      src={group.author.profileUrl || defaultProfileImage}
                      alt='Profile'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <p className='text-xs font-bold text-black'>
                    {group.author.username}
                  </p>
                </div>
                <button className='border px-2 py-1 rounded-lg text-xs font-normal bg-[#ecf4f9]'>
                  {regions.find((region) => region.id === group.regionId)
                    ?.name || '지역 정보 없음'}
                </button>
              </div>
              <div className='h-[16vh]'>
                <img
                  src={group.groupImgUrl || noPhoto}
                  alt='Group'
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
              <p className='font-bold text-sm text-black'>{group.title}</p>
            </div>
            <div className='flex justify-between text-darkGray text-xs'>
              <div className='flex items-center gap-1'>
                <LikeIcon
                  width={13}
                  height={13}
                />
                <span>{group.likes}</span>
                <CommentIcon
                  width={13}
                  height={13}
                />
                <span>{group.replies}</span>
              </div>
              <p>{formatTime(group.createdAt)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SchedulePage
