import React, { useState, useEffect } from 'react'
import withAuth from '../../../hoc/withAuth';
import moment from 'moment';
import 'moment/locale/es';
import './ReserveClass.min.css'
import classService from '../../../services/class-services'
moment.locale('es');

const ReserveClass = (props) => {
  const {classe, user} = props;
  const [isListed, setIsListed] = useState(false);
  const [currentClasse, setCurrentClasse] = useState(classe);
  const classeBooked = isListed ? 'booked' : null;
  
  useEffect(()=>{
    setIsListed(classe.amI)
  },[classe.amI]);

  const handleBook = (event, user, classe) =>{
   event.preventDefault();
   classService.bookClass(user,classe)
   .then(response => {
      setCurrentClasse(response.data)
      setIsListed(true)
      return response
   })
   .catch(err => {
     console.log(err)
   })
   }
   const handleDelBook = (event,user,classe) => {
     event.preventDefault();
     classService.delBookClass(user,classe)
     .then(response => {
      setCurrentClasse(response.data)
      setIsListed(false)
      return response
   });
   }
    
  return (
    <form key={classe._id}>
      <article>
        <div className="boxDad">
        <div className="box">
          <div className="modal">
            <h3>{classe.typeOfClass}</h3>
            <p>{moment(classe.date).format('LT')}h</p>
          </div>
          <div className="capacity">
            {currentClasse.participants.length}/{currentClasse.maxParticipants}
          </div>
          <span>
            <input type="text" hidden readOnly={true} value={classe._id}/>
          </span>
        </div>
        </div>
        {isListed 
        ? 
        (
          <button className={classeBooked} onClick={(event)=>handleDelBook(event, user, classe)}>
            Borrar clase
          </button>
        )
        :
        (
          classe.participants.length === classe.maxParticipants 
          ? (
          <button className="disabled" disabled onClick={(e)=>e.preventDefault()}>
          Clase llena
        </button>) 
          : 
          (
            <button className={classeBooked} onClick={(event)=>handleBook(event, user, classe)}>
              Reservar
            </button>
          )
        )
      }
        
      </article>
    </form>
  )
}
export default withAuth(ReserveClass);