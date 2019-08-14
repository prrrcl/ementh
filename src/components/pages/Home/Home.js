import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'
import './Home.min.css'
import withAuth from '../../../hoc/withAuth';

const Home = (props) => {
useEffect(() => {
  effect
  return () => {
    cleanup
  };
}, [input])
  
  return (
    <>
    
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