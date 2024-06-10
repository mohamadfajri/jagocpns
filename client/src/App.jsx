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
import AdminSidebar from './pages/admin/AdminSidebar';
import AdminDashboard from './pages/admin/AdminDashboard';
import CrudUser from './pages/admin/CrudUser';
import CrudTryoutList from './pages/admin/CrudTryoutList';
import TopupManager from './pages/admin/TopupManager';
import LoginForm from './pages/auth/LoginForm';
import SignupForm from './pages/auth/SignupForm';
import ProtectedRoute from './middleware/ProtectedRoute';
import SignOut from './pages/auth/SignOut';
import AdminRoute from './middleware/AdminRoute';
import LoginFormAdmin from './pages/admin/auth/LoginFormAdmin';
import SignOutAdmin from './pages/admin/auth/SignOutAdmin';
import SignupFormAdmin from './pages/admin/auth/SignupFormAdmin';
import LoginFormQuestioner from './pages/questioner/auth/LoginFormQuestioner';
import SignOutQuestioner from './pages/questioner/auth/SignOutQuestioner';
import TryoutReview from './pages/TryoutReview';
import QuestionerDashboard from './pages/questioner/QuestionerDashboard';
import TryoutEditor from './pages/questioner/TryoutEditor';

const App = () => {
  return (
    <>
      {/* <DarkToggle /> */}
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Navbar />}>
          <Route index element={<Landing />} />
        </Route>
        <Route
          path='app/*'
          element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          }
        >
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
        <Route path='admin/auth/signin' element={<LoginFormAdmin />} />
        <Route path='admin/auth/signout' element={<SignOutAdmin />} />
        <Route path='admin/auth/signup' element={<SignupFormAdmin />} />
        <Route
          path='questioner/auth/signin'
          element={<LoginFormQuestioner />}
        />
        <Route path='questioner/auth/signout' element={<SignOutQuestioner />} />
        <Route path='questioner/dashboard' element={<QuestionerDashboard />} />
        <Route path='questioner/editor' element={<TryoutEditor />} />
        <Route
          path='admin/*'
          element={
            <AdminRoute>
              <AdminSidebar />
            </AdminRoute>
          }
        >
          <Route path='dashboard/' element={<AdminDashboard />} />
          <Route path='crud/user/' element={<CrudUser />} />
          <Route path='crud/tryout/' element={<CrudTryoutList />} />
          <Route path='topup-manager/' element={<TopupManager />} />
        </Route>
        <Route path='start-tryout/:id' element={<StartTryout />} />
        <Route path='review/:id' element={<TryoutReview />} />
        <Route path='auth/signin' element={<LoginForm />} />
        <Route path='auth/signup' element={<SignupForm />} />
        <Route path='auth/signout' element={<SignOut />} />
      </Routes>
    </>
  );
};

export default App;
