
import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/component/Footer'
import Navbar from './components/component/Navbar'
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/ThemeProvider'
import { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { setSavedJobs } from './store/jobSlice'
import { AuthContext } from './Context-Api/AuthContext'

function App() {
  const { userData } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?._id) {
      try {
        const item = localStorage.getItem(`job-portal-saved-jobs_${userData._id}`);
        if (item) {
          dispatch(setSavedJobs(JSON.parse(item)));
        } else {
          dispatch(setSavedJobs([]));
        }
      } catch (error) {
        dispatch(setSavedJobs([]));
      }
    } else {
      dispatch(setSavedJobs([]));
    }
  }, [userData?._id, dispatch]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="job-portal-theme">
      <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
        <Toaster position="bottom-right" richColors theme="system" />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
