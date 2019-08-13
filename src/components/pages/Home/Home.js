import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import './Home.min.css'
export default function Home(props) {

const {currentUser,isLogged} = props
  
  return (
    <>
    {isLogged || <Redirect to='/login'/>}
    {isLogged &&
    <section className="home-section">
      <Link to="/" className="pages-wrapper">

        <article className="pages">
          <div className="content-pages">Guia de ejercicios</div>
        </article>

      </Link>
      <Link to="/" className="pages-wrapper">
        <article className="pages">
          <div className="content-pages">Benchmarks</div>
        </article>

      </Link>
      <Link to="/calendar" className="pages-wrapper">

        <article className="pages">
          <div className="content-pages">Calendario</div>
        </article>

      </Link>
      <Link to={`/friends/${currentUser.username}`} className="pages-wrapper">
        <article className="pages">
          <div className="content-pages">Amigos</div>
        </article>
      </Link>
    </section>
    }
    </>
  )
}
