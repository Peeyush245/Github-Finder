import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './componenets/layout/Navbar'
import Users from './componenets/users/Users'
import axios from 'axios'
import Search from './componenets/users/Search'
import Alert from './componenets/layout/Alert'
import About from './componenets/pages/About'
import User from './componenets/users/User'

class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  async componentDidMount() {

    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users?
      client_id = ${ process.env.REACT_APP_GITHUB_CLIENT_ID }
      &client_secret = ${ process.env.REACT_APP_GITHUB_CLIENT_SECRET }`);
    this.setState({ users: res.data, loading: false });
    // console.log(res)
  }

  // Search Github Users
  searchUsers = async ( text ) => {
      // console.log(text);
      this.setState({ loading: true })
      const res = await axios.get(`https://api.github.com/search/users?q=${ text }&
      client_id = ${ process.env.REACT_APP_GITHUB_CLIENT_ID }
      &client_secret = ${ process.env.REACT_APP_GITHUB_CLIENT_SECRET }`);
      this.setState({ users: res.data.items, loading: false });
  }

  // Get single GitHub User

  getUser = async ( username ) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${ username }?
    client_id = ${ process.env.REACT_APP_GITHUB_CLIENT_ID }
    &client_secret = ${ process.env.REACT_APP_GITHUB_CLIENT_SECRET }`);
    this.setState({ user: res.data, loading: false });
  }

  // Clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  // Set Alert

  setAlert = ( msg, type ) => {
    this.setState({ alert: { msg, type } })

    setTimeout( () => this.setState ({ alert: null }), 2000)
  }
  // xyz = () => 'Hello World'
  render() {
  //   const name = 'Peeyush Pandey'
  //   const foo = () => 'Bar'

    const { users, user, loading } = this.state

    return (
      // In case we dont want div then replace div className="App" with <React.Fragment> or simply angle bracket <> </>
      <Router>
      <div className = "App">
        <Navbar/>
        <div className = 'container'>
        <Alert alert = { this.state.alert }/>
        <Switch>
          <Route exact path = '/' render = { props => (
            <Fragment>
               <Search 
                searchUsers = { this.searchUsers } 
                clearUsers = { this.clearUsers } 
                showClear = { users.length > 0 ? true: false }
                setAlert = { this.setAlert }
              />
              <Users loading = { loading } users = { users }/>
            </Fragment>
          )}
          />
          <Route exact path = '/about' component = { About } />
          <Route exact path = '/user/:login' render = { props => (
            <User { ...props } getUser = { this.getUser } user = { user } loading = { loading } />
          ) } />
        </Switch>
        </div>
      {/* <h1>Hello</h1> */}
      {/* <h1>Length of name is {name.length}</h1>
      <h1>Hello from {name.toUpperCase()}</h1>
      <h1>{foo()}</h1> */}
      {/* CLass level methods can be called using this */}
      {/* <h1>{this.xyz()}</h1>    */}
      </div>
      </Router>
    );
  }
}

export default App;
