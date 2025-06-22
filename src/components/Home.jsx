import React from 'react';
import '../styles/Sections.css'; // General section style
const Home = () => (
  <section id="home" className="hero-section">
    <h1>Welcome, challenger. Knowledge awaits—are you ready to play?</h1>
    <p>🎮 How to Play & Slay the Game 🧠✨</p>
  
<p><br />🚀 Step 1: Hit the "Start Game" tab in the navbar Fill in your name and details—this is your game passport.
<br />🎯 Step 2: Enter the Arena Quizzes unlock once you’re set. Challenge yourself, test your brainpower, and level up!

<br />🏆 Step 3: Claim Your Spot on the Leaderboard Once you finish, see how you stack up against other brainiacs. Your performance is ranked—so bring your A-game!

<br />💡 Remember: Every click counts, every question is a chance to shine.</p>

 <button
         onClick={()=>{window.open('user')}}
          className="hero-button"
        >
          Start Your Quiz
          <span>🚀</span>
        </button>

  </section>
);

export default Home;