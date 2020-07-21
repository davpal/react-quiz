import React from 'react';
import './App.css';
import CategoryChooser from './quiz/CategoryChooser';
import Quiz from './quiz/Quiz';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={CategoryChooser} />
          <Route exact path="/quiz/:category" component={Quiz} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
