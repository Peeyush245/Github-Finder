import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './componenets/layout/Navbar'
import Home from './componenets/pages/Home'
import NotFound from './componenets/pages/NotFound'
import Alert from './componenets/layout/Alert'
import About from './componenets/pages/About'
import User from './componenets/users/User'
import GitHubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'

const App = () => {
  return (
    <GitHubState>
    <AlertState>
    <Router>
    <div className = "App">
      <Navbar/>
      <div className = 'container'>
      <Alert/>
      <Switch>
        <Route exact path = '/' component = { Home }/>
        <Route exact path = '/about' component = { About } />
        <Route exact path = '/user/:login' component = { User } />
        <Route component = { NotFound } />
      </Switch>
      </div>
    </div>
    </Router>
    </AlertState>
    </GitHubState>
  );
}

export default App;
