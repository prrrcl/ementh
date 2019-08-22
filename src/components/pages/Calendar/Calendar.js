import React , { useState } from 'react'

import 'react-daypicker/lib/DayPicker.css';
import './Calendar.min.css'
import DayPicker from '../../ui/DayPicker/DayPicker';
import ReserveClass from '../../ui/ReserveClass/ReserveClass'
import classService from '../../../services/class-services'
import withAuth from '../../../hoc/withAuth'
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es')


const Calendar = (props) => {
  const [day, setDay] = useState(null);
  const [lastDaySelected, setLastDaySelected] = useState(null);
  const [classes, setClasses] = useState(null);


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

  const handlePickDay = (day) =>{
    const newDate = day.toLocaleDateString('es-ES').split('/').reduce((a,b)=>{
      return [a+b];
    });
    const user = props.user._id;
    const classesFromDb = classService.getClasses(newDate, user)
    .then((response)=>{
        setClasses(response.data);
    })
    .catch((err)=>{
      console.log(err)
    })
   return classesFromDb;
  }
  const { isAdmin } = props.user;
  
  return (
<>
    <div className={`select-date ${classHasDay}`}>

    <h1 className="title-page">Calendario</h1>
      <div className="container">
        <div className="content-calendar">
          <DayPicker onDayClick={
            (day) => {
              setDay({ day });
              setLastDaySelected(day); 
              handlePickDay(day);
              } 
              }/>
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
                  classes.map((classe, index)=>{
                    return(
                      <ReserveClass key={classe._id} classe={classe}/>
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
export default withAuth(Calendar);