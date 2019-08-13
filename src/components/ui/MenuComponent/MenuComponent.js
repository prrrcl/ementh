import React,  { useState, useEffect, useRef }  from 'react'
import { Link } from "react-router-dom";

import withAuth from '../../../hoc/withAuth';

import { ReactComponent as Ementh } from "../../../logotipo.svg";
import { Power3, TimelineMax  } from "gsap/all";
import './MenuComponent.css';

function MenuComponent(props) {
  
  const {isLoggedIn, logout } = props; 
  const [isOpened, setOpened] = useState(false);
  const [animation, setAnimation] = useState();

  let links = useRef(null);

  const handleOpenMenu = () => {
    if(isOpened){
      animation.reverse().delay(0)
      setOpened(false)
    }else{
      if( animation.reversed()){
        animation.play().delay(0.5)
      }
      setOpened(true)
    }
  };
  const classOpened = isOpened ? 'opened' : '';

  useEffect(() => {
    let newTimeLine = new TimelineMax()
    setAnimation(
      newTimeLine
      .staggerFrom(
        links.children,
        0.5, 
        { alpha: 0, y: -30 }
        , 0.08)
      .staggerTo(
        links.children,
        0.1,
        { alpha: 1, y: 0, ease: Power3.easeOut },
        0.1).reverse())
  }, []);
  return (
    <header className="sticky-header">
    {isLoggedIn &&
      <nav className="navbar-mobile">
        <div onClick={() => {handleOpenMenu()}} className={`profile-hamburger ${classOpened}`}>
          <div className="bg"></div>
        </div>
        <div className={`logo-head ${classOpened}`}>
       <Link to={"/"}><Ementh/></Link> 
        </div>
        <ul ref={elements => {
            links = elements;
          }} className={`items-menu ${classOpened}`}>
          <li><img src="https://scontent.fmad3-7.fna.fbcdn.net/v/t1.0-9/10007421_785919864774888_951160337752481978_n.jpg?_nc_cat=103&_nc_oc=AQnokk9jHmTvx-0NZ4GZtUAiq5e81DFvgEkGSvyeU74UjmV43xZiQhfHULroM9NdZgI&_nc_ht=scontent.fmad3-7.fna&oh=eb23a2f49c8abd623d1cdfa3f3b303ca&oe=5DE19EA8" alt=""/></li>
          <li>
            <Link
                  to={"/"}
                  onClick={handleOpenMenu}
                >Perfil</Link>
          </li>
          <li>
            <Link
                  to={"/calendar"}
                  onClick={handleOpenMenu}
                >Calendario</Link>
          </li>
          <li>
            <Link
                  to={"/"}
                  onClick={handleOpenMenu}
                >Administrar pagos</Link>
          </li>
          <div className="divisor"></div>
          <li>
            <Link
                  to={"/"}
                  onClick={() => {handleOpenMenu(); logout()}}
                >Cerrar sesión</Link>
          </li>
          
          
        </ul>
      </nav>
    }
    </header>
  )
}

export default withAuth(MenuComponent);