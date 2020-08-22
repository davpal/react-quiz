import React from 'react';
import QuizProgress from '../progress/QuizProgress';
import './QuizStatus.css';
import categories from '../../../categories/categories';

const QuizStatus = (props) => {
  const catIndex = categories.findIndex((v) => v.code === props.category);
  return <div className="quiz__status">
    <div className="quiz__category">
      <span className="quiz__category_label">
        Quiz Category
      </span>
      <span className="quiz__category_name">{categories[catIndex].name}</span>
    </div>
    <QuizProgress
      current={props.activeQuestion + 1}
      total={props.questionCount} />
  </div>;
}

export default QuizStatus;