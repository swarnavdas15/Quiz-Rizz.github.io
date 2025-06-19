import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../utils/localStorage'; // Import local storage utility
import '../styles/Sections.css'; // General section styles

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Load leaderboard data from local storage when the component mounts
  useEffect(() => {
    const storedLeaderboard = getLeaderboard();
    setLeaderboard(storedLeaderboard);
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <section id="leaderboard" className="leaderboard-section">
      <h2>Leaderboard</h2>
      <table id="leaderboardTable">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length === 0 ? (
            <tr><td colSpan="4">No scores yet. Be the first to play!</td></tr>
          ) : (
            leaderboard.map((entry, index) => (
              <tr key={index}> {/* Using index as key, safe if entries don't reorder */}
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
                <td>{entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1)}</td> {/* Capitalize difficulty */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Leaderboard;