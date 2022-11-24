import React, { useEffect, useState } from 'react';
import Modal from '../../Modal/Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import ErrorModal from '../../Modal/ErrorModal';
import { setDefaultLocale } from  "react-datepicker";
setDefaultLocale('es')

const BETS_BASE_URL = 'https://api-tt.onrender.com/api/apuestas/'
//const BETS_BASE_URL = 'http://localhost:3030/api/apuestas/'

const BetModal = ( props ) => {

  // HOOKS
  const [ bet, addBetState ] = useState({})
  const [ modalError, showModalError ] = useState(false)
  const [ startDate, setStartDate ] = useState(new Date())
  const [ errors, saveErrors ] = useState({})
  const [ errorMsg, updateErrorMsg ] = useState('')

  let validation = {}

  let hour = ''
  let date = ''
  let isoDate = ''

  useEffect(() => {
    addBetState({
      bookie: props.bookie,
      racecourse: props.racecourse,
      race: props.race,
      betName: props.betName,
      price: props.price,
      stake: props.stake,
      status: props.status,
      position: props.position,
      date: props.date,
      betCode: props.betCode      
    })

    if(props.date) {
      setStartDate(new Date (props.date.split("T")[0]) )
    }

    if(props.deleteErrors){
      saveErrors({})
    }
  }, [props])

  useEffect(() => {

    async function modifyDate() {

      await getTime()
      await setDate()
    }

    modifyDate()
    // eslint-disable-next-line
  }, [startDate])

  // FUNCTIONS

  const getTime = () => {

    let oldHour = ''

    if(props.date) {
      oldHour = props.date.slice(11)
    }

    hour = !props.date ? new Date().toISOString().slice(11) : oldHour
    date = startDate.toISOString().slice(0,11)
    isoDate = `${date}${hour}`
  }

  const setDate = () => {    
    addBetState({
      ...bet,
      date: isoDate
    })    
  }

  const updateBetState = e => {
    addBetState({
      ...bet,
      [e.target.name] : e.target.value
    })
  }

  const validateForm = () => {
    validation = {}
    if (!bet.bookie) {
      validation.bookie = 'Se te olvidó el nombre de la Bookie!'
    }
    if (!bet.racecourse) {
      validation.racecourse = 'Necesito el nombre del hipódromo'
    }
    if (!bet.race) {
      validation.race = 'Falta el número de carrera!'
    } 
    if (!bet.betName) {
      validation.betName = 'Si no me dices que apuesta es...'
    } 
    if (!bet.price) {
      validation.price = 'Vale, y la cuota?'
    } 
    if (!bet.stake) {
      validation.stake = 'El stake es bastante importante'
    } 
    if (!bet.betCode) {
      validation.betCode = 'Me falta el código de apuesta'
    } 

    saveErrors(validation)
  }

  const validateBet = e => {
    e.preventDefault()
    saveErrors({})
    validateForm()

    if (Object.values(validation).length > 0) {
      return
    } 
    
    if (props._id) {
      updateBet()
    } else {
      createBet()
    }
    
  }

  const createBet = async () => {
    try {
      props.handleClose()
      props.showSpinner(true)
      await axios.post(`${BETS_BASE_URL}crear-apuesta`, bet, {
        headers: {
          'auth-token': props.tokenId
        }
      })
      await props.reloadBets()
      deleteInputs()
      setStartDate( new Date() )
      props.showSpinner(false)

    } catch (error) {
      console.log(error)
      props.handleClose()
      props.showSpinner(false)
      updateErrorMsg((error.response && error.response.data && error.response.data.error) ? error.response.data.error : 'Hubo un error al conectar con la Base de Datos')
      showModalError(true)
    }
  }

  const updateBet = async () => {
    try {
      props.handleClose()
      props.showSpinner(true)
      await axios.put(`${BETS_BASE_URL}detalle-apuesta/${props._id}/edit`, bet, {
        headers: {
          'auth-token': props.tokenId
        }
      })
      await props.reloadBets()
      deleteInputs()
      setStartDate( new Date() )
      props.showSpinner(false)

    } catch (error) {
      console.log(error)
      props.handleClose()
      props.showSpinner(false)
      updateErrorMsg((error.response && error.response.data && error.response.data.error) ? error.response.data.error : 'Hubo un error al conectar con la Base de Datos')
      showModalError(true)
    }
  }

  const deleteInputs = () => {
    document.getElementById('bets-form').reset()
  }

  const closeModalError = () => {
    showModalError(false)
  }

  return (
    <div>
      <Modal show = { props.show } handleClose = { props.handleClose }>
        <h4 className = "form-title">{ props._id ? 'Editar' : 'Crear'} Apuesta</h4>
        <form className = "form-container" id = "bets-form" onSubmit = {validateBet}>

          <div className = "form-group">
            <label className = "form-label">Bookie *:</label>
            <select className = "form-input" name="bookie" onChange = {updateBetState} value = {bet.bookie}>
              <option>--- Selecciona una Bookie ---</option>
              <option>Bet365</option>
              <option>Betfair</option>
              <option>Sportium</option>
              <option>William Hill</option>
            </select>
            { errors.bookie && <p className = "form-error">{errors.bookie}</p> }
          </div>

          <div className = "form-group">
            <label className = "form-label">Hipódromo *:</label>
            <select className = "form-input" name="racecourse" onChange = {updateBetState} value = {bet.racecourse}>
              <option>--- Selecciona un Hipódromo ---</option>
            { props.racecourses.data && props.racecourses.data.map(elm => (
              <option key = {elm._id}>{elm.racecourse}</option>
            )) }
            </select>
            { errors.racecourse && <p className = "form-error">{errors.racecourse}</p> }
          </div>

          <div className = "form-group">
            <label className = "form-label">Carrera *:</label>
            <input className = "form-input" type="text" name="race" onChange = {updateBetState} defaultValue = {bet.race}/>
            { errors.race && <p className = "form-error">{errors.race}</p> }
          </div>

          <div className = "form-group">
            <label className = "form-label">Apuesta *:</label>
            <input className = "form-input" type="text" name="betName" onChange = {updateBetState} defaultValue = {bet.betName}/>
            { errors.betName && <p className = "form-error">{errors.betName}</p> }
          </div>

          <div className = "form-group">
            <label className = "form-label">Stake *:</label>
            <select className = "form-input" name="stake" onChange = {updateBetState} value = {bet.stake}>
              <option>--- Selecciona un Stake ---</option>
            { props.stakes.data && props.stakes.data.map(elm => (
              <option key = {elm._id}>{elm.stake}</option>
            )) }
            </select>
            { errors.stake && <p className = "form-error">{errors.stake}</p> }
          </div>          

          <div className = "form-group">
            <label className = "form-label">Cuota *:</label>
            <input className = "form-input" name="price" onChange = {updateBetState} defaultValue = {bet.price}/>
            { errors.price && <p className = "form-error">{errors.price}</p> }
          </div>

          <div className = "form-group">
            <label className = "form-label">Código *:</label>
            <select className = "form-input" name="betCode" onChange = {updateBetState} value = {bet.betCode}>
              <option>--- Selecciona un Código ---</option>
            { props.betCodes.data && props.betCodes.data.map(elm => (
              <option key = {elm._id}>{elm.betCode}</option>
            )) }
            </select>
            { errors.betCode && <p className = "form-error">{errors.betCode}</p> }
          </div>      

          <div className = "form-group">
            <label className = "form-label">Fecha:</label>
            <DatePicker 
              className = "form-input" 
              dateFormat="dd/MM/yyyy" 
              selected={ startDate } 
              onChange={ (date) => setStartDate(date) } 
              showPopperArrow={false}/>
          </div>

          <div className = "form-group">
            <label className = "form-label">Posición:</label>
            <input className = "form-input" name="position" onChange = {updateBetState} defaultValue = {bet.position}/>
          </div>

          <div className = "form-group">
            <label className = "form-label">Estado:</label>
            <select className = "form-input" name="status" onChange = {updateBetState} value = {bet.status}>
              <option>--- Selecciona un Estado ---</option>
              <option>win</option>
              <option>loss</option>
              <option>void</option>
              <option>pending</option>
            </select>
          </div>

          <div className = "form-btn-container">
            <button className = "form-btn" type="submit">{ props._id ? 'Editar' : 'Crear'}</button>
          </div>
          
        </form>
      </Modal>
      <ErrorModal 
        show = { modalError }
        handleClose = { closeModalError }
        msg = { errorMsg }/>
    </div>
  );
}
 
export default BetModal;