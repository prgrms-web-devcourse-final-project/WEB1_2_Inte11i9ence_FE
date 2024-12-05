// path와 thumbnail은 임시로 넣어둔 데이터입니다. (현재 API 명세서에 없음)
export interface RegionData {
  id: number
  name: string
  path: string
  thumbnail?: string
}

//일정 공유에서 사용하는 region 그룹
export interface Plan {
  planId: number
  groupId: number
  location: string
  content: string
  latitude: number // 위도
  longitude: number // 경도
  planDate: string
  createdAt: string
  updatedAt: string
}

export interface Group {
  groupId: number
  memberId: number
  regionId: number
  title: string
  groupImgUrl: string
  views: number
  likes: number
  replies: number
  createdAt: string
  updatedAt: string
  details: Plan[] // details는 Plan 객체 배열
}
