import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
import NotFound from './pages/NotFound';
import Main from './pages/Main/Main';
import Diary from './pages/Main/Diary';
import DiaryFormat from './pages/Main/DiaryFormat';
import Charts from './pages/Charts/Charts';
import Balloons from './pages/Balloons/Balloons';
import Settings from './pages/Settings/Settings';
import EditUserInfo from './pages/Settings/EditUserInfo';
import Login from './pages/Login';
import KakaoCallback from './pages/KakaoCallback';
import './index.css';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: 'charts', element: <Charts /> },
      { path: 'balloons', element: <Balloons /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  {
    path: '/edit/user',
    element: (
      <ProtectedRoute>
        <EditUserInfo />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: 'kakao', element: <KakaoCallback /> },
    ],
  },
  {
    path: '/diary',
    element: (
      <ProtectedRoute>
        <Diary />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/diary/format',
    element: (
      <ProtectedRoute>
        <DiaryFormat />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </QueryClientProvider>,
);

serviceWorkerRegistration.register();
