import { Outlet } from 'react-router-dom';

import Navbar from './components/shared/Navbar';

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Outlet />
      <Navbar />
    </div>
  );
}

export default App;
