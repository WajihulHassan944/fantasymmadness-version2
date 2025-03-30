
// Components/Home/Fighters.jsx
import React from "react";
import "./Fighters.css";
import { Helmet } from "react-helmet";

const Fighters = ({ fighters = [] }) => {
  return (
    <div className="FightersContainer">
      <Helmet>
        <link rel="canonical" href="https://www.fantasymmadness.com/our-fighters" />
        <title>Our Fighters - Fantasy Mmadness</title>
        <meta name="description" content="Meet the professional fighters at Fantasy Mmadness. Discover their profiles, fight categories, and more!" />
      </Helmet>
      <h1 className="FightersTitle">Our Professional Fighters</h1>
      <div className="fightersWrapParent">
        {fighters.map((fighter, index) => (
          <div className="fighterItem" key={index}>
            <div className="fighterImagePart">
              <img src={fighter.image} alt={`${fighter.name}`} />
            </div>
            <div className="fighterContentPart">
              <h2>{fighter.category}</h2>
              <h1>{fighter.name}</h1>
              <p>{fighter.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fighters;
