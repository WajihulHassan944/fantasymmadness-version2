import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import Glove from "../../Assets/newFightDetails/glove.png";

const data = [
  { option: "$0 Won", value: 0, style: { backgroundColor: "#FF4500", textColor: "#FFF", boxShadow: "inset 0 0 10px #FF5733" } },
  { option: "$3 Won", value: 3, style: { backgroundColor: "#1FAA59", textColor: "#FFF", boxShadow: "inset 0 0 10px #33FF57" } },
  { option: "$5 Won", value: 5, style: { backgroundColor: "#4169E1", textColor: "#FFF", boxShadow: "inset 0 0 10px #3357FF" } },
  { option: "$10 Won", value: 10, style: { backgroundColor: "#9B30FF", textColor: "#FFF", boxShadow: "inset 0 0 10px #F333FF" } },
  { option: "$7 Won", value: 7, style: { backgroundColor: "#FFD700", textColor: "#000", boxShadow: "inset 0 0 10px #FFBD33" } },
  { option: "$200", value: 200, style: { backgroundColor: "#00CED1", textColor: "#000", boxShadow: "inset 0 0 10px #33FFF3" } },


  { option: "$1 Won", value: 1, style: { backgroundColor: "#6c2123", textColor: "#fff", boxShadow: "inset 0 0 10px #FFBD33" } },
  { option: "$2 Won", value: 2, style: { backgroundColor: "#391b39", textColor: "#fff", boxShadow: "inset 0 0 10px #FFBD33" } },
  { option: "$4 Won", value: 4, style: { backgroundColor: "#c33f4d", textColor: "#fff", boxShadow: "inset 0 0 10px #FFBD33" } },

];

const SpinWheel = () => {
  const [winner, setWinner] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const deviceId = navigator.userAgent; // Get device ID

  useEffect(() => {
    checkDevice(); // Check if device has already played
  }, []);

  // ✅ Check if user has already played
  const checkDevice = async () => {
    try {
      const response = await fetch("https://fantasymmadness-game-server-three.vercel.app/admin/device-info-spin-wheel");
      const data = await response.json();
      const isMatched = data.some((item) => item.deviceId === deviceId);

      if (isMatched) {
        document.getElementById("spin-button").style.display = "none";
        document.getElementById("played").style.display = "block";
      } else {
        document.getElementById("spin-button").style.display = "block";
      }
    } catch (error) {
      console.error("Error fetching device info:", error);
    }
  };

  // ✅ Handle Spin Click
  const handleSpinClick = async () => {
    if (spinning) return;
    setSpinning(true);

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const sendDeviceInfoToBackend = async () => {
    try {
      await fetch("https://fantasymmadness-game-server-three.vercel.app/admin/add-device-spin-wheel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId }),
      });
    } catch (error) {
      console.error("Error sending device info:", error);
    }
  };


  // ✅ Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email!");

    const prizeValue = data[prizeNumber].value; // Get numerical prize value
    console.log({ email, deviceId, results: prizeValue });

    // 📌 Send Token Info to Backend
    await fetch("https://fantasymmadness-game-server-three.vercel.app/admin/add-tokens-won-spin-wheel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, deviceId, results: prizeValue }),
    });
    alert("Tokens successfully claimed!");
    checkDevice();
    setShowForm(false); // Hide form after submission
  };

  return (
    <div className="sponsors-wrap" style={{ background: "#fff", paddingTop: "140px", paddingBottom: "0", minHeight: "80vh" }}>
      {/* Form (Only Show if Prize is Not $0) */}
      {showForm && (
        <div className="form-container">
          <h1>You have {winner} tokens. Please enter your email below.</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      <img src="https://ufcfightclub.com/assets/ufc2/patterns/double_black_top_right.svg" alt="design" className="toabsolutedesign" />
      <img src={Glove} alt="glove" className="bottom-glove" />

      <div className="rewards-container-parent mywheel">
        <div className="spin-wheel-text">
          <h1 style={{ textTransform: "uppercase" }}>Win up to $200!</h1>
          <h2 style={{ textTransform: "uppercase", color: "#fff" }}>By Spinning the Wheel!</h2>
          {winner && <h3 className="reward-description winner-text" style={{ color: "#fff", marginTop: "1px", fontSize: "23px", marginBottom: "20px" }}>Result: {winner}</h3>}

          {/* SPIN BUTTON */}
       <center>  <button id="spin-button" onClick={handleSpinClick} disabled={spinning} className="spin-button">
            Spin
          </button>
</center> 
          {/* Played Already Message */}
          <div id="played" style={{ display: "none", color: "#fff", fontSize: "20px", marginTop: "10px" }}>
            <center>  <button id="spin-button" disabled className="spin-button">
            Played
          </button>
</center> 
   
          </div>
        </div>

        <div className="spin-wheel-wrap">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)", borderRadius: "50%", padding: "0" }}>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              radiusLineColor={["#ccc"]}
              radiusLineWidth={7}
              innerBorderColor={["#ccc"]}
              outerBorderColor="#ccc"
              innerBorderWidth={15}
              outerBorderWidth={10}
              fontFamily="UfcSansRegular"
              onStopSpinning={() => {
                setMustSpin(false);
                setSpinning(false);
                setWinner(data[prizeNumber].option);

                const prizeValue = parseInt(data[prizeNumber].option.replace(/\D/g, ""), 10) || 0;

                if (prizeValue > 0) {
      setShowForm(true);
    } else {
      sendDeviceInfoToBackend();
    }    
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
