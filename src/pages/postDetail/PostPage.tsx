import React from 'react'
import Profile from '@/assets/png/Profile.png'
import { Eye, Star } from 'lucide-react'
import Gangwondo from '@/assets/png/Gangwondo.png'
import CommentSection from './CommentSection'

const PostPage = ({
  login, //임시로 true
  boardType = '지역게시판', // 임시
}: {
  login: boolean
  boardType: '지역게시판' | '리뷰게시판'
}) => {
  const rating = 4
  const region = '강원도'

  const tagExample = ['#경주여행', '#경주', '#효도여행', '#경주숙소추천']

  return (
    <div className='w-full flex flex-col justify-center mx-auto p-5'>
      {/* 제목 */}
      <h1 className='text-4xl mb-4'>
        오늘 여기 가보니까 좋더라구요 가보세요!!
      </h1>

      {/* 작성자 정보 */}
      <div className='flex justify-between mt-6'>
        <div className='flex justify-between items-center mb-5'>
          <div className='flex items-center'>
            <img
              src={Profile}
              alt='프로필 사진'
              className='w-16 h-16 rounded-full mr-3'
            />
            <div>
              <div className='flex'>
                <span className='text-3xl text-gray-800 ml-1'>nickname</span>
                <div className='flex gap-2 ml-4 mt-3 text-gray-500 text-sm'>
                  1시간 전 <Eye size={20} /> 100
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* 별점 or 지명, 버튼 섹션 */}
            <div className='flex justify-between items-center mb-5 '>
          <div className='flex flex-col items-end'>
            {/* 지역 게시판에서만 지역 표시 */}
            {boardType === '지역게시판' && (
              <span className='text-darkBlue border-darkBlue font-bold border-2 rounded-[0.7rem]  px-1 pb-0.5 my-0.5'>
                {region}
              </span>
            )}
          </div>

          {/* 별점 */}
          {boardType === '리뷰게시판' && (
            <div className='flex items-center gap-1 ml-auto '>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <Star
                  key={starIndex}
                  size={20}
                  className={
                    starIndex <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
          )}

          {/* 버튼 */}
          <div className='flex items-center gap-2'>
            {!login ? (
              <>
                <button className='flex items-center text-gray-500 hover:text-purple-500 ml-4'>
                  채팅하기
                </button>
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
        <div className='w-9/12 mx-auto'>
          <div className='mb-5'>
            <img
              src={Gangwondo}
              alt='강원도 이미지'
              className='w-full rounded-lg mb-10'
            />
            <p className='leading-relaxed text-left break-keep text-pretty leading-loose'>
            안녕하세요!!저는 최근에 부모님 경주 효도여행 보내드렸는데요! 경주는 부모님들이 가볼만한 관광지가 많아서 문제가 없었지만.. 가장 중요한건 숙소였답니다 ㅠㅠ
            아무래도 연세가 있으시다보니
            너무 외진 곳이나 어두운 곳은 피하고 싶었고
            펜션 내에 계단이 있거나 주변 소음이 심한 곳은
            하루 묵기 불편하시겠다 싶어서
            독채 펜션으로 알아보았구요,
            예전부터 한옥 분위기가 많이 나는 곳을 보면서
            저런곳에서 하루만 자보고싶다~
            하시던게 기억이 나서 
            한옥스테이 펜션을 찾다가
            스테이 이담 경주점이 딱이겠다는 생각이 들어서
            바로 예약을 했답니다!
            부모님께서 너무 좋아하셨던 숙소라서
            사장님께도 신경써주셔서 감사드리고
            저처럼 부모님 효도여행 
            보내드리고자 하시는 분들한테
            도움이 되면 좋을거같다는 생각에
            부모님이 보내주신 사진을 바탕으로
            후기를 간략하게 작성해보려고해요!
            [출처] 경주 황리단길 근처 예쁜 한옥 펜션 경주 효도여행 보내드렸어요 "스테이 이담 경주점"|작성자 나는야맛도리       </p>
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

      <CommentSection />
    </div>
  )
}

export default PostPage
