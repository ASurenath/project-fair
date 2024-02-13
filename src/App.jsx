import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tockenAuthContext } from './Context/TokenAuth'



function App() {
  const {isLoggedin,setIsLoggedin}=useContext(tockenAuthContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth insideLogin/>}/>
        <Route path='/register' element={<Auth insideRegister/>}/>
        <Route path='/dashboard' element={isLoggedin?<Dashboard/>:<Navigate to={'/'}/>}/>
        <Route path='/projects' element={isLoggedin?<Projects/>:<Navigate to={'/'}/>}/>
        <Route path='/*' element={<Navigate to={'/'}/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
