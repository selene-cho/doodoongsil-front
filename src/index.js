import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Charts from './pages/Charts';
import Balloons from './pages/Balloons';
import Setting from './pages/Setting';
import Login from './pages/Login';
import KakaoLogin from './pages/KakaoLogin';
import Diary from './pages/Diary';
import DiaryFormat from './pages/DiaryFormat';
import './index.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: 'charts', element: <Charts /> },
      { path: 'balloons', element: <Balloons /> },
      { path: 'setting', element: <Setting /> },
    ],
  },
  {
    path: '/login',
    children: [
      { index: true, element: <Login /> },
      { path: 'kakao', element: <KakaoLogin /> },
    ],
  },
  { path: '/diary', element: <Diary /> },
  { path: '/diary/format', element: <DiaryFormat /> },
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
