import React from 'react';

const Summary = (props) => <div className="result">
  <div className="score">Score: {props.score} / {props.total}</div>
  <div className="new-quiz-button" onClick={props.onNewQuiz}>New Quiz</div>
</div>;

export default Summary;