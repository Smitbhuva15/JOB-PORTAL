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
import Profile from './pages/profile/Profile';
import JobDetail from './pages/jobs/JobDetail';
import Compnies from './pages/admin/Compnies';
import CompaniesCreate from './pages/admin/CompaniesCreate';
import CompaniesManage from './pages/admin/CompaniesManage';
import { Adminjob } from './pages/admin/Adminjob';
import AdminCreatJob from './pages/admin/AdminCreatJob';
import AdminApplicaton from './pages/admin/AdminApplicaton';
import Updatejob from './pages/admin/Updatejob';
import ProtectedRoutes from './pages/admin/ProtectedRoutes';








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
          {
            path: '/jobs/Detail/:id',
            element: <JobDetail />,
          },
          {
            path: '/admin/compnies',
            element:<ProtectedRoutes> <Compnies /></ProtectedRoutes>,

          },
          {
            path: '/admin/add/company',
            element: <ProtectedRoutes><CompaniesCreate /></ProtectedRoutes>,

          },
          {
            path: '/admin/setup/company/:id',
            element: <ProtectedRoutes><CompaniesManage /></ProtectedRoutes>,

          },
          {
            path: '/admin/jobs',
            element: <ProtectedRoutes><Adminjob /></ProtectedRoutes>,

          },
          {
            path: '/admin/add/job',
            element:<ProtectedRoutes> <AdminCreatJob /></ProtectedRoutes>,

          },
          {
            path: '/admin/get/applicant/:id',
            element: <ProtectedRoutes><AdminApplicaton /></ProtectedRoutes>,

          },
          {
            path: '/admin/update/:id',
            element: <ProtectedRoutes><Updatejob /></ProtectedRoutes>,

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
