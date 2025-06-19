

const LEADERBOARD_KEY = 'quizLeaderboard'; 


export const getLeaderboard = () => {
  const leaderboard = localStorage.getItem(LEADERBOARD_KEY);

  return leaderboard ? JSON.parse(leaderboard) : [];
};


export const saveLeaderboard = (leaderboard) => {
  
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
};


export const addScoreToLeaderboard = (name, score, difficulty) => {
  const leaderboard = getLeaderboard(); 
  
  leaderboard.push({ name, score, difficulty, timestamp: new Date().toISOString() });

  
  leaderboard.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  
  
  saveLeaderboard(leaderboard); 
};