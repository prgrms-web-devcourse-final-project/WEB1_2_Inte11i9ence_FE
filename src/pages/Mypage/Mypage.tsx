import { useEffect, useState } from 'react'
import MypagePlaces from './component/MypagePlaces'
import axios from 'axios'
import { Group } from '@/typings/region'
import MypagePostList from './component/MypagePostList'

const Mypage = () => {
  const [regionId, setRegionId] = useState<number>(1) // 선택된 regionId
  const [regions, setRegions] = useState<
    { regionId: number; regionName: string }[] | null
  >(null)
  const [postList, setPostList] = useState<Group[]>([]) // 글 목록
  const [selectedRegionName, setSelectedRegionName] = useState<string>('')
  const fetchData = async () => {
    try {
      // 일정 그룹 데이터 가져오기
      const groupResponse = await axios.get('/api/v1/plangroup/chaejeong')

      // 만약 groupResponse.data가 객체라면, 배열로 접근
      const groups = groupResponse.data

      // uniqueRegionIds는 regionId 중복없이, 오름차순 추출하는 거임
      const uniqueRegionIds = Array.isArray(groups)
        ? [...new Set(groups.map((group: Group) => group.regionId))].sort(
            (a, b) => a - b,
          )
        : []

      const regionPromises = uniqueRegionIds.map(async (regionId) => {
        const regionResponse = await axios.get(`/api/v1/region/${regionId}`)
        return { regionId, regionName: regionResponse.data.name }
      })

      const regions = await Promise.all(regionPromises)
      setRegions(regions)
      //regionName으로 배열 생성 ex)['서울','부산','대구'..]
      // const regionNames = regions.map((region) => region.regionName)
      // setRegionNames(regionNames)

      // 글 목록 설정
      setPostList(groups)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // regionId에 해당하는 regionName 찾기
  useEffect(() => {
    setSelectedRegionName(
      regions?.find((region) => region.regionId === regionId)?.regionName || '',
    )
  }, [regionId, regions])

  // 선택된 regionId에 맞는 글만 필터링
  const filteredPosts = regionId
    ? postList.filter((post) => post.regionId === regionId)
    : postList

  return (
    <div className='flex justify-center items-start w-full h-full'>
      <div className='flex w-[57vw] h-[70vh] items-center justify-center gap-9'>
        <MypagePlaces
          regions={regions}
          onRegionSelect={setRegionId}
        />
        <div className='w-1 bg-lightGray h-full'></div>
        {/* 선택된 지역 ID에 따라 필터링된 글 목록 전달 */}
        <MypagePostList
          selectedRegionName={selectedRegionName}
          postList={filteredPosts}
        />
      </div>
    </div>
  )
}

export default Mypage
