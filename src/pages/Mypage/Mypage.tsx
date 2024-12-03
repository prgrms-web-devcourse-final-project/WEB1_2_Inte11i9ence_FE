import { useEffect, useState } from 'react'
import MypagePlaces from './MypagePlaces'
import MypagePostList from './MypagePostList'
import axios from 'axios'

const Mypage = () => {
  const [regionId, setRegionId] = useState<number>(1) // 선택된 regionId
  const [uniqueRegions, setUniqueRegions] = useState<
    { regionId: number; regionName: string }[]
  >([])
  const [postList, setPostList] = useState<any[]>([]) // 글 목록

  const fetchData = async () => {
    try {
      // 일정 그룹 데이터 가져오기
      const groupResponse = await axios.get('/api/v1/plan-group/suji') // 닉네임은 동적으로 설정
      const groups = groupResponse.data

      // uniqueRegionIds 추출 및 지역 이름 가져오기
      const uniqueRegionIds = [
        ...new Set(groups.map((group: any) => group.regionId)),
      ]
      const regionPromises = uniqueRegionIds.map(async (regionId) => {
        const regionResponse = await axios.get(`/api/v1/region/${regionId}`)
        return { regionId, regionName: regionResponse.data.name }
      })

      const regions = await Promise.all(regionPromises)
      setUniqueRegions(regions)

      // 글 목록 설정
      setPostList(groups)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='flex w-[80vw] h-[70vh] items-center justify-center gap-16'>
        {/* 지역 버튼에 uniqueRegions 전달 */}
        <MypagePlaces
          uniqueRegions={uniqueRegions}
          onRegionSelect={setRegionId}
        />
        <div className='w-1 bg-lightGray h-full'></div>
        {/* 선택된 지역 ID에 따라 필터링된 글 목록 전달 */}
        <MypagePostList
          postList={postList.filter((post) => post.regionId === regionId)}
        />
      </div>
    </div>
  )
}

export default Mypage
