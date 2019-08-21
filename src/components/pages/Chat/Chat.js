import React, { useState,useEffect } from 'react'
import io from 'socket.io-client';
import withAuth from '../../../hoc/withAuth'

const Chat = (props)=> {
  const [messages, setMessages] = useState([]);
  const [oldmessages, setOldMessages] = useState([]);
  const [socket] = useState(io(`${process.env.REACT_APP_BACKEND_DOMAIN}`));
    socket.on('create', () => { socket.join(props.match.params.id); })
    
  useEffect(function () {
   let isSubscribed = true
   socket.on('message', message =>{
    if(isSubscribed){
     setMessages([...messages, message])}
   })
   return () => isSubscribed = false
  }, [messages, socket]);
  
    // useEffect(() => {
    //     const id = props.match.params.id
    //     chat.getAllMessages(id)
    //     .then(r=> setOldMessages(r.data[0]))
    //     .catch(e=>console.log(e))
    // }, [props.match.params.id])
  const handleSubmit = (e) =>{
    const body = props.user.username + ':    ' + e.target.value;
    if(e.keyCode === 13 && body){
      const message = {
        body,
        from: socket.id,
        room: props.match.params.id
      }
    // chat.updateOneM({body}, props.match.params.id)
    //  .then(response => {console.log(response)})
    //  .catch(e=>console.log(e))
      setMessages([...messages, message]);
      socket.emit('message', message);
      e.target.value = ''
    }
  }
  const messagesDestructured = messages.map((message, i) =>{
      if(message.body.room === props.match.params.id || message.from === socket.id){
          const {body} = message
          return(
            <li key={i}>
            {body.body ? `${body.body}` : `${body}`}
          </li>
          )
      }else{
        return null;
      }
    
  });
  return (
      <>
    <div className='chat-form'>
      <ul>
          {oldmessages.chat ? oldmessages.chat.map((message, i) => {
              return <li key={i}>
              {  `${message}`}
            </li>
          }): null}
        {messagesDestructured}
      </ul>
      <input className='form-for-chat'
      type="text" 
      placeholder="Escribe algo"
      onKeyUp={handleSubmit}/>
    </div>
    </>
  )
}
export default withAuth(Chat)