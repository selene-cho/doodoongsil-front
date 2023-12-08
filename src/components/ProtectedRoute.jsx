import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to="login" />;
  }

  return children;
}
