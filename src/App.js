import React, { Fragment } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './Components/Layout/Navbar'
import Users from './Components/Users/Users'
import User from './Components/Users/User'
import Search from './Components/Users/Search'
import Alert from './Components/Layout/Alert'
import About from './Components/Pages/About'
import GithubState from './Context/github/GithubState'
import AlertState from './Context/Alert/AlertState'
import './App.css';

const App =()=> {

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

//moved search users to github state

  //get a single github user
  
  //get users repos



  



  //set alert


    
    return (
      <GithubState>
        <AlertState>
    <Router>
      <div className="App">
          <Navbar />
          <div  className='container'>
            <Alert />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                   <Search 
                    
                    />
                  <Users  />
                </Fragment>
              )} 
              />
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' component={User}/>
            </Switch>
           
        </div>  
      </div>
    </Router>
    </AlertState>
    </GithubState>
    
    )
    
  }
  

export default App
