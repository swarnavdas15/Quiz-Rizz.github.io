import React, { useState, useEffect } from 'react';
import '../styles/Sections.css'; // General section styles

const Quiz = ({ questions, onQuizFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Stores the option user clicked
  const [isAnswered, setIsAnswered] = useState(false); // True once an option is selected for current question

  const currentQuestion = questions[currentQuestionIndex]; // Get the current question object

  // Reset quiz state when questions prop changes (e.g., a new quiz starts)
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [questions]);

  // Handle user clicking an answer option
  const handleOptionClick = (option) => {
    if (isAnswered) return; // Prevent changing answer after it's been selected

    setSelectedOption(option); // Store the selected option
    setIsAnswered(true); // Mark question as answered

    // Check if the selected option is correct and update score
    if (option === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  // Handle moving to the next question or finishing the quiz
  const handleNextQuestion = () => {
    // Reset state for the next question
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentQuestionIndex < questions.length - 1) {
      // If there are more questions, move to the next one
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // If all questions are answered, finish the quiz and pass the score to parent
      onQuizFinish(score);
    }
  };

  // Display a message if no questions are available (e.g., initial load, or API error)
  if (!currentQuestion) {
    return <section className="quiz-container-section"><h2>Preparing Quiz...</h2></section>;
  }

  return (
    <section id="quizContainer" className="quiz-container-section">
      <h3>Question {currentQuestionIndex + 1} of {questions.length}</h3>
      <div id="questionDisplay" dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></div> {/* Using dangerouslySetInnerHTML for HTML entities from API */}
      <div id="optionsDisplay">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index} // Use index as key, safe as options don't reorder within question
            // Apply correct/incorrect classes based on selection and answer
            className={`option-button ${
              isAnswered
                ? option === currentQuestion.answer
                  ? 'correct'
                  : selectedOption === option
                    ? 'incorrect'
                    : ''
                : ''
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered} // Disable buttons once an answer is selected
            dangerouslySetInnerHTML={{ __html: option }} // For HTML entities in options
          >
          </button>
        ))}
      </div>
      {/* Show the "Next Question" or "Submit Quiz" button only after an answer is selected */}
      {isAnswered && (
          <button
              onClick={handleNextQuestion}
              className="next-question-button"
          >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
          </button>
      )}
    </section>
  );
};

export default Quiz;