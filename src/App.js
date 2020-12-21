import React, { useState, Fragment } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './Components/Layout/Navbar'
import Users from './Components/Users/Users'
import User from './Components/Users/User'
import Search from './Components/Users/Search'
import Alert from './Components/Layout/Alert'
import About from './Components/Pages/About'
import axios from 'axios';
import './App.css';

const App =()=> {
  const [users, setUsers] =useState([])
  const [user, setUser] =useState({})
  const [repos, setRepos] =useState([])
  const [loading, setLoading] =useState(false)
  const [alert, setAlert] =useState(null)



  // state = {
  //   users: [],
  //   user: {},
  //   loading: false,
  //   alert: null,
  //   repos: []
  // }

  // async componentDidMount() {
  //   this.setState({loading: true})

  //   const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
    
  //   this.setState({users: response.data, loading: false})
  // }

  const searchUsers = async text => {
    setLoading(true)
    // this.setState({loading: true})
    const response = await axios.get
    (`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
    setUsers(response.data.items)
    setLoading(false)
    // this.setState({users: response.data.items, loading: false})
    
  }

  //get a single github user
  const getUser = async (username) => {
    // this.setState({loading: true})
    setLoading(true)

    const response = await axios.get
    (`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    
    )
    setUser(response.data)
    setLoading(false)
    
  }

  //get users repos
  const getUserRepos = async (username) => {
    // this.setState({loading: true})
    setLoading(true)

    const response = await axios.get
    (`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    
    )
    setRepos(response.data)
    setLoading(false)
    
  }


  

  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  //set alert
  const showAlert = (msg, type) => {
    setAlert({msg, type})
    setTimeout(()=> setAlert(null), 5000)
  }

    
    return (
    <Router>
      <div className="App">
          <Navbar />
          <div  className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                   <Search searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    showAlert={setAlert} 
                    />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} 
              />
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />
              )} />
            </Switch>
           
        </div>  
      </div>
    </Router>
    
    )
    
  }
  

export default App
