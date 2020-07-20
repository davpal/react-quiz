import React, {
  useEffect,
  useRef,
  useState } from 'react';
import he from 'he';
import './App.css';

const QUESTION_COUNT = 20;
const API_URL = `https://opentdb.com/api.php?amount=${QUESTION_COUNT}&category=11&difficulty=hard`;

const fetchQuestions = async () => fetch(API_URL);
const addBodyClass = className => document.body.classList.add(className);
const removeBodyClass = className => document.body.classList.remove(className);
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function prepareQuestions(questions) {
  return questions.map(row => {
    const { incorrect_answers, correct_answer } = row;
    const incorrectAnswers = incorrect_answers.map(answer => ({ text: answer, correct: false }));
    const correctAnswer = [{ text: correct_answer, correct: true }];
    const allAnswers = incorrectAnswers.concat(correctAnswer);
    shuffleArray(allAnswers);
    return {
      ...row,
      question: he.unescape(row.question),
      answers: allAnswers.map(a => ({ ...a, text: he.unescape(a.text) }))
    }
  });
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const nextQuestionTimer = useRef(null);

  function validateAnswer(isCorrect) {
    setUserAnswer(isCorrect);
    if(isCorrect) {
      setScore(score + 1);
      addBodyClass('correct');
    } else {
      setScore(score);
      addBodyClass('incorrect');
    }
  }

  function nextQuestion() {
    removeBodyClass('correct');
    removeBodyClass('incorrect');
    setUserAnswer(null);
    if(activeQuestion === QUESTION_COUNT) {
      presentResult();
    } else {
      setActiveQuestion(activeQuestion + 1);
    }
  }

  function presentResult() {

  }

  useEffect(() => {
    if(userAnswer === null) return;
    if(nextQuestionTimer.current !== null) {
      clearTimeout(nextQuestionTimer.current);
    }

    nextQuestionTimer.current = setTimeout(() => {
      nextQuestionTimer.current = null;
      nextQuestion();
    }, 2000);
  }, [userAnswer]);

  useEffect(() => {
    setLoading(true);
    fetchQuestions()
      .then(response => response.json())
      .then(json => {
        setQuestions(prepareQuestions(json.results));
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  let allAnswers = [];
  if(questions.length > 0 && questions.length <= QUESTION_COUNT) {
    allAnswers = questions[activeQuestion].answers;
  }

  const answers = allAnswers && allAnswers.map((answer, i) => {
    let highlight = '';
    if(userAnswer !== null) {
      highlight = answer.correct && userAnswer !== null ? "correct" : "incorrect";
    }
    return <div key={i}
      className={`answer answer-${highlight}`} 
      onClick={userAnswer === null ? () => validateAnswer(answer.correct) : null }>{answer.text}</div>
  });

  const infoClass = userAnswer !== 0 ? "correct" : "incorrect";

  return (
    <div className="container">
      <div className="top">
        <div className={`info info-${userAnswer !== null ? 'correct' : 'incorrect'}`}>
          { userAnswer !== null && (userAnswer ? 'Correct' : 'Incorrect') }
        </div>
        <div className="counter">
          Question {activeQuestion + 1} / {QUESTION_COUNT}
        </div>
      </div>
      <div className="question">
        { questions.length > 0 && questions[activeQuestion].question }
        { isLoading && "Loading..." }
      </div>
      { answers }
    </div>
  );
}

export default App;
