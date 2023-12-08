import { Outlet } from 'react-router-dom';

import Navbar from './components/shared/Navbar';

function App() {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <Outlet />
      <Navbar />
    </div>
  );
}

export default App;
