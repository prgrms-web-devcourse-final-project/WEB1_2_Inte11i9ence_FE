import React from 'react';
import Send from'@/assets/png/Send.png';
import Comment from './Comment';
const CommentSection = () => {
    return (
        <div className='mt-10'>
         {/* 댓글 입력 */}
         <h2 className='texet-xl font-bold mb-4 text-left'>댓글달기</h2>
         <div className='relative'>
    <textarea 
      className='w-full h-20 p-3 pr-12 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
    ></textarea>
    <button className='absolute bottom-7 right-3 bg-transparent border-none'>
      <img src={Send} alt="보내기버튼" className='w-6 h-6' />
    </button>
  </div>
  {/* 댓글 목록 */}
  <div className="mt-6">
        <Comment
          author="작성자"
          nickname="nickname"
          time="1시간 전"
          content="Lorem ipsum dolor sit amet consectetur..."
        />
        <Comment
          nickname="nickname"
          time="2시간 전"
          content="Lorem ipsum dolor sit amet consectetur..."
        />
      </div>
        </div>
    );
};

export default CommentSection;