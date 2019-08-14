import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import withAuth from '../../hoc/withAuth';

const AnonRoute = (props) => {
  const { isLoggedIn, render , user, ...rest} = props
  return (
    <>
    {isLoggedIn && user.isAdmin ?  <Route render={render} {...rest}/> : <Redirect to="/"/>}  
    </>
  )
}

export default withAuth(AnonRoute)
