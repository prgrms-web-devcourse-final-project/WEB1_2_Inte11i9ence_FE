import { SinglePostData } from "@/typings/post";

export const eachPostData: SinglePostData[] = [
    // "전체 게시글 조회" 데이터
     {
     postId: 1,
     title: '제주 여행 후기 🍊',
     content: '제주도 여행 후기입니다.',
     category: "자유",
     imageUrl: 'https://picsum.photos/550/150',
     likes: 44,
     views: 100,
     commentCount: 2,
     createdAt: "2024-11-19T12:34:56",
     updatedAt: "2024-11-19T12:34:56", 
     nickname: '김코딩',
     comments: [
        {
            "commentId": 1,
            "content": "댓글 내용 1",
            "author": {
              "memberId": 789,
              "name": "Jane Doe"
            },
            "createdAt": "2024-11-19T12:35:00"
          },
          {
            "commentId": 2,
            "content": "댓글 내용 2",
            "author": {
              "memberId": 1011,
              "name": "Tom Lee"
            },
            "createdAt": "2024-11-19T12:36:10"
          }
     ]

 },
     {
     postId: 1,
     title: '두바이 여행 후기 🏜',
     content: '두바이 여행 후기입니다.',
     category: "자유",
     imageUrl: 'https://picsum.photos/550/150',
     likes: 25,
     views: 73,
     commentCount: 1,
     createdAt: "2024-11-19T12:34:56",
     updatedAt: "2024-11-19T12:34:56", 
     nickname: '김코딩',
     comments: [
        {
            "commentId": 1,
            "content": "댓글 내용 1",
            "author": {
              "memberId": 789,
              "name": "Jane Doe"
            },
            "createdAt": "2024-11-19T12:35:00"
          }
     ]

 },
     {
     postId: 1,
     title: '런던 여행 후기',
     content: '런던 여행 후기입니다.',
     category: "자유",
     imageUrl: 'https://picsum.photos/550/150',
     likes: 44,
     views: 100,
     commentCount: 2,
     createdAt: "2024-11-19T12:34:56",
     updatedAt: "2024-11-19T12:34:56", 
     nickname: '김코딩',
     comments: [
        {
            "commentId": 1,
            "content": "댓글 내용 1",
            "author": {
              "memberId": 789,
              "name": "Jane Doe"
            },
            "createdAt": "2024-11-19T12:35:00"
          },
          {
            "commentId": 2,
            "content": "댓글 내용 2",
            "author": {
              "memberId": 1011,
              "name": "Tom Lee"
            },
            "createdAt": "2024-11-19T12:36:10"
          }
     ]

 },
     {
     postId: 1,
     title: '부산 여행 후기 🌊',
     content: '부산 여행 후기입니다.',
     category: "자유",
     imageUrl: 'https://picsum.photos/550/150',
     likes: 44,
     views: 70,
     commentCount: 3,
     createdAt: "2024-11-21T12:34:56",
     updatedAt: "2024-11-21T12:34:56", 
     nickname: '김코딩',
     comments: [
        {
            "commentId": 1,
            "content": "댓글 내용 1",
            "author": {
              "memberId": 789,
              "name": "Jane Doe"
            },
            "createdAt": "2024-11-19T12:35:00"
          },
          {
            "commentId": 2,
            "content": "댓글 내용 2",
            "author": {
              "memberId": 1011,
              "name": "Tom Lee"
            },
            "createdAt": "2024-11-19T12:36:10"
          },
          {
            "commentId": 3,
            "content": "댓글 내용 3",
            "author": {
              "memberId": 1004,
              "name": "Sam Kim"
            },
            "createdAt": "2024-11-19T12:37:10"
          }
     ]

 },
     {
     postId: 5,
     title: '오사카 여행 후기 🏯',
     content: '오사카 여행 후기입니다.',
     category: "자유",
     imageUrl: 'https://picsum.photos/550/150',
     likes: 22,
     views: 100,
     commentCount: 2,
     createdAt: "2024-11-25T12:34:56",
     updatedAt: "2024-11-25T12:34:56", 
     nickname: '김코딩',
     comments: [
        {
            "commentId": 1,
            "content": "댓글 내용 1",
            "author": {
              "memberId": 789,
              "name": "Jane Doe"
            },
            "createdAt": "2024-11-19T12:35:00"
          },
          {
            "commentId": 2,
            "content": "댓글 내용 2",
            "author": {
              "memberId": 1011,
              "name": "Tom Lee"
            },
            "createdAt": "2024-11-19T12:36:10"
          }
     ]

 },
]