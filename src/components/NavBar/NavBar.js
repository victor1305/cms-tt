import React, { useState } from 'react';
import './navBar.css'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi';

const NavBar = (props) => {

  const [open, setOpen] = useState(false);
  
  const closeSesion = () => {
    try {

      localStorage.removeItem( 'TT-CMS-token' );
    }
    catch ( e ) {
  
      console.log( 'removeStorage: Error al borrar TT-CMS-token del localStorage: ' + JSON.stringify( e ) );

      return false;
    }

    window.location.assign('/')
    return true;
  }

  return (
    <nav className = "navbar">
      <Link to = '/' className = { props.location.pathname === '/' ? "nav-logo nav-link-actived" : "nav-logo" } onClick = {() => setOpen(false)}>
        TurfTipster
      </Link>

      <ul className = { open ? "nav-links active" : "nav-links" }>
        <li className = "nav-item">
          <Link to = '/apuestas' className = { props.location.pathname === '/apuestas' ? "nav-link nav-link-actived" : "nav-link" } onClick = {() => setOpen(false)}>
            Apuestas
          </Link>
        </li>

        <li className = "nav-item">
          <Link to = '/clientes' className = { props.location.pathname === '/clientes' ? "nav-link nav-link-actived" : "nav-link" } onClick = {() => setOpen(false)}>
            Clientes
          </Link>
        </li>

        <li className = "nav-item">
          <Link to = '/stats' className = { props.location.pathname === '/stats' ? "nav-link nav-link-actived" : "nav-link" } onClick = {() => setOpen(false)}>
            Stats
          </Link>
        </li>

        <li className = "nav-item">
          <Link to = '/perfil' className = { props.location.pathname === '/perfil' ? "nav-link nav-link-actived" : "nav-link" } onClick = {() => setOpen(false)}>
            Perfil
          </Link>
        </li>

        <li className = "nav-item">
          <Link to = '/' className = "nav-link" onClick = { closeSesion }>
            Cerrar Sesión
          </Link>
        </li>

      </ul>
      <div onClick={() => setOpen(!open)} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
    </nav>
  );
}
 
export default NavBar;