import React from 'react';
import Profile from '@/assets/png/Profile.png';
import { Eye, Star } from 'lucide-react';
import Gangwondo from '@/assets/png/Gangwondo.png';
import CommentSection from './CommentSection';

const PostPage = ({
  login,     //임시로 true
  boardType = '리뷰게시판',// 임시
}: {
  login: boolean;
  boardType: '지역게시판' | '리뷰게시판';
}) => {
  const rating = 4;
  const region = '강원도';

  return (
    <div className="max-w-2xl mx-auto p-5">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-4">
        오늘 여기 가보니까 좋더라구요 가보세요!!
      </h1>

      {/* 작성자 정보 */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <img
            src={Profile}
            alt="프로필 사진"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <span className="font-bold text-xl text-gray-800">nickname</span>
            <div className="flex items-center gap-2 text-gray-500">
              1시간 전 <Eye size={20} /> 100
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          {/* 지역 게시판에서만 지역 표시 */}
          {boardType === '지역게시판' && (
            <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm">
              {region}
            </span>
          )}
        </div>
      </div>

      {/* 별점 및 버튼 섹션 */}
      <div className="flex justify-between items-center mb-5 ">
        {/* 별점 */}
        {boardType === '리뷰게시판' && (
          <div className="flex items-center gap-1 ml-auto ">
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
        <div className="flex items-center gap-2">
          {!login ? (
            <>
              <button className="flex items-center text-gray-500 hover:text-purple-500 ml-4">
                채팅하기
              </button>
              <button className="flex items-center text-gray-500 hover:text-green-500">
                스크랩
              </button>
            </>
          ) : (
            <>
              <button className="flex items-center text-gray-500 hover:text-blue-500  ml-4">
                수정
              </button>
              <button className="flex items-center text-gray-500 hover:text-red-500">
                삭제
              </button>
            </>
          )}
        </div>
      </div>

      {/* 게시물 내용 */}
      <div className="border-b border-gray-500 my-11"></div>
      <div className="mb-5">
        <img
          src={Gangwondo}
          alt="강원도 이미지"
          className="w-full rounded-lg mb-4"
        />
        <p className="leading-relaxed text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod beatae
          aut cum deleniti ex laborum quas eius nisi sunt! Culpa debitis
          accusantium eligendi ipsum nam! Animi expedita esse ex delectus!
        </p>
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="text-gray-500 cursor-pointer bg-blue-100 rounded-full">
          #태그예시
        </span>
        <span className="text-gray-500 cursor-pointer bg-blue-100 rounded-full">
          #태그예시
        </span>
        <span className="text-gray-500 cursor-pointer bg-blue-100 rounded-full">
          #태그예시
        </span>
        <span className="text-gray-500 cursor-pointer bg-blue-100 rounded-full">
          #태그예시
        </span>
      </div>

      <CommentSection />
    </div>
  );
};

export default PostPage;
