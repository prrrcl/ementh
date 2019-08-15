import React, { useState,useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client';

export default function Chat(props) {
  const isLogged = props.isLogged;
  const [messages, setMessages] = useState([]);
  const [socket] = useState(io(process.env.BACKEND_DOMAIN));
  
  useEffect(function () {
    let isSubscribed = true
    socket.on('message', message =>{
      if(isSubscribed){
        setMessages([...messages, message])
      }
    })
    return () => isSubscribed = false
  }, [messages, socket]);

  const handleSubmit = (e) =>{
    const body = e.target.value;
    if(e.keyCode === 13 && body){
      const message = {
        body,
        from: 'me'
      }
      setMessages([...messages, message]);
      socket.emit('message', body);
      e.target.value = ''
    }
  }
  const messagesDestructured = messages.map((message, i) =>{
    return(
      <li key={i}>
        {message.from} - {message.body}
      </li>
    )
  });
  return (
    <div>
      {isLogged || <Redirect to='/login'/>}
      Chat
      <input 
      type="text" 
      placeholder="Escribe algo"
      onKeyUp={handleSubmit}/>
      <ul>
        {messagesDestructured}
      </ul>
    </div>
  )
}
