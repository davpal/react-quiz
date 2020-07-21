import React from 'react';

const QuestionCounter = (props) => {
  if(props.current == props.total) {
    props.onFinish();
  }
  
  return <div className="counter">
    Question {props.current} / {props.total}
  </div>
};

export default QuestionCounter;