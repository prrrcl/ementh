import React, { Component } from 'react'
import authService from '../services/auth-service'

export const AuthContext = React.createContext();

class AuthProvider extends Component {

  state = {
    isLoggedIn: false,
    user: {},
    isLoading: true
  }

  userSignUp = (user) =>{
    return authService.signup(user)
    .then((user)=> {
      this.setState({
        user,
        isLoggedIn:true
      })
    })
  }

  userLogin = (user) => {
   return authService.login(user)
    .then((user)=>{
      this.setState({
        user,
        isLoggedIn:true
      })
    })
  }

  userLogOut = () => {
    return authService.logout()
    .then(()=>{
      this.setState({
        isLoggedIn:false,
        user: {}
      })
    })
  }

  componentDidMount() {
    authService.me()
    .then((user)=>{
      this.setState({
        user,
        isLoggedIn: true,
        isLoading:false
      })
    })
    .catch(()=>{
      this.setState({
        user: {},
        isLoggedIn: false,
        isLoading:false
      })
    })
  }

  render() {
    const { user, isLoggedIn, isLoading } = this.state;
    return (
      <>
      {isLoading ? <p>Loading</p> : (
        <AuthContext.Provider value={
          {
            user,
            isLoggedIn,
            login: this.userLogin,
            signup: this.userSignUp,
            logout: this.userLogOut,
          }
         }>
          {this.props.children}
        </AuthContext.Provider>
      )} 
      
      </>
    )
  }
}

export default AuthProvider;