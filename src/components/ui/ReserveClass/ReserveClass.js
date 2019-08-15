import React, { useState, useEffect } from 'react'
import withAuth from '../../../hoc/withAuth';
import moment from 'moment';
import 'moment/locale/es';
import './ReserveClass.min.css'
import classService from '../../../services/class-services'
moment.locale('es');

const ReserveClass = (props) => {
  const {classe, index, user} = props;
  const [isListed, setIsListed] = useState(false);
  console.log(props)
  
  const handleBook = (event, user, idClass) =>{
   event.preventDefault();
   console.log(user,idClass)
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
            {classe.participants.length}/{classe.maxParticipants}
          </div>
          <span>
            <input type="text" hidden readOnly={true} value={classe._id}/>
          </span>
        </div>
        </div>
        <button onClick={(event)=>handleBook(event, user, classe)}>
          Reservar
        </button>
      </article>
    </form>
  )
}
export default withAuth(ReserveClass);