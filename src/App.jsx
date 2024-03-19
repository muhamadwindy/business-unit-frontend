import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MonitoringPages from './pages/Monitoring';
import UploadLargeFilePage from './pages/UploadLargeFile';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/upload', element: <UploadLargeFilePage /> },
      { path: '/monitoring', element: <MonitoringPages /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  ,
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
