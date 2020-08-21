import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import categories from '../categories/categories';

const CategoryChooser = () => {
  const history = useHistory();
  const [category, setCategory] = useState(categories[0].code);

  function startQuiz(category) {
    history.push(`/quiz/${category}`);
  }

  const options = categories.map(category => 
    <option key={category.code} value={category.code}>{category.name}</option>
  );

  return <>
    <div className="bg-text">Quiz</div>
    <div className="header">
      <h1 className="app-title">quizapp</h1>
      <span className="app-subtitle">in react</span>
    </div>
    <div className="form-group">
      <label for="category">Category</label>
      <select name="category" className="category-chooser"
        onChange={(e) => setCategory(e.target.value)}>
        {options}
      </select>
    </div>
    <div className="form-group">
      <label for="question_count">Number of questions</label>
      <input name="question_count" type="text"></input>
    </div>
    <button className="new-quiz-button" onClick={() => startQuiz(category)}>Start quiz</button>
  </>
};

export default CategoryChooser;