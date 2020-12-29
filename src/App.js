import React from 'react'
import { useAuth } from './context/AuthContext';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"

import NewGame from './component/NewGame'
import Signup from './component/Singup'
import Login from './component/Login'
import Game from './containers/Game'
import ForgotPassword from './component/ForgotPassword'
import Dashboard from './containers/Dashboard'
import PrivateRoute from './component/PrivateRoute'
import UpdateProfile from './component/UpdateProfile'

import Navbar from './component/Navbar'
import BottomNav from './containers/BottomNavigation'
//ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  appGrid: {
    minHeight: "100vh",
  },
});


function App() {
  const classes = useStyles(); 
  const {currentUser} = useAuth()

  return (
    <>
      {/* <AuthProvider> */}
        <Navbar></Navbar>
         
          <Router> <Grid
          container
          className={classes.appGrid}
          direction="column"
          justify="center"
          alignItems="center"
          >
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard}/>
              <PrivateRoute exact path="/new-game" component={NewGame}/>
              <PrivateRoute exact path="/game/:id" component={Game}/>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/forgot" component={ForgotPassword}/>
              <Route path="/update-profile" component={UpdateProfile}/>
            </Switch>
          </Grid>
              {currentUser ? (
          <BottomNav className={classes.BottomNav}></BottomNav>
          ) : null}
          </Router>
        {/* </AuthProvider> */}
      </>
  );
}

export default App;
