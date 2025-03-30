import React, { useEffect, useRef } from "react";
import Head from "next/head"; // Next.js alternative for Helmet
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image"; // Next.js optimized images
import Link from "next/link"; // Next.js routing
import MoneyOne from "../../src/Assets/money1.png"; // Next.js requires assets in the public folder
import MoneyTwo from "../../src/Assets/money2.png";
import styles from "@/styles/Home.module.css"; // Using module CSS
import { playMusic, stopMusic } from "@/Redux/musicSlice";

const Home = () => {
  const dispatch = useDispatch();
  const howlerRef = useRef(null);
  const isPlaying = useSelector((state) => state.music.isPlaying); // Redux state

  useEffect(() => {
    const currentSeek = howlerRef.current?.seek() || 0;
    dispatch(stopMusic(currentSeek));

    return () => {
      dispatch(playMusic());
    };
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Fantasy MMA Madness - Home</title>
        <meta name="description" content="Experience the thrill of combat sports like Boxing, MMA, Kickboxing, and Bare Knuckle. Join now and claim your $20 free tokens today!" />
        <meta property="og:title" content="Fantasy MMA Madness - Thrill of Combat" />
        <meta property="og:description" content="Experience the thrill of combat sports like Boxing, MMA, Kickboxing, and Bare Knuckle. Join now and claim your $20 free tokens today!" />
        <meta property="og:url" content="https://fantasymmadness.com/" />
        <meta name="keywords" content="MMA, Fantasy Sports, Boxing, Kickboxing, Bare Knuckle, Combat Sports, Free Tokens, Fantasy MMA Madness" />
      </Head>

      <div className={styles.homeFirst}>
        <h1 data-aos="zoom-out">The thrill of combat</h1>
        <h2 data-aos="zoom-out">
          Boxing, MMA,
          Kickboxing<br /> & Bare knuckle
        </h2>

        <div className="video-embed-wrapper">
          <div className="no-hover">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/C5wHWEzPrrs?autoplay=1&loop=1&playlist=C5wHWEzPrrs&controls=0&modestbranding=1&rel=0&fs=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className={styles.thirdHomePageSection}>
        <Image src={MoneyOne} className={styles.moneyone} alt="money" />
        <Image src={MoneyTwo} className={styles.moneytwo} alt="money" />
        <h1 className={styles.thirdHomePageHeading}>🎉 Welcome, NEW USERS! 🎉</h1>
        <h2 className={styles.thirdHomePageSubheading}>Claim Your $20 Tokens Free Today!</h2>
        <p className={styles.thirdHomePageDescription}>Join the action now and kickstart your journey in Fantasy MMA Madness with an exclusive bonus!</p>
        <Link href="/CreateAccount">
          <button className={styles.thirdHomePageButton}>Sign Up Now 🚀</button>
        </Link>
      </div>

    </>
  );
};

export default Home;
