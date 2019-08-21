import React from 'react'
import './ChatList.min.css';
import withAuth from '../../../hoc/withAuth'

const ChatList = (props) => {
  return (
    <section className="chatlist">
      <span class="create-bench">+</span>
      {props.user.chats < 1 && 
      <p className="no-chat">No tienes chats abiertos, empieza a chatear pulsando el botón +.</p>
      }
        {props.user.chats.map((chat)=>{
          return(
            <article key={chat._id}>

            </article>
          )
        })}
    </section>
  )
}

export default withAuth(ChatList)
