import './App.css'
import Navigation from './pages/Navigater/Navigater'
import SchedulePage from './pages/SchedulePage/SchedulePage'
import { Routes, Route } from 'react-router-dom'
import Container from './layouts/bodyContainer'
import MainPage from './pages/MainPage/MainPage'
const App = () => {
  return (
    <div>
      <Container>
        <Navigation />
        <Routes>
          <Route
            path='/schedule'
            element={<SchedulePage />}
          ></Route>
          <Route
            path='/'
            element={<MainPage />}
          ></Route>
        </Routes>
      </Container>
    </div>
  )
}

export default App
