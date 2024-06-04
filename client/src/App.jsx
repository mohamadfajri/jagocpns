import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Sidebar from './components/app/Sidebar';
import Dashboard from './pages/Dashboard';
// import DarkToggle from './components/DarkToggle';
import Mytryout from './pages/MyTryout';
import BuyTryOut from './pages/BuyTryOut';
import CheckoutBar from './pages/CheckoutBar';
import ToDashboard from './pages/ToDashboard';
import NotFound from './pages/NotFound';
import ScoreModal from './components/app/MyTryout/ScoreModal';
import TryoutModal from './components/app/MyTryout/TryoutModal';
import StartTryout from './pages/StartTryout';
import RankingPage from './pages/RankingPage';
import TopupTab from './components/app/Topup/TopupTab';
import InformationPage from './pages/InformationPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <>
      {/* <DarkToggle /> */}
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Navbar />}>
          <Route index element={<Landing />} />
        </Route>
        <Route path='app/' element={<Sidebar />}>
          <Route index element={<ToDashboard />} />
          <Route path='dashboard/' element={<Dashboard />} />
          <Route path='mytryouts/' element={<Mytryout />}>
            <Route path='score/:id/' element={<ScoreModal />} />
            <Route path='tryout/:id/' element={<TryoutModal />} />
          </Route>
          <Route path='tryoutstore/' element={<BuyTryOut />}>
            <Route path=':id/' element={<CheckoutBar />} />
          </Route>
          <Route path='ranks/' element={<RankingPage />} />
          <Route path='topup/' element={<TopupTab />} />
          <Route path='information/' element={<InformationPage />} />
          <Route path='profile/' element={<ProfilePage />} />
        </Route>
        <Route path='start-tryout/:id' element={<StartTryout />} />
      </Routes>
    </>
  );
};

export default App;
