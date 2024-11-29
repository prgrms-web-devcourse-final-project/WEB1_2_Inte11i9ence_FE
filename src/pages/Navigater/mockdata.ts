export const mockMember = {
  id: 4,
  oauthId: 'naver asodfweoqofsdobsfdofsjofdsoasdf',
  name: '홍길동',
  email: 'testuser@naver.com',
  username: '홍길동',
  role: 'ROLE_USER',
  profileImage: null,
  createdAt: '2024-11-27T15:50:02.629299',
  updatedAt: '2024-11-27T15:50:02.629338',
}

export const mockNotifications = [
  {
    id: 1,
    member_id: 1,
    content: '부산 여행기 게시글에 댓글이 달렸습니다',
    type: 'likes',
    viewed: 0,
    sent_at: '2024-11-22T09:00:00',
    created_at: '2024-11-18T09:05:00',
  },
  {
    id: 2,
    member_id: 2,
    content: '서울 여행기 게시글에 좋아요가 눌렸습니다',
    type: 'likes',
    viewed: 0,
    sent_at: '2024-11-18T10:00:00',
    created_at: '2024-11-18T10:05:00',
  },
  {
    id: 3,
    member_id: 1,
    content: '강릉 여행기 게시글에 댓글이 달렸습니다',
    type: 'comment',
    viewed: 0,
    sent_at: '2024-11-18T11:00:00',
    created_at: '2024-11-18T11:05:00',
  },
  {
    id: 4,
    member_id: 3,
    content: '새로운 공지가 달렸습니다',
    type: 'announcement',
    viewed: 1,
    sent_at: '2024-11-18T12:00:00',
    created_at: '2024-11-18T12:05:00',
  },
  {
    id: 5,
    member_id: 2,
    content: '부산 여행기 게시글에 댓글이 달렸습니다',
    type: 'comment',
    viewed: 1,
    sent_at: '2024-11-18T13:00:00',
    created_at: '2024-11-18T13:05:00',
  },
]
