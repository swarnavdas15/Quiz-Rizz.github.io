import React, { useState, useEffect } from 'react';


import Navbar from './components/Navbar';
import Home from './components/Home';
import UserForm from './components/UserForm';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import Leaderboard from './components/Leaderboard';
import About from './components/About';

import { addScoreToLeaderboard } from './utils/localStorage';

function App() {
 
  const [activeSection, setActiveSection] = useState('home');
  
  const [quizUserData, setQuizUserData] = useState(null);
  
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);

  const [finalQuizScore, setFinalQuizScore] = useState(0);
 
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const [quizError, setQuizError] = useState(null);


  const navigateTo = (section) => {
    setActiveSection(section);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = async (userName, difficulty) => {
    setQuizUserData({ userName, difficulty });
    setFinalQuizScore(0);         
    setCurrentQuizQuestions([]);   
    setLoadingQuiz(true);           
    setQuizError(null);             

  
    navigateTo('quiz');

    try {
     
      const apiUrl = `https://opentdb.com/api.php?amount=10&category=9&difficulty=${difficulty}&type=multiple`;
      const response = await fetch(apiUrl);

     
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

 
      if (data.response_code === 0) { 
        const formattedQuestions = data.results.map(q => ({
          question: q.question,
      
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
          answer: q.correct_answer,
        }));
        setCurrentQuizQuestions(formattedQuestions);
      } else {
        
        let errorMessage = "Could not fetch questions. ";
        switch(data.response_code) {
          case 1: errorMessage += "No Results: The API doesn't have enough questions for your query."; break;
          case 2: errorMessage += "Invalid Parameter: Your query contained an invalid parameter."; break;
          // Add more cases if needed
          default: errorMessage += "An unknown API error occurred.";
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      
      setQuizError(error.message || "Failed to load quiz questions. Please check your internet connection and try again.");
      setCurrentQuizQuestions([]); 
    } finally {
      setLoadingQuiz(false); 
    }
  };

 
  const handleQuizFinish = (score) => {
    setFinalQuizScore(score);
    
    if (quizUserData) {
      addScoreToLeaderboard(quizUserData.userName, score, quizUserData.difficulty);
    }
    navigateTo('result'); 
  };

  
  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'user':
        return <UserForm onStartQuiz={handleStartQuiz} />;
      case 'quiz':
        if (loadingQuiz) {
          return (
            <section className="quiz-container-section">
              <h2>Loading Quiz...</h2>
              <p>Please wait while we fetch questions from the server.</p>
            </section>
          );
        }
        if (quizError) {
          return (
            <section className="quiz-container-section">
              <h2 style={{color: '#dc3545'}}>Error!</h2> {/* Red color for error message */}
              <p>{quizError}</p>
              <button onClick={() => navigateTo('user')}>Try Again</button>
            </section>
          );
        }
      
        if (quizUserData && currentQuizQuestions.length > 0) {
          return (
            <Quiz
              questions={currentQuizQuestions}
              onQuizFinish={handleQuizFinish}
            />
          );
        } else {
          
         navigateTo('user');
return <div>Redirecting to start...</div>;
        }
      case 'result':
        return (
          <QuizResult
            score={finalQuizScore}
            totalQuestions={currentQuizQuestions.length}
            userName={quizUserData?.userName || 'Player'} 
            onRestart={() => navigateTo('user')} 
          />
        );
      case 'leaderboard':
        return <Leaderboard />;
      case 'about':
        return <About />;
      default:
        
        return <Home />;
    }
  };

  return (
    <> {/* React Fragment for multiple top-level elements (header, main, footer) */}
      <Navbar navigateTo={navigateTo} activeSection={activeSection} />
      <main>
        {renderSection()} {/* Call the function to render the current section */}
      </main>
      <footer>
        <p>&copy; 2025 Quizzo made by "Puja Chakraborty". All rights reserved.</p>
      </footer>
    </>
  );
}

export default App; 
