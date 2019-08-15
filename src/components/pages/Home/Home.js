import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import './Home.min.css'
import withAuth from '../../../hoc/withAuth';
import { Power3, TimelineMax  } from "gsap/all";

const Home = (props) => {

  const [animation, setAnimation] = useState();

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
        0.1).play().delay(0.8))
  }, []);

  return (
    <>
    
    <section className="home-section" ref={elements => {
            items = elements;
          }}>
      <Link to="/" className="pages-wrapper" onClick={props.animation}>

        <article className="pages">
          <div className="content-pages">Guia de ejercicios</div>
        </article>

      </Link>
      <Link to="/" className="pages-wrapper">
        <article className="pages">
          <div className="content-pages">Benchmarks</div>
        </article>

      </Link>
      <Link to="/calendar" className="pages-wrapper" onClick={props.animation}>

        <article className="pages">
          <div className="content-pages">Calendario</div>
        </article>

      </Link>
      <Link to={`/friends/${props.user.username}`} className="pages-wrapper">
        <article className="pages">
          <div className="content-pages">Amigos</div>
        </article>
      </Link>
    </section>
    
    </>
  )
}
export default withAuth(Home)