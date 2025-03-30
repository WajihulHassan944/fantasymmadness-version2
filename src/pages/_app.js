import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "../Redux/store"; // Updated for next-redux-wrapper
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/Redux/userSlice";
import { setAffiliateUser } from "@/Redux/affiliateSlice";
import { setAdminAuthenticated } from "@/Redux/adminAuthSlice";
import { fetchUser } from "@/Redux/authSlice";
import { fetchAffiliate } from "@/Redux/affiliateAuthSlice";
import { playMusic, stopMusic } from "@/Redux/musicSlice";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest); // Wrapped store for SSR

  return (
    <>
      <Head>
        {/* Font Awesome Latest */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        {/* Older Font Awesome Version */}
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>

      <GoogleOAuthProvider clientId="261076841125-1n3ps24u5fco1js6o1u212nac7agp9dg.apps.googleusercontent.com">
        <Provider store={store}>
          <AppContent>
            <Component {...props.pageProps} />
          </AppContent>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

function AppContent({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.music.isPlaying);
  const seekPosition = useSelector((state) => state.music.seekPosition);
  const howlerRef = useRef(null);

  // Paths where Header & Footer should NOT be displayed
  const hideLayout =
    router.pathname.startsWith("/administration") ||
    router.pathname === "/administration/login";

  useEffect(() => {
    if (!router.isReady) return;

    setTimeout(() => {
      const header = document.querySelector(".header");
      if (!header) return;

      const handleScroll = () => {
        if (window.scrollY > 0) {
          header.style.backgroundColor = "black";
        } else {
          const darkRoutes = [
            "/community-forum", "/Sponsors", "/guides", "/our-fighters",
            "/faqs", "/about", "/past-fights-records", "/fights-rewards",
            "/sponsor-dashboard", "/global-leaderboard", "/testimonials",
            "/spin-wheel", "/calendar-of-fights", "/AffiliateDashboard",
            "/past-fights", "/HowItWorks", "/affiliate-league"
          ];

          const redRoutes = ["/fights-news"];

          if (darkRoutes.includes(router.pathname)) {
            header.style.backgroundColor = "#000000";
          } else if (redRoutes.includes(router.pathname)) {
            header.style.backgroundColor = "#dc1606";
          } else {
            header.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
          }
        }
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, 100);
  }, [router.pathname, router.isReady]);

  useEffect(() => {
    const userToken = typeof window !== "undefined" && localStorage.getItem("authToken");
    if (userToken) {
      dispatch(setUser({ token: userToken }));
      dispatch(fetchUser(userToken));
    }

    const affiliateToken = typeof window !== "undefined" && localStorage.getItem("affiliateAuthToken");
    if (affiliateToken) {
      dispatch(setAffiliateUser({ token: affiliateToken }));
      dispatch(fetchAffiliate(affiliateToken));
    }

    const adminToken = typeof window !== "undefined" && localStorage.getItem("adminAuthToken");
    if (adminToken) {
      dispatch(setAdminAuthenticated({ token: adminToken }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isPlaying && howlerRef.current) {
      console.log("Seeking to position:", seekPosition);
      howlerRef.current.seek(seekPosition);
    }
  }, [isPlaying, seekPosition]);

  const getOrCreateDeviceId = () => {
    let deviceId = typeof window !== "undefined" && localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = crypto.randomUUID(); // Generate unique ID
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  };

  // Track page view (instead of clicks)
  useEffect(() => {
    const deviceId = getOrCreateDeviceId();

    fetch("https://fantasymmadness-game-server-three.vercel.app/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId }), // Send deviceId
    }).catch((err) => console.error("Error tracking page view:", err));
  }, []); // Runs only on mount

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      const currentSeek = howlerRef.current?.seek() || 0;
      console.log("Stopping music. Current seek position:", currentSeek);
      dispatch(stopMusic(currentSeek));
    } else {
      console.log("Playing music from position:", seekPosition);
      dispatch(playMusic());
    }
  };

  return (
    <>
     <ToastContainer />
   
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
