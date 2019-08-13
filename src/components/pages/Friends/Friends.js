import React , { useState, useEffect }from 'react';
import { Link, Redirect } from 'react-router-dom';
import userService from '../../../services/user-services';
import './Friends.min.css';

export default function Friends(props) {
  const {currentUser, isLogged} = props;
  const [friends, setFriends] = useState([]);
 
  useEffect(() => {
    let isSubscribed = true
    if(currentUser !== null){
        userService.getAllFriends(currentUser)
          .then((response)=>{
            if (isSubscribed) {
            setFriends(response);
            }
          })
          .catch((err)=>{
            console.log(err)
          })
    }
    return () => isSubscribed = false
  }, [currentUser])

  return (
    <div>
      {isLogged || <Redirect to='/login'/>}
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