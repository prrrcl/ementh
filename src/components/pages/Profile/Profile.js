import React from 'react';
import { Link } from 'react-router-dom'
import withAuth from '../../../hoc/withAuth'
import './Profile.min.css';

const Profile = (props) => {
  const { user } = props;
  return (
    <section className="profile-content"> 
    <span></span>
    <div className="profile-img">
      <img src={user.profileImg} alt=""/>
    </div>
      <h3>{user.username}</h3>
      <Link className="profile-link" to={`/user/${user._id}/benchmarks`}>benchmarks</Link>
    </section>
  )
}

export default withAuth(Profile)
