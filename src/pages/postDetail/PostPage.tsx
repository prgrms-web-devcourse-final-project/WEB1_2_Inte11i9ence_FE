import React from 'react'
import Profile from '@/assets/png/Profile.png'
import { Eye, Star } from 'lucide-react'
import Gangwondo from '@/assets/png/Gangwondo.png'
import CommentSection from './CommentSection'
import { useParams } from 'react-router-dom'
import { postData } from '@/temporaryData/allPostData'
import { useState, useEffect } from 'react'
import { AllPostData } from '@/typings/post'
import formatTime from '@/utils/formatTime'
import { Link } from 'react-router-dom'

const PostPage = ({
  login, //임시로 true
  // boardType = '지역게시판', // 임시
}: {
  login: boolean
  boardType: '지역게시판' | '리뷰게시판'
}) => {
  // const rating = 4
  // const region = '강원도'
  const tagExample = ['#국내여행', '#한국', '#힐링여행', '#국내여행지추천']
  const { id } = useParams()
  const [postInfo, setPostInfo] = useState<AllPostData | null>(null)
  const [postCategory, setPostCategory] = useState<string>('')
  const [rating, setRating] = useState<number>(0)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '자유':
        return 'text-lightBlue border-lightBlue'
      case '리뷰':
        return 'text-yellow-500 border-yellow-500'
      case '공지':
        return 'text-pink-500 border-pink-500'
      default:
        return 'text-darkBlue border-darkBlue'
    }
  }

  useEffect(() => {
    const foundPost = postData.find((post) => post.id === Number(id))
    setPostInfo(foundPost || null)
    setPostCategory(foundPost?.category || '')
    setRating(foundPost?.rating || 0)
  }, [id])

  return (
    <div className='w-full flex flex-col justify-center mx-20 p-5'>
      {/* 제목 */}
      <h1 className='text-4xl mb-4'>{postInfo?.title}</h1>

      {/* 작성자 정보 */}
      <div className='flex justify-between mt-6'>
        <div className='flex justify-between items-center mb-5'>
          <div className='flex items-center gap-2'>
            <img
              src={postInfo?.author.profileUrl || Profile}
              alt='프로필 사진'
              className='w-10 h-10 rounded-full'
            />
            <div>
              <div className='flex flex-col items-start'>
                <span className='text-xl font-bold text-gray-800 '>
                  {postInfo?.author.username}
                </span>
                <div className='flex gap-1 text-gray-500 text-sm'>
                  {postInfo?.postedAt && formatTime(postInfo.postedAt)}{' '}
                  <Eye size={20} /> {postInfo?.views}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 별점 or 지명, 버튼 섹션 */}
        <div className='flex justify-between items-center mb-5 '>
          <div className='flex flex-col items-end'>
            {/* 지역 게시판에서만 지역 표시 */}
            {rating === 0 && (
              <span
                className={` ${getCategoryColor(postInfo?.category || '')} font-bold border-2 rounded-[0.7rem]  px-1 pb-0.5 my-0.5`}
              >
                {postCategory}
              </span>
            )}
          </div>

          {/* 별점 */}
          {rating !== 0 && (
            <div className='flex items-center gap-1 ml-auto '>
              {/* {[1, 2, 3, 4, 5].map((starIndex) => (
                <Star
                  key={starIndex}
                  size={20}
                  className={
                    starIndex <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))} */}
              <span
                className={`flex ${getCategoryColor(postInfo?.category || '')} font-bold border-2 rounded-[0.7rem]  px-1 pb-0.5 my-0.5`}
              >
                <Star
                  key={rating}
                  size={20}
                  className={'fill-yellow-400 text-yellow-400 pt-1'}
                />
                {rating.toFixed(1)}
              </span>
            </div>
          )}

          {/* 버튼 */}
          <div className='flex items-center gap-2'>
            {!login ? (
              <>
                <Link
                  to='/chat'
                  className='flex items-center text-gray-500 hover:text-purple-500 ml-4'
                >
                  채팅하기
                </Link>
                <button className='flex items-center text-gray-500 hover:text-green-500'>
                  스크랩
                </button>
              </>
            ) : (
              <>
                <button className='flex items-center text-gray-500 hover:text-blue-500  ml-4'>
                  수정
                </button>
                <button className='flex items-center text-gray-500 hover:text-red-500'>
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 게시물 내용 */}
      <div className='border-b border-lightgray mb-20'></div>
      <div className='w-[89%] mx-auto'>
        <div className='mb-5'>
          <img
            src={postInfo?.photoUrl || Gangwondo}
            alt='게시글 이미지'
            className='w-full rounded-lg mb-10'
          />
          <p className='leading-relaxed text-left break-keep text-pretty leading-loose'>
            {postInfo?.content}{' '}
          </p>
        </div>
        {/* 태그 */}
        <div className='flex flex-wrap gap-2 mt-20'>
          {tagExample.map((tag) => (
            <span
              key={tag}
              className='text-gray-500 cursor-pointer bg-blue-100 px-3 py-1 rounded-full'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {postInfo && <CommentSection comments={postInfo.comments} />}
    </div>
  )
}

export default PostPage
