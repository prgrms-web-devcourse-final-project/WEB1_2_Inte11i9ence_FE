// 전체 게시글 조회 응답 타입 정의
// commnetCount : API 명세서에 없음 - 임시로 추가
export interface AllPostData {
  id: number
  title: string
  content: string
  imageUrl: string
  nickname: string
  likes: number
  views: number
  createdAt: string
  commentCount: number
  category: string
}

// 특정 게시글 - 작성자 타입 정의
export interface Author {
  memberId: number
  name: string
}

// 특정 게시글 - 댓글 타입 정의
export interface Comment {
  commentId: number
  content: string
  author: Author
  createdAt: string
}

//

// 특정 게시글 조회 응답 타입
export interface SinglePostData {
  postId: number
  title: string
  content: string
  category: string
  imageUrl: string
  likes: number
  views: number
  commentCount: number
  createdAt: string
  updatedAt: string
  nickname: string
  comments: Comment[]
}

// 전체 게시글 조회 응답 타입 정의
// export interface AllPostsResponse {
//   content: BasePostData[]; // "전체 게시글 조회" 데이터
//   pageable: Pageable;
//   totalPages: number;
//   totalElements: number;
//   last: boolean;
//   first: boolean;
//   sort: Sort;
//   numberOfElements: number;
//   size: number;
//   number: number;
//   empty: boolean;
// }

// // 전체 게시글 - 정렬 관련 타입 정의 (삭제)
// export interface Sort {
//   sorted: boolean;
//   unsorted: boolean;
//   empty: boolean;
// }

// // 전체 게시글 - 페이지 정보 타입 정의 (삭제)
// export interface Pageable {
//   sort: Sort;
//   pageNumber: number;
//   pageSize: number;
//   offset: number;
//   paged: boolean;
//   unpaged: boolean;
// }
