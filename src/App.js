import React from 'react';
import { Switch } from 'react-router-dom'

import AuthProvider from './context/auth-context'

import PrivateRoute from './components/routes/PrivateRoute'
import AnonRoute from './components/routes/AnonRoute'
import AdminRoute from './components/routes/AdminRoute'

import Home from './components/pages/Home/Home';
import User from './components/pages/User/User';
import LoginForm from './components/pages/LoginForm/LoginForm';
import Calendar from './components/pages/Calendar/Calendar';
import NotFound from './components/pages/NotFound/NotFound'
import Chat from './components/pages/Chat/Chat'
import Friends from './components/pages/Friends/Friends'
import CompleteSignUp from './components/pages/CompleteSignUp/CompleteSignUp'
import Invite from './components/pages/Invite/Invite'
import Profile from './components/pages/Profile/Profile';
import Benchmarks from './components/pages/Benchmarks/Benchmarks';

import MenuComponent from './components/ui/MenuComponent/MenuComponent';
import MenuSubComponent from './components/ui/MenuSubComponent/MenuSubComponent';

import './App.css';
import './components/core.min.css';

function App() {


  return (
    <AuthProvider>
    
    {/* REVISAR ESTADO LOGIN */}
   
 
    <main className="main-content">
      <Switch>
        <AdminRoute
         path="/invite" 
         render={(props) => <> <MenuComponent/><Invite {...props}/></>} 
        />
        <PrivateRoute 
          path='/' 
          exact
          render={(props) => <> <MenuComponent/><Home {...props} /></>} />
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
          render={(props) => <> <MenuComponent/><Calendar {...props} /></>} />
        <PrivateRoute 
          exact
          path="/user/:id" 
          render={(props) => <> <MenuComponent/><User {...props} /></>} />
        <PrivateRoute 
          exact
          path="/user/:id/benchmarks" 
          render={(props) => <> <MenuComponent/><Benchmarks {...props} /></>} />
        <PrivateRoute 
          exact
          path="/user/:id/benchmarks/:idbench" 
          render={(props) => <> <MenuComponent/><Benchmarks {...props} /></>} />
        <PrivateRoute 
          exact
          path="/profile" 
          render={(props) => <> <MenuComponent/><Profile {...props} /></>} />
        <PrivateRoute 
          exact
          path="/chat" 
          render={(props) => <> <MenuComponent/><Chat {...props} /></>}/>
        <PrivateRoute 
          exact
          path="/friends" 
          render={(props) => <> <MenuComponent/><Friends {...props} /></>} />
        <AnonRoute component={NotFound}/>
      </Switch>
    </main>
    
    {/* REVISAR ESTADO LOGIN */}
    <MenuSubComponent/>

    </AuthProvider>
  );
}

export default App;
