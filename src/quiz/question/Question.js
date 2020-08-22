import React from 'react';
import AnswerButton from './AnswerButton';
import AnswerValidator from '../AnswerValidator';
import './Question.css';
import QuizProgress from './progress/QuizProgress';
import QuizStatus from './status/QuizStatus';

const Question = (props) => {
  const answers = props.answers.map((answer, i) =>
    <AnswerButton key={i} answer={answer} show={props.userAnswer !== null || props.userAnswer} onAnswer={props.onAnswer} />);

  return <div className="quiz__container">
    <QuizStatus {...props}></QuizStatus>
    <div className="question">
      {props.question}
    </div>
    <div className="answers">
      { answers }
    </div>
  </div>;
}

export default Question;