import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AffiliateFightLeaderboard from "@/Components/Affiliates/AffiliateFightLeaderboard";
import "../../../Components/Affiliates/promo.css";
const index = ({ affiliate, matchData }) => {
  const router = useRouter();
  const { matchName, fullName } = router.query;
  const [isMobile, setIsMobile] = useState(false);
  const [navigateDashboard, setNavigateDashboard] = useState(null);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        await fetch(
          `https://fantasymmadness-game-server-three.vercel.app/affiliate/${affiliate._id}/incrementViews`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (error) {
        console.error("Error incrementing view count:", error);
      }
    };

    if (affiliate) {
      incrementViews();
    }
  }, [affiliate]);

  const handleJoinLeague = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.open("/login", "_blank");
      return;
    }

    const { _id: userId, email: userEmail } = user;

    try {
      const response = await fetch(
        `https://fantasymmadness-game-server-three.vercel.app/affiliate/${affiliate._id}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, userEmail }),
        }
      );

      if (response.ok) {
        alert("Successfully joined the league");
        window.location.reload();
      } else {
        const data = await response.json();
        alert(`${data.message}`);
        router.push("/UserDashboard");
      }
    } catch (error) {
      console.error("Error joining league:", error);
    }
  };

  if (navigateDashboard) {
    return <AffiliateFightLeaderboard matchId={navigateDashboard} />;
  }

  if (!matchData || !affiliate) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="promotional-updated-design">
        <div className="fighter-images-promotional">
          <div className="img-container">
            <img src={matchData.fighterAImage} alt={matchData.matchFighterA} />
          </div>
          <div className="img-container">
            <img src={matchData.fighterBImage} alt={matchData.matchFighterB} />
          </div>
        </div>

        <div className="fighters-names">
          <h1>
            {isMobile ? matchData.matchFighterA.split(" ")[0] : matchData.matchFighterA}
          </h1>
          <h2>VS</h2>
          <h1>
            {isMobile ? matchData.matchFighterB.split(" ")[0] : matchData.matchFighterB}
          </h1>
        </div>

        <h1 className="category">
          {matchData.matchCategoryTwo ? matchData.matchCategoryTwo : matchData.matchCategory}
        </h1>
        <h1 className="type">{affiliate.firstName}</h1>
        <h2 className="round-show">${matchData.matchTokens} Ticket Hurry Up</h2>

        <div className="title-wrap">
          <img src="https://res.cloudinary.com/dqi6vk2vn/image/upload/v1743307001/home/ssticbvxqjqkwjmdwpnn.png" className="fancy-title-img" />
          <h1 className="fancy-title">
            POT: ${matchData.pot}, Max Rounds: {matchData.maxRounds}
          </h1>
        </div>

        <h3 className="second-last" onClick={handleJoinLeague}>
          Join {affiliate.firstName}'s league
        </h3>
        <p className="lastp">Affiliate: {affiliate.firstName} - Free Signup</p>
      </div>

      {matchData.matchPromotionalVideoUrl && (
        <div className="videoContainer">
          <video className="responsiveVideo" controls>
            <source src={matchData.matchPromotionalVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  );
};

// ✅ Fetch data on the server side
export const getServerSideProps = async ({ params }) => {
  const { matchName, fullName } = params;

  try {
    // Fetch affiliate data
    const affiliateRes = await fetch(
      `https://fantasymmadness-game-server-three.vercel.app/affiliateByName?fullName=${encodeURIComponent(
        fullName
      )}`
    );
    const affiliate = await affiliateRes.json();

    if (!affiliateRes.ok || !affiliate) {
      return { notFound: true };
    }

    // Fetch matches data
    const matchesRes = await fetch(
      "https://fantasymmadness-game-server-three.vercel.app/match"
    );
    const matches = await matchesRes.json();

    // Find the match related to this affiliate
    const matchData = matches.find(
      (m) => m.matchName === matchName && m.affiliateId === affiliate._id
    );

    if (!matchData) {
      return { notFound: true };
    }

    return {
      props: {
        affiliate,
        matchData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};

export default index;
