import React from 'react';

const QuestionCounter = (props) =>
  <div className="counter">
    Question {props.current} / {props.total}
  </div>;

export default QuestionCounter;