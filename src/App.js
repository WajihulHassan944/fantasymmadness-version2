import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import HowToPlay from './Components/HowToPlay/HowToPlay';
import Registration from './Components/CreateAccount/Registration';
import Login from './Components/Login/Login';
import UserProfile from './Components/UserProfile/UserProfile';
import DashboardMain from './Components/Dashboard/DashboardMain';
import GlobalLeaderboard from './Components/GlobalLeaderboard/GlobalLeaderboard';
import YourFights from './Components/YourFights/YourFights';

function App() {
  return (
<>

<div className="App">
      
<Router>

<Header />

<Routes>

<Route path="/" element={ <Home /> } ></Route>
<Route path="/HowToPlay" element={ <HowToPlay /> } ></Route>
<Route path="/CreateAccount" element={ <Registration /> } ></Route>
<Route path="/login" element={ <Login /> } ></Route>
<Route path="/profile" element={ <UserProfile /> } ></Route>
<Route path="/UserDashboard" element={ <DashboardMain /> } ></Route>
<Route path="/leaderboard" element={ <GlobalLeaderboard /> } ></Route>
<Route path="/YourFights" element={ <YourFights /> } ></Route>

</Routes>


<Footer />
</Router>



    </div>

    </>
  );
}

export default App;
