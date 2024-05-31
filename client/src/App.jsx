import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Sidebar from './components/app/Sidebar';
import Dashboard from './pages/Dashboard';
import DarkToggle from './components/DarkToggle';

const App = () => {
  return (
    <>
      <DarkToggle />
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Landing />} />
        </Route>
        <Route path='app/' element={<Sidebar />}>
          <Route path='dashboard/' element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
