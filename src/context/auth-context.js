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
      setTimeout(()=>{
        this.setState({
          isOut:true
        })
      },1000)
      setTimeout(()=>{
        this.setState({
          isLoggedIn: true,
          user,
          isLoading:false
        })
      },2000)
    })
    .catch(()=>{
      setTimeout(()=>{
        this.setState({
          user: {},
          isLoggedIn: false,
          isOut:true
        })
      },1000)
      setTimeout(()=>{
        this.setState({
          isLoading:false
        })
      },2000)
    })
  }

  render() {
    const { user, isLoggedIn, isOut } = this.state;
    return (
      <>
        <AuthContext.Provider value={
          {
            user,
            isLoggedIn,
            login: this.userLogin,
            signup: this.userSignUp,
            logout: this.userLogOut,
          }
         }>
          <Loading isOut={isOut}/>
          {this.props.children}
        </AuthContext.Provider>
      
      </>
    )
  }
}

export default AuthProvider;