import React, { useState, useEffect } from 'react';
import withAuth from '../../../hoc/withAuth';
import classService from '../../../services/class-services'
import './User.min.css'

const User = (props) => {
  const [user, setUser] = useState();

  useEffect(()=>{
    classService.getUser(props.match.params.id)
    .then((response)=>{
      setUser(response.data)
    })
  },[props.match.params.id]);
if(user){
  return (
    <div>
      hola, {user.username}
    </div>
  )
}else{
  return(
    <>
    Loading
    </>
  )
}
}

export default withAuth(User)
