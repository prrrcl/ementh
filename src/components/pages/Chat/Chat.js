import React, { useState,useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.min.css';
import withAuth from '../../../hoc/withAuth';
import classService from '../../../services/class-services'

import moment from 'moment';
import 'moment/locale/es';
moment.locale('es')

const Chat = (props)=> {
  const [messages, setMessages] = useState([]);
  const [oldmessages, setOldMessages] = useState([]);
  const [error,setError] = useState();
  const [socket] = useState(io(`${process.env.REACT_APP_BACKEND_DOMAIN}`));
  
  socket.on('create', () => { socket.join(props.match.params.id); })
    
  useEffect(() =>{
    let isSubscribed = true
    scrollToBottom();
   socket.on('message', message =>{
    if(isSubscribed){
     setMessages([...messages, message])}
   })
   
   return () => isSubscribed = false;
  }, [error, messages, props, socket]);
  
  useEffect(()=>{
    classService.loginRoom(props.match.params.id)
    .then((response)=>{
      if(response.status === 200){
        setOldMessages(response.data)
      }
    })
    .catch(()=>{
      setError('No tienes acceso a este chat.')
    })

  },[props.match.params.id])

  const scrollToBottom = () => {
    let objDiv = document.querySelector(".list-mess");
    let objDiv2 = document.querySelector(".chat-form");
    console.log(objDiv)
    objDiv.scrollTop = objDiv.scrollHeight;
    objDiv2.scrollTop = objDiv2.scrollHeight;
  }

  const handleSubmit = (e) =>{
    const body = e.target.value;
    if(e.keyCode === 13 && body){
      scrollToBottom();
      const message = {
        body,
        from: socket.id,
        room: props.match.params.id,
        date: new Date()
      }
      classService.pushMessage(body, oldmessages._id, props.user._id)
      .then(response=>response)
   
      setMessages([...messages, message]);
      socket.emit('message', message);
      e.target.value = ''
    }
  }
  const messagesDestructured = messages.map((message, i) =>{
      if(message.body.room === props.match.params.id || message.from === socket.id){
          const {body} = message
          const classOtheruser = body.body ? 'other-user-message' : 'me-message'
          return(
            <>
            <li className={classOtheruser} key={i}>
            {body.body 
              ? `${body.body}` 
              : `${body}`}
              <span>{moment(message.date).format('LT')}</span>
          </li>
          </>
          )
      }else{
        return null;
      }
    
  });
  return (
      <>
    <div className='chat-form'>
    {error 
      ?
      (
       <p>{error}</p> 
      )
      :
      (
        <>
        <ul className="list-mess">
          {oldmessages.messages ? oldmessages.messages.map((message, i) => {
              const classMessage = message.idUser === props.user._id ? 'me-message' : 'other-user-message';
              return <li className={classMessage} key={i}>
              {  `${message.message}`}
              <span>{moment(message.createdAt).format('LT')}</span>
            </li>
          }): null}
        {messagesDestructured}
      </ul>
      <input className='form-for-chat'
      type="text" 
      placeholder="Escribe algo"
      onKeyUp={handleSubmit}/>
      </>
      )
    }
      
    </div>
    </>
  )
}
export default withAuth(Chat)