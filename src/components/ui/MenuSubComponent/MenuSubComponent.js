import React ,{ useState } from 'react';
import { Link } from "react-router-dom";
import './MenuSubComponent.min.css';
import { ReactComponent as Ementh } from "../../../icon-calendar.svg";

export default function MenuSubComponent() {

  const [isLogged] = useState(true);

  return (
    <>
    {isLogged &&
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
