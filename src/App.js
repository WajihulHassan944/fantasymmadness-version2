import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import HowToPlay from './Components/HowToPlay/HowToPlay';
import Registration from './Components/CreateAccount/Registration';
import Login from './Components/Login/Login';
import UserProfile from './Components/UserProfile/UserProfile';
import DashboardMain from './Components/Dashboard/DashboardMain';
import GlobalLeaderboard from './Components/GlobalLeaderboard/GlobalLeaderboard';
import UpcomingFightsUser from './Components/UpcomingFights/UpcomingFights';
import YourFights from './Components/YourFights/YourFights';
import Admin from './Components/Admin/Admin';
import AdminLogin from './Components/Login/AdminLogin';
import AdminHeader from './Components/Header/AdminHeader';
import UpcomingFights from './Components/Admin/UpcomingFights';
import AdminPredictions from './Components/Admin/AdminPredictions';
import AddNewMatch from './Components/Admin/AddNewMatch';
import PlayForFree from './Components/PlayForFree/PlayForFree';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import PrivateRouteAdmin from './Components/PrivateRoute/PrivateRouteAdmin';
import FightLeaderboard from './Components/GlobalLeaderboard/FightLeaderboard';
import PreviousMatches from './Components/Admin/PreviousMatches';
import DeleteFights from './Components/Admin/DeleteFights';
import RegisteredUsers from './Components/Admin/RegisteredUsers';
import FinishedFightUserBoard from './Components/FinishedFightUserBoard/FinishedFightUserBoard';
import PublicProfile from './Components/UserProfile/PublicProfile';
import AffiliateUsers from './Components/Admin/AffiliateUsers';
import AffiliateMatches from './Components/Admin/AffiliateMatches';
import PrivacyPolicy from './Components/LegalDocuments/PrivacyPolicy';
import Termsofservice from './Components/LegalDocuments/Termsofservice';
import { setUser } from './Redux/userSlice';
import { fetchUser } from './Redux/authSlice';
import { setAdminAuthenticated } from './Redux/adminAuthSlice';
import { setAffiliateUser } from './Redux/affiliateSlice';
import { fetchAffiliate } from './Redux/affiliateAuthSlice';
import AffiliateDashboard from './Components/Affiliates/AffiliateDashboard';
import HowItWorks from './Components/Affiliates/HowItWorks';
import AffiliateProfile from './Components/Affiliates/AffiliateProfile';
import Calandar from './Components/Admin/Calandar';
import EmailTemplate from './Components/Admin/EmailTemplate';
import Promo from './Components/Affiliates/Promo';
import ShadowFightsLibrary from './Components/Admin/ShadowFightsLibrary';
import Contact from './Components/Footer/Contact';
import ReactHowler from 'react-howler';
import mainAudio from './main.mp3'; // Replace with actual path

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.music.isPlaying);
  useEffect(() => {
    const userToken = localStorage.getItem('authToken');
    if (userToken) {
      dispatch(setUser({ token: userToken }));
      dispatch(fetchUser(userToken));
    }

    const affiliateToken = localStorage.getItem('affiliateAuthToken');
    if (affiliateToken) {
      dispatch(setAffiliateUser({ token: affiliateToken }));
      dispatch(fetchAffiliate(affiliateToken));
    }

    const adminToken = localStorage.getItem('adminAuthToken');
    if (adminToken) {
      dispatch(setAdminAuthenticated({ token: adminToken }));
    }
  }, [dispatch]);

  const showPublicHeader = !location.pathname.startsWith('/administration') && location.pathname !== '/administration/login';
  const showAdminHeader = location.pathname.startsWith('/administration') && location.pathname !== '/administration/login';
  const showFooter = !location.pathname.startsWith('/administration') && location.pathname !== '/administration/login';
  const isAdministrationRoute = location.pathname.startsWith('/administration');
  
  return (
    <>
     {!isAdministrationRoute && isPlaying && (
        <ReactHowler
          src={mainAudio}
          playing={true}
          loop={true}
          volume={0.5}
        />
      )}
      
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
        <Route path="/upcomingfights" element={<UpcomingFightsUser />} />
        <Route path="/fightLeaderboard" element={<FightLeaderboard />} />
        <Route path="/FinishedFight" element={<FinishedFightUserBoard />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<Termsofservice />} />
        <Route path="/:userId" element={<PublicProfile />} />
        <Route path="/administration/login" element={<AdminLogin />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/AffiliateDashboard" element={<AffiliateDashboard />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/AffiliateProfile" element={<AffiliateProfile />} />

        <Route path="/administration/upcomingFights" element={<PrivateRouteAdmin element={<UpcomingFights />} />} />
        <Route path="/administration/predictions" element={<PrivateRouteAdmin element={<AdminPredictions />} />} />
        <Route path="/administration/AddNewMatch" element={<PrivateRouteAdmin element={<AddNewMatch />} />} />
        <Route path="/administration/PreviousMatches" element={<PrivateRouteAdmin element={<PreviousMatches />} />} />
        <Route path="/administration/DeleteMatches" element={<PrivateRouteAdmin element={<DeleteFights />} />} />
        <Route path="/administration" element={<PrivateRouteAdmin element={<Admin />} />} />
        <Route path="/administration/RegisteredUsers" element={<PrivateRouteAdmin element={<RegisteredUsers />} />} />
        <Route path="/administration/AffiliateUsers" element={<PrivateRouteAdmin element={<AffiliateUsers />} />} />
        <Route path="/administration/ShadowFightsLibrary" element={<PrivateRouteAdmin element={<ShadowFightsLibrary />} />} />

        <Route path="/administration/AffiliateMatches" element={<PrivateRouteAdmin element={<AffiliateMatches />} />} />
        <Route path="/administration/Calendar" element={<PrivateRouteAdmin element={<Calandar />} />} />
        <Route path="/administration/Email" element={<PrivateRouteAdmin element={<EmailTemplate />} />} />
        <Route path="/:matchName/:firstName" element={<Promo />} />
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
