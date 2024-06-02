import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Sidebar from './components/app/Sidebar';
import Dashboard from './pages/Dashboard';
// import DarkToggle from './components/DarkToggle';
import Mytryout from './pages/MyTryout';

const App = () => {
  return (
    <>
      {/* <DarkToggle /> */}
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Landing />} />
        </Route>
        <Route path='app/' element={<Sidebar />}>
          <Route path='dashboard/' element={<Dashboard />} />
          <Route path='mytryouts/' element={<Mytryout />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
