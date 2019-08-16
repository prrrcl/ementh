import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import classService from '../../../services/class-services';
import './Home.min.css'
import withAuth from '../../../hoc/withAuth';
import { Power3, TimelineMax  } from "gsap/all";

const Home = (props) => {

  const [animation, setAnimation] = useState();
  const [classes, setClasses] = useState();

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
    const today = new Date();
    classService.getClassesOfUser(today,props.user._id)
    .then(response=>{
      setClasses(response)
    })
  },[props.user._id])


  return (
    <>
    
    <section className="home-section" ref={elements => {
            items = elements;
          }}>
      <h3 className="home-title">Today</h3>
    </section>
    
    </>
  )
}
export default withAuth(Home)