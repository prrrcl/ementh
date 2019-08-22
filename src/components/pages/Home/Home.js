import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import classService from '../../../services/class-services';
import './Home.min.css'
import withAuth from '../../../hoc/withAuth';
import { Power3, TimelineMax  } from "gsap/all";
import HomeAdmin from './../../ui/HomeAdmin/HomeAdmin'
import moment from 'moment';
import 'moment/locale/es';
import ReserveClassWithDate from '../../ui/ReserveClassWithDate/ReserveClassWithDate';
moment.locale('es')

const Home = (props) => {
  const [animation, setAnimation] = useState();
  const [classes, setClasses] = useState([]);

  let items = useRef(null);

  useEffect(() => {
    let newTimeLine = new TimelineMax()
    setAnimation(
      newTimeLine
      .staggerFrom(
        items.children,
        0.5, 
        { alpha: 0, y: -30 }
        , 0.08)
      .staggerTo(
        items.children,
        0.1,
        { alpha: 1, y: 0, ease: Power3.easeOut },
        0.1).play().delay(0.4))
  }, []);

  useEffect(()=>{
    classService.getClassesOfUser(props.user._id)
    .then(response=>{
      const newArr = [...response.data];
      const filtered = newArr.filter((clase)=>{
        return clase.amI;
      })
      setClasses(filtered)
    })
  },[props.user._id])

  
  const { isAdmin } = props.user;
  return (
    <>
    {isAdmin 
    ?
    (<>
    <HomeAdmin action="createclass"/>
    <HomeAdmin action="inviteuser"/>
    
     
    </>)
    :
    (<section className="home-section hours" ref={elements => {
      items = elements;
    }}>
    <h3 className="home-title">Mis reservas</h3>
    {classes 
    ? (
      classes.map((classe)=>{
        return(
          <ReserveClassWithDate key={classe._id} classe={classe}/>
        )
      })
    )
    :
    (
    <p>¡No te has apuntado a ninguna clase todavia!</p>
    ) 
    }
    </section>)
    }
    
    
    </>
  )
}
export default withAuth(Home)