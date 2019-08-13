import React from 'react';
import { Switch } from 'react-router-dom'

import AuthProvider from './context/auth-context'
import PrivateRoute from './components/routes/PrivateRoute'
import AnonRoute from './components/routes/AnonRoute'

import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Calendar from './components/pages/Calendar/Calendar';
import NotFound from './components/pages/NotFound/NotFound'
import Chat from './components/pages/Chat/Chat'
import Friends from './components/pages/Friends/Friends'
import CompleteSignUp from './components/pages/CompleteSignUp/CompleteSignUp'

import MenuComponent from './components/ui/MenuComponent/MenuComponent';
import MenuSubComponent from './components/ui/MenuSubComponent/MenuSubComponent';

import './App.css';
import './components/core.min.css';

function App() {


  return (
    <AuthProvider>
    
    {/* REVISAR ESTADO LOGIN */}
    <MenuComponent/>
 
    <main className="main-content">
      <Switch>
        <PrivateRoute 
          exact path='/' 
          render={(props) => <Home {...props} />} />
        <AnonRoute path="/login" render={(props) => <Login {...props}/>} />
        <AnonRoute path="/completesignup/:token/:email" render={(props) => <CompleteSignUp {...props}/>} />
        <PrivateRoute path="/calendar" render={(props) => <Calendar {...props} />} />
        <PrivateRoute path="/chat" render={(props) => <Chat {...props} />}/>
        <PrivateRoute path="/friends" render={(props) => <Friends {...props} />} />
        <AnonRoute component={NotFound}/>
      </Switch>
    </main>
    
    {/* REVISAR ESTADO LOGIN */}
    <MenuSubComponent/>

    </AuthProvider>
  );
}

export default App;
