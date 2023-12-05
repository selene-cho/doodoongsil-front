import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
}

export default App;
