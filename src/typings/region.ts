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

interface Author {
  username: string
  profileUrl: null | string
}

export interface Group {
  groupId: number
  author: Author
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
