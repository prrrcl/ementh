import React from 'react';
import { Link } from "react-router-dom";

import withAuth from '../../../hoc/withAuth';

import './MenuSubComponent.min.css';
import { ReactComponent as Ementh } from "../../../icon-calendar.svg";

function MenuSubComponent(props) {
  const { isLoggedIn } = props
  return (
    <>
    {isLoggedIn &&
    <footer className="menu-bottom">
      <ul>
        <li><Link to={"/calendar"}><Ementh/></Link></li>
        <li><Link to={"/chat"}>b</Link><span></span></li>
        <li><Link to={"/friends"}>s</Link></li>
        <li><Link to={"/"}>n</Link></li>
      </ul>
    </footer>
    }
    </>
  )
}
export default withAuth(MenuSubComponent)