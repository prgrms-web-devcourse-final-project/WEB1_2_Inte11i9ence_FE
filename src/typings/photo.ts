interface Auth {
  id: number
  username: string
  profileUrl: string
}
interface PhotoType {
  selectPostId: number
  content: string
  presignedUrls: string[]
  createdAt: string
  author: Auth
}

export default interface PhotoList {
  hasNext: boolean
  lastId: null | number
  selectPosts: PhotoType[]
}
