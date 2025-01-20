
import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/component/Footer'
import Navbar from './components/component/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
 

  return (
    <>
    <Navbar />
    <Outlet />
    <ToastContainer 
    position="top-center"
    autoClose={3000}
    />
    <Footer />
    </>
  )
}

export default App
