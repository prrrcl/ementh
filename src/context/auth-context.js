import React, { Component } from 'react'
import Loading from '../components/ui/Loading/Loading'
import authService from '../services/auth-services'

export const AuthContext = React.createContext();

class AuthProvider extends Component {

  state = {
    isLoggedIn: false,
    user: {},
    isLoading: true,
    isOut: false
  }
  
  adminInvite = ( user ) => {
    return authService.invite(user)
    .then((user) => user)
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
  
  userCompleteSignUp = (user) => {
    return authService.completeSignUp(user)
    .then((user)=> {
      this.setState({
        user,
        isLoggedIn:true
      })
      return user;
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
      setTimeout(()=>{
        this.setState({
          isOut:true
        })
      },1000)
        this.setState({
          isLoggedIn: true,
          user,
          isLoading:false
        })

    })
    .catch(()=>{
      setTimeout(()=>{
        this.setState({
          user: {},
          isLoggedIn: false,
          isOut:true,
          isLoading:false
        })
      },1000)
    })
  }

  render() {
    const { user, isLoggedIn, isOut, isLoading } = this.state;
    return (
      <>{isLoading ? <Loading isOut={isOut}/> : <AuthContext.Provider value={
        {
          user,
          isLoggedIn,
          login: this.userLogin,
          signup: this.userSignUp,
          invite: this.adminInvite,
          completeSignUp: this.userCompleteSignUp,
          logout: this.userLogOut,
        }
       }>
        <Loading isOut={isOut}/>
        {this.props.children}
      </AuthContext.Provider>}
        
      
      </>
    )
  }
}

export default AuthProvider;