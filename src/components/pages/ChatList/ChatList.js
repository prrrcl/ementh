import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ChatList.min.css';
import withAuth from '../../../hoc/withAuth'
import authService from '../../../services/auth-services'
import classService from '../../../services/class-services'

const ChatList = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const classToggle = isOpen ? ' is-opened' : '';
  const [friends, setFriends] = useState();

  useEffect(()=>{
    authService.getUser(props.user._id)
    .then(response => {
      setFriends(response.data.friends)
    })
  },[props.user._id])
  

  const toggle = () => {
    setIsOpen(!isOpen);
  }
  const createRoom = (friendId) => {
    classService.createRoom(props.user._id, friendId)
    .then(response=>response)
  }
  return (
    <section className="chatlist">
      <span onClick={toggle} className={`toggle add-chat${classToggle}`}>+</span>
      
      {props.user.chats.length < 1 && 
        <p className="no-chat">No tienes chats abiertos, empieza a chatear pulsando el botón +.</p>
      }
        {props.user.chats.map((chat)=>{
          return(
            <article key={chat._id}>

            </article>
          )
        })}
        <div className={`friend-list-chat${classToggle}`}>
          <div className="wrapper-chat-list">
          <h3>Tus amigos</h3>
          {friends 
          ? (
            friends.map((friend)=>{
              return (
                <Link onClick={()=>createRoom(friend._id)} className="friend-chat" to={`/chat/${props.user.username}-${friend.username}`} key={friend._id}>
                  {friend.username}
                </Link>
              )
            })
          )
          : (
            <p>No tienes amigos agregados actualmente, ¡busca tu compañer@ de box y chatea con el/ella!</p>
          )}
          </div>
        </div>
    </section>
  )
}

export default withAuth(ChatList)
