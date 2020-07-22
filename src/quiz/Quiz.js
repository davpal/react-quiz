import React, {
  useEffect,
  useRef,
  useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import he from 'he';
import Question from './Question';
import Result from './Result';

const QUESTION_COUNT = 20;

const fetchQuestions = async (api) => fetch(api);
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

const Quiz = (props) => {
  const { category } = useParams();
  const history = useHistory();

  const API_URL = `https://opentdb.com/api.php?amount=${QUESTION_COUNT}&category=${category}`;

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
    setActiveQuestion(activeQuestion + 1);
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
    fetchQuestions(API_URL)
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

  if(questions.length === 0) {
    return <div>Loading...</div>;
  }

  let allAnswers = [];
  if(questions.length > 0 && activeQuestion < QUESTION_COUNT) {
    allAnswers = questions[activeQuestion].answers;
  }

  return activeQuestion < QUESTION_COUNT ?
    <Question
      answers={allAnswers}
      userAnswer={userAnswer}
      question={questions[activeQuestion].question}
      activeQuestion={activeQuestion}
      questionCount={QUESTION_COUNT}
      onAnswer={validateAnswer}
      onNewQuiz={() => history.push('/')} /> :
    <Result score={score} total={QUESTION_COUNT} onNewQuiz={() => history.push('/')} />;
};

export default Quiz;