import React , { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import './Friends.min.css';

export default function Friends(props) {
  const {currentUser, isLogged} = props;
  const [friends, setFriends] = useState([]);
 
  
  return (
    <div>
      
      {isLogged && 
        <>
       {friends.map((friend)=>{
         return(
           <Link to={`/user/${friend.username}`} key={friend._id}>
             {friend.username}
           </Link>
         )
       })}
        </>
      }
    </div>
  )
}