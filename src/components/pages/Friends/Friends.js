import React, {useState,useEffect} from 'react'
import withAuth from '../../../hoc/withAuth'
import authService from '../../../services/auth-services'

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
    return (
      <section className="friend-list">
        {user.friends.length > 0 
        ?(
          user.friends.map((friend)=>{
            return(
              <article key={friend._id}>
                {friend.username}
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
    )
  }else{
    return null;
  }
}

export default withAuth(Friends)