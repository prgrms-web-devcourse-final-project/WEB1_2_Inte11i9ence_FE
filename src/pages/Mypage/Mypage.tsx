import MypagePlaces from './MypagePlaces'
import MypagePostList from './MypagePostList'
import { useState } from 'react'

// 해당 페이지는 마이페이지 목록에 존재하는 "내 여행" 페이지이면서 동시에 다른 유저가 프로필 타고 들어 왔을 때 보여줄 페이지.
// 다만 다른 유저일 경우 해당 페이지에 다른 유저가 쓴 글을 모아볼 수 있는 컴포넌트가 필요.
const Mypage = () => {
  //예시 지역 ID
  const [regionId, setRegionId] = useState<number>(1)

  return (
    <div className='flex justify-center items-center w-full '>
      <div className='flex w-[80vw] h-[70vh] items-center justify-center gap-16'>
        <MypagePlaces onRegionSelect={setRegionId} />
        <div className='w-1 bg-lightGray h-full'></div>
        <MypagePostList regionId={regionId} />
      </div>
    </div>
  )
}

export default Mypage
