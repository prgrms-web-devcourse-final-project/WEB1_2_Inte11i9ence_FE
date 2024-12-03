// 회원 정보 조회
export interface MemberProps {
  id: number
  oauthId: string
  name: string
  email: string
  username: string
  role: string
  profileImage: string | null
  createdAt: string
  updatedAt: string
  profileUrl: string | null
}
