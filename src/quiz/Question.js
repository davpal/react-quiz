import React from 'react';
import AnswerButton from './AnswerButton';
import AnswerValidator from './AnswerValidator';
import QuestionCounter from './QuestionCounter';

const Question = (props) => {
  const answers = props.answers.map(answer =>
    <AnswerButton answer={answer} show={props.userAnswer} onAnswer={props.onAnswer} />);

  return <>
  <div className="top">
  <div className="new-quiz-button" onClick={props.onNewQuiz}>New Quiz</div>
    <AnswerValidator answer={props.userAnswer}></AnswerValidator>
    <QuestionCounter current={props.activeQuestion + 1} total={props.questionCount} />
  </div>  
  <div className="question">
    {props.question}
  </div>
  { answers }
  </>;
}

export default Question;