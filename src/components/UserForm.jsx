import React, { useState } from 'react';
import '../styles/Sections.css'; // General section styles

const UserForm = ({ onStartQuiz }) => {
  const [userName, setUserName] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    if (userName.trim()) { // Ensure name is not just empty spaces
      onStartQuiz(userName, difficulty); // Pass user data to parent (App.jsx)
    } else {
      alert('Please enter your name!');
    }
  };

  return (
    <section id="user" className="user-form-section">
      <h2>Start Your Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Your Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required // HTML5 validation for required field
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty Level:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit">Start Quiz</button>
      </form>
    </section>
  );
};

export default UserForm;