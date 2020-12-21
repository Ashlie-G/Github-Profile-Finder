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
        (`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)

        dispatch({
            type: SEARCH_USERS,
            payload: response.data.items
        })
        // setUsers(response.data.items)
        
        // this.setState({users: response.data.items, loading: false})
        
    }

    //get user

    //get repos

    //clear users

    //setloading
    const setLoading = () => dispatch({type: SET_LOADING})

    return <GithubContext.Provider
        value={{
            users:state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers
        }}
        >
        {props.children}
    </GithubContext.Provider>

}

export default GithubState