import React, {useReducer} from 'react'
import axios from 'axios'
import GithubContext from './GithubContext'
import GithubReducer from './GithubReducer'
import {
SEARCH_USERS,
SET_LOADING,
CLEAR_USERS,
GET_USER,
GET_REPOS
} from '../Types'
import githubContext from './GithubContext'

let githubClientId
let githubClientSecret

if(process.env.NODE_ENV !== 'production') {
    githubClientId= process.env.REACT_APP_CLIENT_ID
    githubClientSecret= process.env.REACT_APP_CLIENT_SECRET
} else {
    githubClientId= process.env.GITHUB_CLIENT_ID
    githubClientSecret= process.env.GITHUB_APP_CLIENT_SECRET
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)
    //search users
    const searchUsers = async text => {
        setLoading()

        // this.setState({loading: true})
        const response = await axios.get
        (`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}
        &client_secret=${githubClientSecret}`)

        dispatch({
            type: SEARCH_USERS,
            payload: response.data.items
        })
        // setUsers(response.data.items)
        
        // this.setState({users: response.data.items, loading: false})
        
    }

    //get user
    const getUser = async (username) => {
        // this.setState({loading: true})
        setLoading(true)
    
        const response = await axios.get
        (`https://api.github.com/users/${username}?client_id=${githubClientId}
        &client_secret=${githubClientSecret}`
        
        )
        dispatch({
            type: GET_USER,
            payload: response.data
        })
      }
    

    //get repos
    const getUserRepos = async (username) => {
        // this.setState({loading: true})
        setLoading(true)
    
        const response = await axios.get
        (`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}
        &client_secret=${githubClientSecret}`
        
        )
        dispatch({
            type: GET_REPOS,
            payload: response.data
        })
        
      }

    //clear users
    const clearUsers = () => dispatch({type: CLEAR_USERS})

    //setloading
    const setLoading = () => dispatch({type: SET_LOADING})

    return <GithubContext.Provider
        value={{
            users:state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
        >
        {props.children}
    </GithubContext.Provider>

}

export default GithubState