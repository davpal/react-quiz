import React from 'react';
import { useHistory } from "react-router-dom";
import categories from '../categories/categories';

const CategoryChooser = () => {
  const history = useHistory();

  function startQuiz(category) {
    history.push(`/quiz/${category}`);
  }

  const options = categories.map(category => 
    <option key={category.code} value={category.code}>{category.name}</option>
  );

  return <>
  <h2>Choose category</h2>
  <select name="trivia_category" className="category-chooser"
    onChange={(e) => startQuiz(e.target.value)}>
    {options}
  </select>
  </>
};

export default CategoryChooser;