import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import  Home  from './pages/Home';
import Login from './pages/Login';
import SingUp from './pages/SingUp';
import Jobs from './pages/Jobs';
import Browse from './pages/Browse';
import { AuthProvider } from './Context-Api/AuthContext';
import store from './store/store';
import { Provider } from 'react-redux';
import Profile from './pages/profile/profile';





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
          {
            path: '/profile',
            element: <Profile />,
          },
         
      ],
  },
]);

createRoot(document.getElementById('root')).render(
   <AuthProvider>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </AuthProvider>
)
