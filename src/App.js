// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import HowToPlay from './Components/HowToPlay/HowToPlay';
import Registration from './Components/CreateAccount/Registration';
import Login from './Components/Login/Login';
import UserProfile from './Components/UserProfile/UserProfile';
import DashboardMain from './Components/Dashboard/DashboardMain';
import GlobalLeaderboard from './Components/GlobalLeaderboard/GlobalLeaderboard';
import UpcomingFightsUser from "./Components/UpcomingFights/UpcomingFights";
import YourFights from './Components/YourFights/YourFights';
import Admin from './Components/Admin/Admin';
import AdminLogin from './Components/Login/AdminLogin';
import AdminHeader from './Components/Header/AdminHeader';
import UpcomingFights from './Components/Admin/UpcomingFights';
import AdminPredictions from './Components/Admin/AdminPredictions';
import AddNewMatch from './Components/Admin/AddNewMatch';
import PlayForFree from './Components/PlayForFree/PlayForFree';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'; // Import PrivateRoute

function AppContent() {
  const location = useLocation();

  const showPublicHeader = !location.pathname.startsWith('/administration') && location.pathname !== '/administration/login';
  const showAdminHeader = location.pathname.startsWith('/administration') && location.pathname !== '/administration/login';
  const showFooter = !location.pathname.startsWith('/administration') && location.pathname !== '/administration/login';

  return (
    <>
      {showPublicHeader && <Header />}
      {showAdminHeader && <AdminHeader />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HowToPlay" element={<HowToPlay />} />
        <Route path="/CreateAccount" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/UserDashboard" element={<PrivateRoute element={<DashboardMain />} />} />
        <Route path="/leaderboard" element={<GlobalLeaderboard />} />
        <Route path="/YourFights" element={<YourFights />} />
        <Route path="/PlayForFree" element={<PlayForFree />} />
        <Route path='/upcomingfights'  element={<PrivateRoute element={<UpcomingFightsUser />} />} />
        <Route path="/administration" element={<Admin />} />
        <Route path="/administration/login" element={<AdminLogin />} />
        <Route path="/administration/upcomingFights" element={<UpcomingFights />} />
        <Route path="/administration/predictions" element={<AdminPredictions />} />
        <Route path='/administration/AddNewMatch' element={<AddNewMatch />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
