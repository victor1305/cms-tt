import React, { useState, Fragment, useEffect } from 'react';
import { Switch, Route } from "react-router-dom"

import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Bets from './components/Bets/Bets'
import BetDetail from './components/Bets/BetDetail'
import Clients from './components/Client/Clients'
import ClientDetail from './components/Client/ClientDetail'
import DayDetail from './components/Bets/DayDetail'
import Login from './components/User/Login';
import useToken from './components/User/UseToken'
import jwt_decode from 'jwt-decode'
import Profile from './components/Profile/Profile';
import Stats from './components/Stats/Stats';

function App() {

  const { token, setToken } = useToken();
  const [ tokenInfo, setTokenInfo ] = useState({})
  const [ tokenId, setTokenId ] = useState('')

  useEffect(() => {  
    if (token) {
      setTokenId(token)
      setTokenInfo(jwt_decode(token))
    }
  }, [token])


  if(!token || (token && !tokenInfo.id)) {
    return <Login setToken = { setToken } />
  }

  
  return (
    <Fragment>
      <Route render = { props => <NavBar {...props}/> } />
      <Switch>
        <Route exact path = "/" render = { () => <Home />} />
        <Route path = "/apuestas" render = { props => <Bets {...props} tokenInfo = { tokenInfo } tokenId = { tokenId }/>} />
        <Route path = "/clientes" render = { props => <Clients {...props} tokenInfo = { tokenInfo } tokenId = { tokenId }/>} />
        <Route path = "/detalle-apuesta/:id" render = { props => <BetDetail  {...props}/>} />
        <Route path = "/detalle-dia" render = { props => <DayDetail  {...props} tokenInfo = { tokenInfo } tokenId = { tokenId }/>} />
        <Route path = "/detalle-cliente/:id" render = { props => <ClientDetail  {...props}/>} />
        <Route path = "/perfil" render = { props => <Profile {...props} tokenInfo = { tokenInfo } tokenId = { tokenId }/>} />
        <Route path = "/stats" render = { props => <Stats {...props} tokenInfo = { tokenInfo } tokenId = { tokenId }/>} />
      </Switch>
    </Fragment>
  );
}

export default App;
