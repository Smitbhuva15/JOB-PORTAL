import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from 'lucide-react';
import Login from './pages/Login';
import SingUp from './pages/SingUp';
import Jobs from './pages/Jobs';
import Browse from './pages/Browse';
import { AuthProvider } from './Context-Api/AuthContext';





const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/signup',
            element: <SingUp/>,
          },
          {
            path: '/home',
            element: <Home />,
          }, 
          
          {
            path: '/jobs',
            element: <Jobs />,
          }, 
          
          {
            path: '/browse',
            element: <Browse />,
          },
         
      ],
  },
]);

createRoot(document.getElementById('root')).render(
   <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
