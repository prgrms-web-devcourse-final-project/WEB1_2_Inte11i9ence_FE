export interface ChatRoom {
  id: number
  creatorId: number
  participantId: number
  creatorName: string
  participantName: string
  status: string
  createdAt: string
  updatedAt: string
  otherNickName: string
  otherProfileImg: string
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}