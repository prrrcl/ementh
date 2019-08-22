import React, { Component } from 'react';
import { AuthContext } from '../context/auth-context'
const withAuth = (Comp) =>{
  return class WithAuth extends Component{
    render(){
      return(
        <AuthContext.Consumer>
          {({user,isLoggedIn,login,signup,check,completeSignUp, logout, animation})=>(

            <Comp 
              user={user} 
              isLoggedIn={isLoggedIn} 
              login={login} 
              signup={signup} 
              logout={logout}
              completeSignup={completeSignUp}
              animation={animation}
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