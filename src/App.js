import React from 'react';
import { Switch , Route } from 'react-router-dom'

import AuthProvider from './context/auth-context'

import PrivateRoute from './components/routes/PrivateRoute'
import AnonRoute from './components/routes/AnonRoute'
import AdminRoute from './components/routes/AdminRoute'

import Home from './components/pages/Home/Home';
import LoginForm from './components/pages/LoginForm/LoginForm';
import Calendar from './components/pages/Calendar/Calendar';
import NotFound from './components/pages/NotFound/NotFound'
import Chat from './components/pages/Chat/Chat'
import Friends from './components/pages/Friends/Friends'
import CompleteSignUp from './components/pages/CompleteSignUp/CompleteSignUp'
import Invite from './components/pages/Invite/Invite'

import MenuComponent from './components/ui/MenuComponent/MenuComponent';
import MenuSubComponent from './components/ui/MenuSubComponent/MenuSubComponent';

import './App.css';
import './components/core.min.css';

function App() {


  return (
    <AuthProvider>
    
    {/* REVISAR ESTADO LOGIN */}
    <PrivateRoute><MenuComponent/></PrivateRoute> 
 
    <main className="main-content">
      <Switch>
        <AdminRoute
         path="/invite" 
         render={(props) => <Invite {...props}/>} 
        />
        <PrivateRoute 
          exact path='/' 
          render={(props) => <Home {...props} />} />
        <AnonRoute 
          exact
          path="/login" 
          render={(props) => <LoginForm {...props}/>} />
        <AnonRoute 
          exact
          path="/completesignup/:token/:email" 
            render={(props) => <CompleteSignUp {...props}/>} />
        <PrivateRoute 
          exact
          path="/calendar" 
          render={(props) => <Calendar {...props} />} />
        <PrivateRoute 
          exact
          path="/chat" 
          render={(props) => <Chat {...props} />}/>
        <PrivateRoute 
          exact
          path="/friends" 
          render={(props) => <Friends {...props} />} />
        <AnonRoute component={NotFound}/>
      </Switch>
    </main>
    
    {/* REVISAR ESTADO LOGIN */}
    <MenuSubComponent/>

    </AuthProvider>
  );
}

export default App;
