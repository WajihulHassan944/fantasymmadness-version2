import React, { useEffect } from 'react';
import "./Fighters.css";
import { fetchMatches } from '../../Redux/matchSlice';
import { useDispatch, useSelector } from 'react-redux';

const Fighters = () => {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  // Filter unique fighters
const uniqueFighters = [];
matches.forEach(match => {
  const categoryA = match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory;
  const categoryB = match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory;

  // Avoid adding duplicates for fighter A
  if (!uniqueFighters.some(fighter => fighter.name === match.matchFighterA)) {
    uniqueFighters.push({
      name: match.matchFighterA,
      category: categoryA,
      image: match.fighterAImage,
      description: `${match.matchFighterA} is known for his fights in ${categoryA} and has been a part of thrilling matchups like ${match.matchName}.`
    });
  }

  // Avoid adding duplicates for fighter B
  if (!uniqueFighters.some(fighter => fighter.name === match.matchFighterB)) {
    uniqueFighters.push({
      name: match.matchFighterB,
      category: categoryB,
      image: match.fighterBImage,
      description: `${match.matchFighterB} is known for his fights in ${categoryB} and has been a part of thrilling matchups like ${match.matchName}.`
    });
  }
});


  return (
    <div className='FightersContainer'>
      <h1 className='FightersTitle'>Our Professional Fighters</h1>
      <div className='fightersWrapParent'>
        {uniqueFighters.map((fighter, index) => (
          <div className='fighterItem' key={index}>
            <div className='fighterImagePart'>
              <img src={fighter.image} alt={`${fighter.name}`} />
            </div>
            <div className='fighterContentPart'>
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
