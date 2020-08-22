import React from 'react';
import './App.css';
import  QuizCreator from './quiz/home/quiz-creator/QuizCreator';
import Quiz from './quiz/Quiz';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={QuizCreator} />
        <Route exact path="/quiz/:category" component={Quiz} />
      </Switch>
    </Router>
  );
}

export default App;
