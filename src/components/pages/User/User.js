import React, { useState, useEffect } from 'react';
import withAuth from '../../../hoc/withAuth';
import classService from '../../../services/class-services'
import { Link } from 'react-router-dom'
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
    <section className="profile-content"> 
    <span></span>
    <div className="profile-img">
      <img src={user.profileImg} alt=""/>
    </div>
      <h3>{user.username}</h3>
      <Link className="profile-link" to={`/user/${user._id}/benchmarks`}>benchmarks</Link>
      <Link className="profile-link" to={`/user/${user._id}/friends`}>friends</Link>
    </section>
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
