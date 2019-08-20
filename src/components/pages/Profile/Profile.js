import React from 'react';
import withAuth from '../../../hoc/withAuth'
import './Profile.min.css';

const Profile = (props) => {
  const { user } = props;
  console.log(user)
  return (
    <section className="profile-content"> 
    <span></span>
    <div className="profile-img">
      <img src={user.profileImg} alt=""/>
    </div>
      <h3>{user.username}</h3>
    </section>
  )
}

export default withAuth(Profile)
