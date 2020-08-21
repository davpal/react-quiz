import React from 'react';
import AnswerButton from './AnswerButton';
import AnswerValidator from '../AnswerValidator';
import QuestionCounter from './QuestionCounter';
import './Question.css';

const Question = (props) => {
  const answers = props.answers.map((answer, i) =>
    <AnswerButton key={i} answer={answer} show={props.userAnswer !== null || props.userAnswer} onAnswer={props.onAnswer} />);

  return <>
  <div className="top">
    <AnswerValidator answer={props.userAnswer}></AnswerValidator>
    <QuestionCounter current={props.activeQuestion + 1} total={props.questionCount} />
  </div>  
  <div className="question">
    {props.question}
  </div>
  <div className="answers">
    { answers }
  </div>
  </>;
}

export default Question;