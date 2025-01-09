import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './Redux/store';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { GoogleOAuthProvider } from '@react-oauth/google';
// Initialize AOS
AOS.init({ duration: 1000 });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="261076841125-1n3ps24u5fco1js6o1u212nac7agp9dg.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
