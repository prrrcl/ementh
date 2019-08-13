import React from 'react';
import {Redirect} from 'react-router-dom'
import { ReactComponent as Ementh } from "../../../logobox.svg";

import './Login.min.css';

export default function Login(props) {
  const handleLogin = props.login;
  const isLogged = props.isLogged;
  return (
    
    <section className="login-page">
      {isLogged && <Redirect to="/"/>}
    <Ementh/>
    <form className="form-login" onSubmit={handleLogin}>
      <input type="text" placeholder="Usuario"/>
      <input type="password" placeholder="Password"/>
      <div>
        <button>E</button>
      </div>
    </form>
    </section>
  )
}
