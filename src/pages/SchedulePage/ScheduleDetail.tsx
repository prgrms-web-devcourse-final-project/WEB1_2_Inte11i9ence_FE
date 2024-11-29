import SchedulePlan from './components/SchedulePlan'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import LikeIcon from '@assets/svg/Like.svg?react'
import CommentIcon from '@assets/svg/Comment.svg?react'

const ScheduleDetail = () => {
  return (
    <div className='flex-col flex gap-12'>
      <div className='flex h-[70vh] '>
        <div className='flex-[4] flex-col overflow-y-auto overflow-x-hidden '>
          <div className='font-bold text-2xl'>제목제목제목제목</div>
          <button className='border border-darkBlue px-2 py-0.5 mx-4 flex justify-start rounded-lg text-xs font-normal text-darkBlue '>
            서울{' '}
          </button>
          <div className='flex justify-between px-4 py-3 items-center align-center'>
            <div className='flex items-center gap-2 '>
              <div className='w-8 h-8 rounded-full overflow-hidden'>
                <img
                  src={defaultProfileImage}
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex flex-col justify-start items-start'>
                <p className='text-sm font-bold text-black'>닉네임</p>
                <div className='flex text-[10px] text-darkGray '>
                  <p>1시간 전</p>
                  <p>100</p>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center align-center gap-2 text-darkGray pb-4 text-xs mx-5'>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>

          <div className='flex flex-col relative gap-4 overflow-y-auto overflow-x-hidden max-w-full'>
            <SchedulePlan />
          </div>
        </div>
        <div className='flex flex-[5]  bg-darkGray'>오른쪽 지도</div>
      </div>
      <div className='w-full '>
        <div className='flex items-center gap-1'>
          <div className='text-darkGray'>
            <LikeIcon
              width={13}
              height={13}
            />
          </div>
          <span className='text-darkGray'>10</span>
          <div className='text-darkGray'>
            <CommentIcon
              width={14}
              height={14}
            />
          </div>
          <span className='text-darkGray'>10</span>
        </div>
      </div>
    </div>
  )
}
export default ScheduleDetail
//필요한 거: 지역, 제목, 글쓴 날짜, 조회수, 좋아요, 댓글
//수정 삭제 대신 상세설명 보기 ->> 나중에 지도에서 버튼 눌러서 모달로 봐도 좋ㅇ르듯
