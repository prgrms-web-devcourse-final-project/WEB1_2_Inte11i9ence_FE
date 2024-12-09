import React from 'react'
import Profile from '@/assets/png/Profile.png'
import Like from '@/assets/png/Like.png'
import { Author } from '@/typings/post';
import { useState } from 'react';

interface CommentProps {
  author?: Author;
  nickname: string;
  time: string;
  content: string;
}

const Comment: React.FC<CommentProps> = ({
  author,
  nickname,
  time,
  content,
}) => {

  const isLion = author?.username === 'lion';
  const isJaneDoe = author?.username === 'Jane Doe';
  
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // 토글 함수
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    };

    const lionReply: CommentProps = {
      author: {
        username: 'lion',
        profileUrl: Profile, 
      },
      nickname: 'Lion',
      time: '3시간 전',
      content: '맞아요, 정말 좋은 게시물이네요!!',
    };
  
  return (
    <div
      className={`flex items-start space-x-4 border-gray-200 py-4 my-4 relative ${
        isLion ? 'bg-gray-200 p-4 ml-20 rounded-3xl' : 'border-1 px-4 rounded-3xl'
      }`}
    >
      {/* 프로필 이미지 */}
      <img
        src={author?.profileUrl || Profile}
        alt='프로필 사진'
        className='w-10 h-10 rounded-full'
      />
      <div className='flex-1 flex-col flex gap-2'>
        {/* 작성자 정보 및 버튼 */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-2 text-sm text-gray-600'>
            {author && <span className='text-DarkBlue font-bold'>{author.username}</span>}
            {!author && <span className='font-bold'>{nickname}</span>}
            <span className='text-gray-400'>· {time}</span>
          </div>
          <div className='flex space-x-2'>
            <button className='text-gray-500 hover:text-blue-500'>수정</button>
            <button className='text-gray-500 hover:text-red-500'>삭제</button>
          </div>
        </div>
        {/* 댓글 내용 */}
        <p className='mt-2 text-gray-800 text-left'>{content}</p>
        {/* 좋아요 버튼 */}
        <div className='mt-4 flex items-center space-x-4'>
          <button className='flex items-center text-gray-500 hover:text-blue-500'>
            <img src={Like} alt='좋아요 버튼' className='w-4 h-4 mr-1' />
            10
          </button>
        {/* 'Jane Doe' 댓글에만 '더보기' 버튼 추가 */}
        {isJaneDoe && (
            <button
              className='text-blue-500 hover:underline text-sm'
              onClick={toggleExpand}
            >
              {isExpanded ? '접기' : '대댓글 보기'}
            </button>
          )}
        </div>
        {/* 'Jane Doe' 댓글의 대댓글 */}
        {isJaneDoe && isExpanded && (
          <div className='mt-2 p-2 bg-gray-100 rounded-3xl ml-10 pl-8 pb-4'>
            {/* 'lion' 댓글 */}
            <div className='flex items-start space-x-4 border-gray-200 py-2 my-2 relative'>
              <img
                src={lionReply.author?.profileUrl || Profile}
                alt='프로필 사진'
                className='w-8 h-8 rounded-full'
              />
              <div className='flex-1 flex-col flex gap-1'>
                {/* 작성자 정보 */}
                <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-2 text-sm text-gray-600'>
                    {lionReply.author && (
                      <span className='text-DarkBlue font-bold'>
                        {lionReply.nickname}
                      </span>
                    )}
                    {!lionReply.author && (
                      <span className='font-bold'>{lionReply.nickname}</span>
                    )}
                    <span className='text-gray-400'>· {lionReply.time}</span>
                  </div>
                </div>
                {/* 댓글 내용 */}
                <p className='mt-1 text-gray-800 text-left'>
                  {lionReply.content}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Comment
