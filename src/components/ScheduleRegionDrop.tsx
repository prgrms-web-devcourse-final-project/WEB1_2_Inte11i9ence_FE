import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DropdownSelector from './DropdownSelector'

// RegionDropdownProps 인터페이스 정의
interface RegionDropdownProps {
  onRegionChange: (selectedRegionId: string | number) => void
}

const ScheduleRegionDrop: React.FC<RegionDropdownProps> = ({
  onRegionChange,
}) => {
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([])

  // 지역 목록 가져오기
  const fetchRegions = async () => {
    try {
      const response = await axios.get('/api/v1/region')
      const regionsData = response.data
      const allRegions = [{ id: 0, name: '지역 전체' }, ...regionsData]
      setRegions(allRegions)
    } catch (error) {
      console.error('Error fetching regions:', error)
    }
  }

  useEffect(() => {
    fetchRegions()
  }, [])

  const options = regions.map((region) => ({
    value: region.id,
    label: region.name,
  }))

  return (
    <DropdownSelector
      options={options}
      defaultValue={0}
      onChange={(selected: string | number) => onRegionChange(selected)} // 타입 맞추기
    />
  )
}

export default ScheduleRegionDrop
