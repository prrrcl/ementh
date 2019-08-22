import React, {useState,useEffect} from 'react'
import withAuth from '../../../hoc/withAuth'
import authService from '../../../services/auth-services'
import { Link } from 'react-router-dom';
import './Friends.min.css';

const Friends = (props) => {
  
  const [user, setUser] = useState(null)
  const userFromUrl = props.match.params.id;
  useEffect(()=>{
    authService.getUser(userFromUrl)
    .then(response => {
      setUser(response.data)
    })
  },[userFromUrl])
  
  if(user){
    return (<>
    <h1 className="title-page friend-title">Amigos</h1>
      <section className="friend-list">
        {user.friends.length > 0 
        ?(
          user.friends.map((friend)=>{
            return(
              <article className="friend" key={friend._id}>
                <div>
                <Link className="friend-link" to={`/user/${friend._id}`}>
                  <img src={friend.profileImg} alt={friend.username}/>
                </Link>
                </div>
                <div className="info">
                <Link className="friend-link" to={`/user/${friend._id}`}>
                  <h4>{friend.username}</h4>
                </Link>
                  <Link className="send-message" to={'/'}>Enviar mensaje</Link>
                </div>
              </article>
            )
          })
        )
        :(
          <div>
        No tiene amigos agregados.
      </div>
        )
        }
        {}
      </section>
      </>
    )
  }else{
    return null;
  }
}

export default withAuth(Friends)