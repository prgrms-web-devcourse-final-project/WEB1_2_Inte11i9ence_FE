export interface Auth {
  id: number
  username: string
  profileUrl: string
}

export interface PhotoType {
  selectPostId: number
  content: string
  presignedUrls: string[]
  createdAt: string
  author: Auth
}

export interface PhotoList {
  hasNext: boolean
  lastId: null | number
  selectPosts: PhotoType[]
}

export interface PhotoDetailProp {
  selectPostId: number
  content: string
  presignedUrls: string[]
  createAt: string
  author: Auth
}
