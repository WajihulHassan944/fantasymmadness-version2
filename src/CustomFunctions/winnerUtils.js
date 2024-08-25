export const getWinnerDetails = async (matchId) => {

    try {
        // Fetch match details
        const matchResponse = await fetch(`https://fantasymmadness-game-server-three.vercel.app/api/matches/${matchId}`);
        const match = await matchResponse.json();
   
        
        const scoresResponse = await fetch('https://fantasymmadness-game-server-three.vercel.app/api/scores');
        const scoresData = await scoresResponse.json();

        
        // Fetch all users
        const usersResponse = await fetch('https://fantasymmadness-game-server-three.vercel.app/users');
        const usersData = await usersResponse.json();
        
        const scoresHigh = scoresData.filter(score => score.matchId === matchId);
        
        let highestScorer = null;
        let highestPoints = 0;

        scoresHigh.forEach((score) => {
            const user = usersData.find(u => u._id === score.playerId);
            if (!user) return;

            const totalPoints = calculatePoints(score.predictions, match.BoxingMatch.fighterOneStats, match.BoxingMatch.fighterTwoStats);

            if (totalPoints > highestPoints) {
                highestPoints = totalPoints;
                highestScorer = user;
            }
        });

        if (highestScorer) {
            return {
                firstName: highestScorer.firstName,
                lastName: highestScorer.lastName,
                profileUrl: highestScorer.profileUrl,
                totalPoints: highestPoints,
                matchId: matchId,
                userId: highestScorer._id
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const calculatePoints = (userPrediction, fighterOneStats, fighterTwoStats) => {
    let totalScore = 0;

    userPrediction.forEach((roundPrediction, index) => {
        const fighterOneRound = fighterOneStats[index];
        const fighterTwoRound = fighterTwoStats[index];

        if (!fighterOneRound || !fighterTwoRound || !roundPrediction) return;

        // Head Punches (HP) - Fighter One
        if (roundPrediction.hpPrediction1 !== null && roundPrediction.hpPrediction1 <= fighterOneRound.HP) {
            totalScore += roundPrediction.hpPrediction1;
        }

        // Body Punches (BP) - Fighter One
        if (roundPrediction.bpPrediction1 !== null && roundPrediction.bpPrediction1 <= fighterOneRound.BP) {
            totalScore += roundPrediction.bpPrediction1;
        }

        // Total Punches (TP) - Fighter One
        if (roundPrediction.tpPrediction1 !== null && roundPrediction.tpPrediction1 <= fighterOneRound.TP) {
            totalScore += roundPrediction.tpPrediction1;
        }

        // Picking Round Winner (RW) - Fighter One
        if (roundPrediction.rwPrediction1 !== null && roundPrediction.rwPrediction1 === fighterOneRound.RW) {
            totalScore += roundPrediction.rwPrediction1;
        }

        // Knock Out (KO) - Fighter One
        if (roundPrediction.koPrediction1 !== null) {
            if (roundPrediction.koPrediction1 === fighterOneRound.KO) {
                totalScore += fighterOneRound.KO;
            } else {
                totalScore += 0; // 25 points for wrong KO pick
            }
        }

        // Head Punches (HP) - Fighter Two
        if (roundPrediction.hpPrediction2 !== null && roundPrediction.hpPrediction2 <= fighterTwoRound.HP) {
            totalScore += roundPrediction.hpPrediction2;
        }

        // Body Punches (BP) - Fighter Two
        if (roundPrediction.bpPrediction2 !== null && roundPrediction.bpPrediction2 <= fighterTwoRound.BP) {
            totalScore += roundPrediction.bpPrediction2;
        }

        // Total Punches (TP) - Fighter Two
        if (roundPrediction.tpPrediction2 !== null && roundPrediction.tpPrediction2 <= fighterTwoRound.TP) {
            totalScore += roundPrediction.tpPrediction2;
        }

        // Picking Round Winner (RW) - Fighter Two
        if (roundPrediction.rwPrediction2 !== null && roundPrediction.rwPrediction2 === fighterTwoRound.RW) {
            totalScore += roundPrediction.rwPrediction2;
        }

        // Knock Out (KO) - Fighter Two
        if (roundPrediction.koPrediction2 !== null) {
            if (roundPrediction.koPrediction2 === fighterTwoRound.KO) {
                totalScore += fighterTwoRound.KO;
            } else {
                totalScore += 0; // 25 points for wrong KO pick
            }
        }
    });

    return totalScore;
};
