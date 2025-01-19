
import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/component/Footer'
import Navbar from './components/component/Navbar'


function App() {
 

  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default App
