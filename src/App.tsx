import './App.css'
import Container from './layouts/bodyContainer'
import LoginPage from './components/LoginPage'
import Profile from './components/Profile'
import MainLogin from './components/MainLogin'


const App = () => {
  return (
    <Container>
    <div className="h-full">
    {/* <LoginPage/> */}
   {/* <Profile/> */}
   <MainLogin/>
      
    </div>
    </Container>
  )
}

export default App
