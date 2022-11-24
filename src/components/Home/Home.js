import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'

import logo from '../../images/LogoTT.png'

const Home = () => {
  return (
    <div className = "home-container">

      <div className = "title-container-login">
        <img className = "login-logo-container" src = { logo } alt = "TT-logo"/>
        <h4>CMS <span>TurfTipster</span></h4>
      </div>

      <div className = "home-buttons-container">
        <div className = "button-home-container">
          <Link to="/apuestas">
            <button className = "principal-button">Gestión Apuestas</button>
          </Link>
        </div>
        <div className = "button-home-container">
          <Link to="/clientes">
            <button className = "principal-button">Gestión Clientes</button>
          </Link>
        </div>
        <div className = "button-home-container">
          <Link to="/stats">
            <button className = "principal-button">Estadísticas</button>
          </Link>
        </div>
        <div className = "button-home-container">
          <Link to="/perfil">
            <button className = "principal-button">Mi Perfil</button>
          </Link>
        </div>
      </div>
      <div className = "margin-bottom-box"></div>
    </div>
  );
}
 
export default Home;