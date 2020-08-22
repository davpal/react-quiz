import React from 'react';

const AnswerValidator = (props) => {
  const answerClass = props.answer ? `info-${props.answer ? 'correct' : 'incorrect'}` : '';
  return <div className={`info ${answerClass}`}>
    { props.answer !== null && (props.answer ? 'Correct' : 'Incorrect') }
  </div>
}

export default AnswerValidator;
