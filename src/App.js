import React, { Component, Fragment } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './Components/Layout/Navbar'
import Users from './Components/Users/Users'
import User from './Components/Users/User'
import Search from './Components/Users/Search'
import Alert from './Components/Layout/Alert'
import About from './Components/Pages/About'
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   this.setState({loading: true})

  //   const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
    
  //   this.setState({users: response.data, loading: false})
  // }

  searchUsers = async text => {
    this.setState({loading: true})
    const response = await axios.get
    (`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)

    this.setState({users: response.data.items, loading: false})
    
  }

  //get a single github user
  getUser = async (username) => {
    this.setState({loading: true})

    const response = await axios.get
    (`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    
    )

    this.setState({user: response.data, loading: false})
    
  }

  

  clearUsers = () => this.setState({users: [], loading: false})

  //set alert
  setAlert = (msg, type) => {
    this.setState({alert: {msg: msg, type: type}})
    setTimeout(()=> this.setState({alert: null}), 5000)
  }

  render() {
    const {users, user, loading} = this.state
    
    return (
    <Router>
      <div className="App">
          <Navbar />
          <div  className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                   <Search searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert} 
                    />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} 
              />
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} user={user} loading={loading} />
              )} />
            </Switch>
           
        </div>  
      </div>
    </Router>
    
    )
    
  }
  
}
export default App
