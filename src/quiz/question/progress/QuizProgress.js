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
            stroke-dasharray="314 314"
            stroke-dashoffset={314 * (1 - (props.current / props.total))}
            fill="none"></circle>
  </svg>
  <div className="quiz-progress__counter">{props.current} / {props.total}</div>
</div>;

export default QuizProgress;