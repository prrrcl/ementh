import React, { Component } from 'react';
import { AuthContext } from '../context/auth-context'
const withAuth = (Comp) =>{
  return class WithAuth extends Component{
    render(){
      return(
        <AuthContext.Consumer>
          {({user,isLoggedIn,login,signup,check,completeSignUp, logout})=>(
            <Comp 
              user={user} 
              isLoggedIn={isLoggedIn} 
              login={login} 
              signup={signup} 
              logout={logout}
              completeSignup={completeSignUp}
              {...this.props}
              />
          )
          }
        </AuthContext.Consumer>
      )
    }
  }
}

export default withAuth;