import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './componenets/layout/Navbar'
import Users from './componenets/users/Users'
import axios from 'axios'
import Search from './componenets/users/Search'
import Alert from './componenets/layout/Alert'
import About from './componenets/pages/About'
import User from './componenets/users/User'
import GitHubState from './context/github/GithubState'

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  // async componentDidMount() {

  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users?
  //     client_id = ${ process.env.REACT_APP_GITHUB_CLIENT_ID }
  //     &client_secret = ${ process.env.REACT_APP_GITHUB_CLIENT_SECRET }`);
  //   this.setState({ users: res.data, loading: false });
  //   console.log(res)

  //   // const res = await fetch("http://localhost:4000/data");
  //   // const body = await res.json();
  //   // const string = body[0].data
  //   // const obj = JSON.parse(string)
  //   // console.log(obj.speed)
  // }

  // Search Github Users
  const searchUsers = async ( text ) => {
      // console.log(text);
      setLoading(true)
      const res = await axios.get(`https://api.github.com/search/users?q=${ text }&
      client_id = ${ process.env.REACT_APP_GITHUB_CLIENT_ID }
      &client_secret = ${ process.env.REACT_APP_GITHUB_CLIENT_SECRET }`);
      setUsers(res.data.items)
      setLoading(false)
  }

  // Get single GitHub User

  const getUserRepos = async ( username ) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${ username }/repos?per_page=5&sort=created:asc&
    client_id = ${ process.env.REACT_APP_GITHUB_CLIENT_ID }
    &client_secret = ${ process.env.REACT_APP_GITHUB_CLIENT_SECRET }`);
    setRepos(res.data)
    setLoading(false)
    // this.setState({ repos: res.data, loading: false });
  }

  // Get users repos

  const getUser = async ( username ) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${ username }?
    client_id = ${ process.env.REACT_APP_GITHUB_CLIENT_ID }
    &client_secret = ${ process.env.REACT_APP_GITHUB_CLIENT_SECRET }`);
    setUser(res.data)
    setLoading(false)
    // this.setState({ user: res.data, loading: false });
  }

  // Clear users from state
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
    // this.setState({ users: [], loading: false })
  }

  // Set Alert

  const showAlert = ( msg, type ) => {
    setAlert({msg, type})
    // this.setState({ alert: { msg, type } })

    setTimeout( () => setAlert (null), 2000)
  }
  // xyz = () => 'Hello World'
  //   const name = 'Peeyush Pandey'
  //   const foo = () => 'Bar'

    // const { users, user, repos, loading } = this.state

    return (
      // In case we dont want div then replace div className="App" with <React.Fragment> or simply angle bracket <> </>
      <GitHubState>
      <Router>
      <div className = "App">
        <Navbar/>
        <div className = 'container'>
        <Alert alert = { alert }/>
        <Switch>
          <Route exact path = '/' render = { props => (
            <Fragment>
               <Search 
                searchUsers = { searchUsers } 
                clearUsers = { clearUsers } 
                showClear = { users.length > 0 ? true: false }
                setAlert = { showAlert }
              />
              <Users loading = { loading } users = { users }/>
            </Fragment>
          )}
          />
          <Route exact path = '/about' component = { About } />
          <Route exact path = '/user/:login' render = { props => (
            <User { ...props } 
              getUser = { getUser } 
              getUserRepos = { getUserRepos } 
              user = { user } 
              repos = { repos }
              loading = { loading } 
            />
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
      </GitHubState>
    );
}

export default App;
