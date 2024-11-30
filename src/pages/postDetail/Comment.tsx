import React from 'react';
import Profile from '@/assets/png/Profile.png';
import Like from '@/assets/png/Like.png';

type CommentProps = {
  author?: string;
  nickname: string;
  time: string;
  content: string;
};

const Comment: React.FC<CommentProps> = ({ author, nickname, time, content }) => {
  return (
    <div className="flex items-start space-x-4 border-b border-gray-200 py-4">
      {/* 프로필 이미지 */}
      <img src={Profile} alt="프로필 사진" className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        {/* 작성자 정보 */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          {author && <span className="text-red-500 font-bold">{author}</span>}
          <span>{nickname}</span>
          <span className="text-gray-400">· {time}</span>
        </div>
        {/* 댓글 내용 */}
        <p className="mt-2 text-gray-800 text-left" >{content}</p>
        {/* 액션 버튼 */}
        <div className="mt-4 flex items-center space-x-4">
          <button className="flex items-center text-gray-500 hover:text-blue-500">
            수정
          </button>
          <button className="flex items-center text-gray-500 hover:text-red-500">
            삭제
          </button>
          <button className="flex items-center text-gray-500 hover:text-blue-500">
            <img src={Like} alt="좋아요 버튼" className="w-4 h-4 mr-1" />
            10
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
