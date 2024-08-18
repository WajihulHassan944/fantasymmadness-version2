
import { useState, useEffect } from 'react';

const useLeaderboardData = (matches) => {
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, scoresResponse] = await Promise.all([
          fetch('https://fantasymmadness-game-server-three.vercel.app/users'),
          fetch('https://fantasymmadness-game-server-three.vercel.app/api/scores')
        ]);

        const usersData = await usersResponse.json();
        const scoresData = await scoresResponse.json();

        setUsers(usersData);
        setScores(scoresData);

        const matchResponse = await fetch('https://fantasymmadness-game-server-three.vercel.app/match');
        const matchesData = await matchResponse.json();

        const userPoints = {};
        const uniquePlayers = new Set();

        scoresData.forEach(score => {
          const match = matchesData.find(m => m._id === score.matchId);
          if (!match) return;

          const fighterOneStats = match.BoxingMatch.fighterOneStats || [];
          const fighterTwoStats = match.BoxingMatch.fighterTwoStats || [];

          uniquePlayers.add(score.playerId);

          if (!userPoints[score.playerId]) {
            userPoints[score.playerId] = 0;
          }

          userPoints[score.playerId] += calculatePoints(score.predictions, fighterOneStats, fighterTwoStats);
        });

        setPlayerCount(uniquePlayers.size);

        const leaderboardItems = Object.keys(userPoints).map(playerId => {
          const user = usersData.find(u => u._id === playerId);
          return {
            ...user,
            totalPoints: userPoints[playerId]
          };
        });

        leaderboardItems.sort((a, b) => b.totalPoints - a.totalPoints);

        setLeaderboard(leaderboardItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [matches]);

  const calculatePoints = (userPrediction, fighterOneStats, fighterTwoStats) => {
    let totalScore = 0;

    if (!Array.isArray(fighterOneStats) || !Array.isArray(fighterTwoStats)) {
      console.warn('Invalid stats arrays:', { fighterOneStats, fighterTwoStats });
      return totalScore;
    }

    userPrediction.forEach((roundPrediction, index) => {
      const fighterOneRound = fighterOneStats[index];
      const fighterTwoRound = fighterTwoStats[index];

      if (!fighterOneRound || !fighterTwoRound || !roundPrediction) return;

      if (roundPrediction.hpPrediction1 !== null && roundPrediction.hpPrediction1 <= fighterOneRound.HP) {
        totalScore += roundPrediction.hpPrediction1;
      }
      if (roundPrediction.bpPrediction1 !== null && roundPrediction.bpPrediction1 <= fighterOneRound.BP) {
        totalScore += roundPrediction.bpPrediction1;
      }
      if (roundPrediction.tpPrediction1 !== null && roundPrediction.tpPrediction1 <= fighterOneRound.TP) {
        totalScore += roundPrediction.tpPrediction1;
      }
      if (roundPrediction.rwPrediction1 !== null && roundPrediction.rwPrediction1 === fighterOneRound.RW) {
        totalScore += roundPrediction.rwPrediction1;
      }
      if (roundPrediction.koPrediction1 !== null) {
        if (roundPrediction.koPrediction1 === fighterOneRound.KO) {
          totalScore += fighterOneRound.KO;
        } else {
          totalScore += 25;
        }
      }

      if (roundPrediction.hpPrediction2 !== null && roundPrediction.hpPrediction2 <= fighterTwoRound.HP) {
        totalScore += roundPrediction.hpPrediction2;
      }
      if (roundPrediction.bpPrediction2 !== null && roundPrediction.bpPrediction2 <= fighterTwoRound.BP) {
        totalScore += roundPrediction.bpPrediction2;
      }
      if (roundPrediction.tpPrediction2 !== null && roundPrediction.tpPrediction2 <= fighterTwoRound.TP) {
        totalScore += roundPrediction.tpPrediction2;
      }
      if (roundPrediction.rwPrediction2 !== null && roundPrediction.rwPrediction2 === fighterTwoRound.RW) {
        totalScore += roundPrediction.rwPrediction2;
      }
      if (roundPrediction.koPrediction2 !== null) {
        if (roundPrediction.koPrediction2 === fighterTwoRound.KO) {
          totalScore += fighterTwoRound.KO;
        } else {
          totalScore += 25;
        }
      }
    });

    return totalScore;
  };

  return { leaderboard, playerCount };
};

export default useLeaderboardData;