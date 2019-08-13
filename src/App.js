import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom'

import  Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Calendar from './components/pages/Calendar/Calendar';
import NotFound from './components/pages/NotFound/NotFound'
import Chat from './components/pages/Chat/Chat'
import Friends from './components/pages/Friends/Friends'

import MenuComponent from './components/ui/MenuComponent/MenuComponent';
import MenuSubComponent from './components/ui/MenuSubComponent/MenuSubComponent';

import './App.css';
import './components/core.min.css';

function App() {
 const [isLogged, setIsLogged] = useState(false);
 const [currentUser, setCurrentUser] = useState(null)
 
 const handleLogin = (e) => {
   e.preventDefault();
   setCurrentUser({
     username: "prrrcl",
     id: "5d5030c71ca8f03c92f7c63b"
   })
   setIsLogged(true);
 }
 const handleCloseSession = (e) => {
  setIsLogged(false);
 }

  return (
    <>{isLogged &&
    <MenuComponent isLogged={isLogged} handleCloseSession={handleCloseSession}/>
    }
    <main className="main-content">
      <Switch>
        <Route 
          exact path='/' 
          render={(props) => <Home {...props} isLogged={isLogged} currentUser={currentUser}/>}/>
        <Route path="/login" render={(props) => <Login {...props} isLogged={isLogged} login={handleLogin}/>}/>
        <Route path="/calendar" render={(props) => <Calendar {...props} isLogged={isLogged} currentUser={currentUser}/>}/>
        <Route path="/chat" render={(props) => <Chat {...props} isLogged={isLogged} currentUser={currentUser}/>}/>
        <Route path="/friends" render={(props) => <Friends {...props} isLogged={isLogged} currentUser={currentUser}/>}/>
        <Route component={NotFound}/>
      </Switch>
    </main>
    {isLogged &&
      <MenuSubComponent/>
    }
    </>
  );
}

export default App;
