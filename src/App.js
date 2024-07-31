import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import HowToPlay from './Components/HowToPlay/HowToPlay';

function App() {
  return (
<>

<div className="App">
      
<Router>

<Header />

<Routes>

<Route path="/" element={ <Home /> } ></Route>
<Route path="/HowToPlay" element={ <HowToPlay /> } ></Route>

</Routes>


<Footer />
</Router>



    </div>

    </>
  );
}

export default App;
