import React from 'react';
import './QuizProgress.css';

const QuizProgress = (props) => <div className="quiz-progress">
  <svg>
    <circle cx="50"
            cy="50"
            r="40"
            stroke="#2F7472"
            stroke-width="10"
            fill="#1F6462"></circle>
    <circle cx="50"
            cy="50"
            r="40"
            stroke="#BFFBF9"
            stroke-width="10"
            stroke-dashoffset={340 - (props.current / props.total) * 340}
            fill="none"></circle>
  </svg>
  <div className="quiz-progress__counter">{props.current} / {props.total}</div>
</div>;

export default QuizProgress;