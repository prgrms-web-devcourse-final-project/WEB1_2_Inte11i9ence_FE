import SchedulePlan from './components/SchedulePlan'
import defaultProfileImage from '@assets/png/default-profile-2.png'
import LikeIcon from '@assets/svg/Like.svg?react'
import CommentIcon from '@assets/svg/Comment.svg?react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Group } from '@/typings/region'
import formatTime from '@/utils/formatTime'
import { Eye } from 'lucide-react'

const ScheduleDetail = () => {
  const [groupDetail, setGroupDetail] = useState<Group>({} as Group)
  useEffect(() => {
    const fetchGroupDetail = async () => {
      try {
        //1부분 그룹아이디 url에서 받아와야함
        const response = await axios.get(
          'https://fed8aa8a-b229-4c7b-ba68-4a6376b3ab56.mock.pstmn.io/api/v1/plangroup/1',
        )
        setGroupDetail(response.data)
      } catch (error) {
        console.error('error', error)
      }
    }
    fetchGroupDetail()
  }, [])
  return (
    <div className='flex-col flex gap-12'>
      <div className='flex h-[70vh] '>
        <div className='flex-[4] flex-col overflow-y-auto overflow-x-hidden '>
          <div className='font-bold text-2xl'>{groupDetail.title}</div>
          <div className='flex justify-between px-4 py-3 items-center align-center'>
            <div className='flex items-center gap-2 '>
              <div className='w-8 h-8 rounded-full overflow-hidden'>
                <img
                  src={groupDetail?.author?.profileUrl || defaultProfileImage}
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex flex-col justify-start items-start'>
                <p className='text-sm font-bold text-black'>
                  {groupDetail?.author?.username}
                </p>
                <div className='flex text-[10px] text-darkGray gap-1 '>
                  <p>{formatTime(groupDetail.createdAt)}</p>
                  <div className='flex gap-[2px]'>
                    <Eye
                      width={14}
                      height={15}
                    />
                    <p>{groupDetail.views}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex '>
              <span
                className={`border-2 rounded-[0.7rem]  px-1 pb-0.5 my-0.5 border-darkBlue text-darkBlue font-bold text-[14px]`}
              >
                서울
              </span>
              <div className='flex justify-center items-center align-center gap-2 text-darkGray text-xs mx-2'>
                <div className='flex  justify-center align-center gap-1'>
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col relative gap-4 overflow-y-auto overflow-x-hidden max-w-full'>
            <SchedulePlan details={groupDetail.details} />
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
          <span className='text-darkGray'>{groupDetail.likes}</span>
          <div className='text-darkGray'>
            <CommentIcon
              width={14}
              height={14}
            />
          </div>
          <span className='text-darkGray'>{groupDetail.replies}</span>
        </div>
      </div>
    </div>
  )
}
export default ScheduleDetail
//필요한 거: 지역, 제목, 글쓴 날짜, 조회수, 좋아요, 댓글
//수정 삭제 대신 상세설명 보기 ->> 나중에 지도에서 버튼 눌러서 모달로 봐도 좋ㅇ르듯
