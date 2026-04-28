
import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/component/Footer'
import Navbar from './components/component/Navbar'

import { Toaster } from 'react-hot-toast';


import { ThemeProvider } from './components/ThemeProvider'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="job-portal-theme">
      <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
        <Toaster position="top-center" reverseOrder={true} />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
