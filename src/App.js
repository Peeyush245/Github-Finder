import React, { Component } from 'react'
import './App.css';
import Navbar from './componenets/layout/Navbar'
import Users from './componenets/users/Users'
import axios from 'axios'

class App extends Component {

  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {

    this.setState({loading: true});

    const res = await axios.get('https://api.github.com/users');
    this.setState({ users: res.data, loading: false });
    // console.log(res)
  }

  // xyz = () => 'Hello World'
  render() {
  //   const name = 'Peeyush Pandey'
  //   const foo = () => 'Bar'
    return (
      // In case we dont want div then replace div className="App" with <React.Fragment> or simply angle bracket <> </>
      <div className="App">
        <Navbar/>
        <div className='container'>
            <Users loading = { this.state.loading } users = { this.state.users }/>
        </div>
      {/* <h1>Hello</h1> */}
      {/* <h1>Length of name is {name.length}</h1>
      <h1>Hello from {name.toUpperCase()}</h1>
      <h1>{foo()}</h1> */}
      {/* CLass level methods can be called using this */}
      {/* <h1>{this.xyz()}</h1>    */}
      </div>
    );
  }
}

export default App;
