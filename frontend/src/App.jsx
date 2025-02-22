
import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/component/Footer'
import Navbar from './components/component/Navbar'

import { Toaster } from 'react-hot-toast';


function App() {
 

  return (
    <>
    <Navbar />
    <Outlet />
    <Toaster
  position="top-center"
  reverseOrder={true}
   />
    <Footer />
    </>
  )
}

export default App
