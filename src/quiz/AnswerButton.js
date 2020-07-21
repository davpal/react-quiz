import React from 'react';

const AnswerButton = (props) => {
  const showClass = props.show ? `answer-${props.answer.correct ? 'correct' : 'incorrect'}` : '';

  return <div 
  className={`answer ${showClass}`}
  onClick={props.show ? null : () => props.onAnswer(props.answer.correct)}>{props.answer.text}</div>
}

export default AnswerButton;