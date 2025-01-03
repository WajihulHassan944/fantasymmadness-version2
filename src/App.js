import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
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
import YoutubeArchive from './Components/Admin/YoutubeArchive';
import AffiliateAllFightPromotion from './Components/Affiliates/AffiliateAllFightPromotion';
import AffiliateAllPromos from './Components/Affiliates/AffiliateAllPromos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransactionList from './Components/CreateAccount/TransactionList';
import AdminRecords from './Components/Admin/AdminRecords';
import Leagues from './Components/Dashboard/Leagues';
import AffiliateCreateAccount from './Components/Affiliates/AffiliateCreateAccount';
import DynamicPromoImage from './Components/Affiliates/DynamicPromoImage';
import AffiliatesPayouts from './Components/Admin/AffiliatesPayouts';
import ResetPassword from './Components/Affiliates/ResetPassword';
import NonRegisteredUsers from './Components/Admin/NonRegisteredUsers';
import ThreadList from './Components/Forum/ThreadList';
import ThreadDetails from './Components/Forum/ThreadDetails';
import CreateThread from './Components/Forum/CreateThread';
import AdminForumList from './Components/Admin/AdminForumList';
import AdminForumThreadDetails from './Components/Admin/AdminForumThreadDetails';
import TrashedFights from './Components/YourFights/TrashedFights';
import SuspendedAccounts from './Components/Admin/SuspendedAccounts';
import AffiliatePodcasts from './Components/Admin/AffiliatePodcasts';
import Sponsors from './Components/Home/Sponsors';
import Guide from './Components/Dashboard/Guide';
import Pastfights from './Components/UpcomingFights/Pastfights';
import Fighters from './Components/Home/Fighters';
import AffiliateGuide from './Components/Affiliates/AffiliateGuide';
import PlayImg from "./Assets/play.png";
import PauseImg from "./Assets/pause.png";
import { playMusic, stopMusic } from "./Redux/musicSlice"; // Update the path as needed
import FrequentAskedQuestions from './Components/Footer/FrequentAskedQuestions';
import CommunityRules from './Components/Forum/CommunityRules';
import About from './Components/Footer/About';
import ThankyouPurchaseTokens from './Components/Dashboard/ThankyouPurchaseTokens';
import PromoAdminPage from './Components/Admin/PromoAdminPage';
import PastFightVideos from './Components/Home/PastFightVideos';
import Rewards from './Components/Home/Rewards';
import AdminFaqs from './Components/Admin/AdminFaqs';
import AdminNews from './Components/Admin/AdminNews';
import NewsFeed from './Components/Footer/NewsFeed';
import AdminSponsor from './Components/Admin/AdminSponsor';
import SponsorDashboard from './Components/Home/SponsorDashboard';
import HomeLeaderboard from './Components/GlobalLeaderboard/HomeLeaderboard';
import Testimonials from './Components/Home/Testimonials';
import HomeAnother from './Components/HomeAnother/HomeAnother';

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.music.isPlaying);
  const seekPosition = useSelector((state) => state.music.seekPosition);
  
  // Set header background color and active link style based on route
useEffect(() => {
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 0) {
      header.style.backgroundColor = 'black';
    } else {
      if (location.pathname === '/community-forum') {
        header.style.backgroundColor = 'rgba(0,0,0,0.2)';
      } else if (location.pathname === '/Sponsors') {
        header.style.backgroundColor = '#000000';
      } else if (location.pathname === '/guides') {
        header.style.backgroundColor = '#000000';
      }else if (location.pathname === '/our-fighters') {
        header.style.backgroundColor = '#000000';
      }else if (location.pathname === '/faqs') {
        header.style.backgroundColor = '#000000';
      }else if (location.pathname === '/about') {
        header.style.backgroundColor = '#000000';
      }else if (location.pathname === '/past-fights-records') {
        header.style.backgroundColor = '#000000';
      } else if (location.pathname === '/fights-rewards') {
        header.style.backgroundColor = '#000000';
      }
      else if (location.pathname === '/sponsor-dashboard') {
        header.style.backgroundColor = '#000000';
      }
      
    else if (location.pathname === '/global-leaderboard') {
      header.style.backgroundColor = '#000000';
    }
    else if (location.pathname === '/testimonials') {
      header.style.backgroundColor = '#000000';
    }
    else if (location.pathname === '/fights-news') {
      header.style.backgroundColor = '#dc1606';
    }else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      }
    }
  };
 
  if (header) {
    // Set initial background color and active link color based on location
    if (location.pathname === '/community-forum') {
      header.style.backgroundColor = 'rgba(0,0,0,0.2)';
    } else if (location.pathname === '/Sponsors') {
      header.style.backgroundColor = '#000000';
    } else if (location.pathname === '/guides') {
      header.style.backgroundColor = '#000000';
    }else if (location.pathname === '/our-fighters') {
      header.style.backgroundColor = '#000000';
    }else if (location.pathname === '/faqs') {
      header.style.backgroundColor = '#000000';
    }else if (location.pathname === '/about') {
      header.style.backgroundColor = '#000000';
    }else if (location.pathname === '/past-fights-records') {
      header.style.backgroundColor = '#000000';
    }else if (location.pathname === '/fights-rewards') {
      header.style.backgroundColor = '#000000';
    }
    else if (location.pathname === '/fights-news') {
      header.style.backgroundColor = '#dc1606';
    }
    else if (location.pathname === '/sponsor-dashboard') {
      header.style.backgroundColor = '#000000';
    }
    else if (location.pathname === '/global-leaderboard') {
      header.style.backgroundColor = '#000000';
    }
    
    else if (location.pathname === '/testimonials') {
      header.style.backgroundColor = '#000000';
    }
    
     else {
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    }
  }

  if (header) {
    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);
  }

  // Clean up event listener on component unmount
  return () => {
    if (header) {
      window.removeEventListener('scroll', handleScroll);
    }
  };
}, [location.pathname]); // Run effect whenever the pathname changes


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

  useEffect(() => {
    if (isPlaying && howlerRef.current) {
      console.log("Seeking to position:", seekPosition); // Debugging
      howlerRef.current.seek(seekPosition); // Explicitly set the playback position
    }
  }, [isPlaying, seekPosition]);

  useEffect(() => {
    const trackClick = () => {
      fetch('https://fantasymmadness-game-server-three.vercel.app/track-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((err) => console.error('Error tracking click:', err));
    };
  
    document.addEventListener('click', trackClick);
  
    return () => {
      document.removeEventListener('click', trackClick); // Clean up on unmount
    };
  }, []);
  

  const showPublicHeader = !location.pathname.startsWith('/administration') && location.pathname !== '/administration/login';
  const showAdminHeader = location.pathname.startsWith('/administration') && location.pathname !== '/administration/login';
  const showFooter = !location.pathname.startsWith('/administration') && location.pathname !== '/administration/login';
  const isAdministrationRoute = location.pathname.startsWith('/administration');
  const howlerRef = useRef(null); 


  const handleTogglePlayPause = () => {
    if (isPlaying) {
      const currentSeek = howlerRef.current?.seek() || 0; // Get current playback position
      console.log("Stopping music. Current seek position:", currentSeek);
      dispatch(stopMusic(currentSeek)); // Save the position and stop music
    } else {
      console.log("Playing music from position:", seekPosition);
      dispatch(playMusic());
    }
  };


  return (
    <>
    <ToastContainer />
      {!isAdministrationRoute && isPlaying && (
        <ReactHowler
        ref={howlerRef}
          src={mainAudio}
          playing={isPlaying}
          volume={0.3}
          onEnd={() => dispatch(stopMusic(0))} // Stop music and reset seek when audio ends
        />
      )}

      {!showAdminHeader && (
          <div className='playpause'>
          <img
            src={isPlaying ? PauseImg : PlayImg}
            alt={isPlaying ? "Pause" : "Play"}
            style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer" }}
            onClick={handleTogglePlayPause}
          />
          
           
          </div>
        )}
    

        {showPublicHeader && <Header />}
      {showAdminHeader && <AdminHeader />}
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomeAnother />} />
      
        <Route path="/HowToPlay" element={<HowToPlay />} />
        <Route path="/Sponsors" element={<Sponsors />} />
        <Route path="/CreateAccount" element={<Registration />} />
        <Route path="/AffiliateCreateAccount" element={<AffiliateCreateAccount />} />
        <Route path="/dynamopromoimg" element={<DynamicPromoImage />} />
        <Route path="/community-forum" element={<ThreadList />} />
        <Route path="/threads/:threadId" element={<ThreadDetails />} />
        <Route path="/create-thread" element={<CreateThread />} />
        <Route path="/past-fights" element={<Pastfights />} />
        <Route path="/our-fighters" element={<Fighters />} />
        <Route path="/faqs" element={<FrequentAskedQuestions />} />
        <Route path="/forum-rules" element={<CommunityRules />} />
        <Route path="/about" element={<About />} />
        <Route path="/thank-you" element={<ThankyouPurchaseTokens />} />
        <Route path="/fights-rewards" element={<Rewards />} />
        <Route path="/global-leaderboard" element={<HomeLeaderboard />} />
        <Route path="/testimonials" element={<Testimonials />} />

        
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/UserDashboard" element={<PrivateRoute element={<DashboardMain />} />} />
        <Route path="/trashed-fights" element={<PrivateRoute element={<TrashedFights />} />} />
        <Route path="/guides" element={<PrivateRoute element={<Guide />} />} />
        <Route path="/affiliate-guides" element={<AffiliateGuide />} />
        <Route path="/fights-news" element={<NewsFeed />} />
       
        
        <Route path="/myLeagueRecords" element={<PrivateRoute element={<Leagues />} />} />
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
        <Route path="/transaction" element={<TransactionList />} />
        <Route path="/past-fights-records" element={<PastFightVideos />} />
        <Route path="/sponsor-dashboard" element={<SponsorDashboard />} />

        <Route path="/AffiliateDashboard" element={<AffiliateDashboard />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/AffiliateProfile" element={<AffiliateProfile />} />
        <Route path="/AffiliatePromotion" element={<AffiliateAllFightPromotion />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/resetPassword-user/:token" element={<ResetPassword />} />
        
        <Route path="/administration/upcomingFights" element={<PrivateRouteAdmin element={<UpcomingFights />} />} />
        <Route path="/administration/predictions" element={<PrivateRouteAdmin element={<AdminPredictions />} />} />
        <Route path="/administration/AddNewMatch" element={<PrivateRouteAdmin element={<AddNewMatch />} />} />
        <Route path="/administration/PreviousMatches" element={<PrivateRouteAdmin element={<PreviousMatches />} />} />
        <Route path="/administration/DeleteUpdateMatches" element={<PrivateRouteAdmin element={<DeleteFights />} />} />
        <Route path="/administration" element={<PrivateRouteAdmin element={<Admin />} />} />
        <Route path="/administration/RegisteredUsers" element={<PrivateRouteAdmin element={<RegisteredUsers />} />} />
        <Route path="/administration/AffiliateUsers" element={<PrivateRouteAdmin element={<AffiliateUsers />} />} />
        <Route path="/administration/ShadowFightsLibrary" element={<PrivateRouteAdmin element={<ShadowFightsLibrary />} />} />
        <Route path="/administration/YoutubeArchive" element={<PrivateRouteAdmin element={<YoutubeArchive />} />} />
        <Route path="/affiliate/:affiliateName" element={<AffiliateAllPromos />} />
      
<Route path="/administration/adminRecords" element={<PrivateRouteAdmin element={<AdminRecords />} />} />     
<Route path="/administration/payouts" element={<PrivateRouteAdmin element={<AffiliatesPayouts />} />} />
<Route path="/administration/non-registered-users" element={<PrivateRouteAdmin element={<NonRegisteredUsers />} />} />
<Route path="/administration/Community" element={<PrivateRouteAdmin element={<AdminForumList />} />} />
<Route path="/administration/threads/:threadId" element={<PrivateRouteAdmin element={<AdminForumThreadDetails />} />} />
<Route path="/administration/suspended-accounts" element={<PrivateRouteAdmin element={<SuspendedAccounts />} />} />
<Route path="/administration/podcasts" element={<PrivateRouteAdmin element={<AffiliatePodcasts />} />} />
<Route path="/administration/faqs" element={<PrivateRouteAdmin element={<AdminFaqs />} />} />
<Route path="/administration/news" element={<PrivateRouteAdmin element={<AdminNews />} />} />
<Route path="/administration/sponsors" element={<PrivateRouteAdmin element={<AdminSponsor />} />} />

       
        <Route path="/administration/AffiliateMatches" element={<PrivateRouteAdmin element={<AffiliateMatches />} />} />
        <Route path="/administration/Calendar" element={<PrivateRouteAdmin element={<Calandar />} />} />
        <Route path="/administration/Email" element={<PrivateRouteAdmin element={<EmailTemplate />} />} />
        <Route path="/shadow/:matchName/:fullName" element={<Promo />} />
        <Route path="/live/:id" element={<PromoAdminPage />} />
       
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
