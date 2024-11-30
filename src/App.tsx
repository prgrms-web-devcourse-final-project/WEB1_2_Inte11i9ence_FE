import './App.css'
import Navigation from './pages/Navigater/Navigater'
import SchedulePage from './pages/SchedulePage/SchedulePage'
import ScheduleAdd from './pages/SchedulePage/ScheduleAdd'
import ScheduleDetail from './pages/SchedulePage/ScheduleDetail'
import Mypage from './pages/Mypage/Mypage'
import MypageGather from './pages/Mypage/MypageGather'
import PhotoPage from './pages/PhotoPage/PhotoPage'
import PhotoAdd from './pages/PhotoPage/PhotoAdd'
import ChatPage from './pages/ChatPage/ChatPage'

import { Routes, Route } from 'react-router-dom'
import Container from './layouts/bodyContainer'

import MainPage from './pages/MainPage/MainPage'

// import PostPage from './components/PostPage'
import PostPage from './pages/postDetail/PostPage'

import BestPage from './pages/BestPage/BestPage'
import PostListPage from './pages/PostListPage/PostListPage'

const App = () => {
  return (
    <div>
      <Container>
        <Navigation />
        <Routes>
          {/* 일정 공유 페이지 */}
          <Route
            path='/schedule'
            element={<SchedulePage />}
          ></Route>
          <Route
            path='/schedule/add'
            element={<ScheduleAdd />}
          ></Route>
          <Route
            path='/schedule/detail'
            element={<ScheduleDetail />}
          ></Route>
          {/* 메인페이지 */}
          <Route
            path='/'
            element={<MainPage />}
          ></Route>
          {/* 베스트 페이지 */}
          <Route
            path='/bestpage'
            element={<BestPage />}
          ></Route>
          {/* 통합 게시판 페이지 */}
          <Route
            path='/postlist'
            element={<PostListPage />}
          ></Route>
          {/* 마이페이지 */}
          <Route
            path='/mypage'
            element={<Mypage />}
          ></Route>
          <Route
            path='/mypage/gather'
            element={<MypageGather />}
          ></Route>
          {/* 사진페이지 */}
          <Route
            path='/photo'
            element={<PhotoPage />}
          ></Route>
          <Route
            path='/photo/add'
            element={<PhotoAdd />}
          ></Route>
          {/* 채팅페이지 */}
          <Route
            path='/chat'
            element={<ChatPage />}
          ></Route>
          {/* {포스트상세페이지} */}
            <Route
            path='/postpage'
            element={<PostPage/>}
          ></Route>

        </Routes>
      </Container>
    </div>
  )
}

export default App
