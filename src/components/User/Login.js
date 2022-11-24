import React, { useState } from 'react';
import { css } from "@emotion/react";
import axios from 'axios'
import DotLoader from "react-spinners/DotLoader";
import './login.css'

import logo from '../../images/LogoTT.png'

const USERS_BASE_URL = 'https://api-tt.onrender.com/api/'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const Login = ({setToken}) => {

  // HOOKS -------------------------
  const [ user, updateUser ] = useState({})
  const [ spinner, showSpinner ] = useState(false)
  const [ errorMsg, updateErrorMsg ] = useState('')

  // FUNCTIONS

  const updateUserState = (e) => {
    e.preventDefault()
    updateUser({
      ...user,
      [e.target.name]: e.target.value
    })

    if(errorMsg) {
      updateErrorMsg('')
    }
  }

  const login = async (e) => {
    e.preventDefault()
    try {
      showSpinner(true)
      const { data } = await axios.post(`${USERS_BASE_URL}iniciar-sesion-turftipster`, user)
      setToken(data)
      updateUser({})
      showSpinner(false)

    } catch (error) {
      console.log(error)
      showSpinner(false)
      updateErrorMsg((error.response && error.response.data && error.response.data.error) ? error.response.data.error : 'Hubo un error al conectar con la Base de Datos')
    }
  }


  return (
    <div className = "login-container-big">
      {spinner ?

        <div className = "spinnerContainer">
          <DotLoader 
            color={"#3860fb"} 
            loading={spinner} 
            css={override} 
            size={150} />
        </div>
      :
        <div>
          <div className = "title-container-login">
            <img className = "login-logo-container" src = { logo } alt = "TT-logo"/>
            <h4>CMS <span>TurfTipster</span></h4>
          </div>
          <div className = "form-container-login">
            <p className = "form-title-login">Iniciar Sesión</p>
            <form onSubmit = { login }>

              <div className = "form-login">

                <label className = "label-login form-label-login-user">Usuario</label>
                <input className = "input-login form-input-login-user" type="text" name="username" onChange = { updateUserState }/> 

                <label className = "label-login form-label-login-pass">Contraseña</label>
                <input className = "input-login form-input-login-pass" type="password" name="password" onChange = { updateUserState }/> 

              </div>

              {errorMsg &&
                <div className = "login-error">
                  <p className = "login-error-msg">{ errorMsg }</p>
                </div>
              }

              <div className = "form-btn-container-login">
                <button className = "form-btn-login" type="submit">Entrar</button>
              </div>

            </form>
          </div>
          <div className = "margin-bottom-box"></div>
        </div>
      }
    </div>
  );
}
 
export default Login;