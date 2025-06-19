import React from 'react';
import '../styles/Sections.css'; // General section styles

const QuizResult = ({ score, totalQuestions, userName, onRestart }) => {
  const percentage = (score / totalQuestions) * 100;
  let message = '';

  if (percentage === 100) {
    message = "Excellent! You got all answers correct!";
  } else if (percentage >= 70) { 
    message = "Great job! You did very well.";
  } else if (percentage >= 50) {
    message = "Good attempt! Keep practicing.";
  }
  else {
    message = "Keep practicing! You can do better.";
  }

  return (
    <section id="quizResult" className="quiz-result-section">
      <h2>Quiz Finished!</h2>
      <h3>{userName}'s Score: <span id="finalScore">{score} / {totalQuestions}</span></h3>
      <p>{message}</p>
      <button onClick={onRestart}>Start New Quiz</button>
    </section>
  );
};

export default QuizResult;