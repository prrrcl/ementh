import React , { useState } from 'react'
import { Redirect } from 'react-router-dom'
import 'react-daypicker/lib/DayPicker.css';
import './Calendar.min.css'
import DayPicker from '../../ui/DayPicker/DayPicker';
import userService from '../../../services/user-services';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es')


export default function Calendar(props) {
  const [day, setDay] = useState(null);
  const [lastDaySelected, setLastDaySelected] = useState(null);
  const [classes, setClasses] = useState(null);
  const isLogged = props.isLogged;
  const newDate = (day) =>{
    return new Date(day)
  }
  const classHasDay = day !== null ? 'has-day' : '';
  const classAnimBack = day !== null ? 'opened' : '';
  
  const handleDayOff = () =>{
    setDay(null);
  }
  
  const upper = (str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleAddClass = (e) =>{
    e.preventDefault()
    console.log(e)
  }
  const handlePickDay = (day) =>{
    const newDate = day.toLocaleDateString('es-ES').split('/').reduce((a,b)=>{
      return [a+b];
    });
    const classesFromDb = userService.getClasses(newDate)
    .then((response)=>{
        setClasses(response.data);
    })
    .catch((err)=>{
      console.log(err)
    })
   return classesFromDb;
  }
 
  return (
    <>
    {isLogged || <Redirect to='/login'/>}
    <div className={`select-date ${classHasDay}`}>
    <h1 className="title-page">Calendario</h1>
      <div className="container">
      <div className="content-calendar">
        <DayPicker onDayClick={(day) => {setDay({ day }); setLastDaySelected(day); handlePickDay(day)} }/>

        <p>
        ¡Selecciona un día en el calendario
          y elige un horario para reservar tu clase!
        </p>
      </div>
      <div className="content-hours">
        <span className={`go-back ${classAnimBack}`} onClick={handleDayOff}>t</span>
        {lastDaySelected &&
          <article className="choose-hours">
            <header>
              <h3>{upper(moment(newDate(lastDaySelected)).format('dddd'))}</h3>
              <h4>{moment(newDate(lastDaySelected)).format('LL')}</h4>
            </header>
            <main className="hours">
              {classes &&
                classes.map((classe)=>{
                  return(
                    <form onSubmit={handleAddClass} key={classe._id}>
                    <article>
                      <div className="box">
                        <div className="modal">
                          <h3>{classe.typeOfClass}</h3>
                          <p>{moment(classe.date).format('LT')}h</p>
                        </div>
                        <div className="capacity">
                          {classe.participants.length}/{classe.maxParticipants}
                        </div>
                        <span><input type="text" hidden value={classe.date}/></span>
                      </div>
                      <button>
                        Reservar
                      </button>
                    </article>
                    </form>
                  )
                })
              }
            </main>
        </article>
        }
      </div>
      </div>
    </div>
    </>
  )
}
