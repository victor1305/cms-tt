import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './bets.css'
import BetModal from './Modals/BetModal';
import ErrorModal from '../Modal/ErrorModal'

import axios from 'axios'
import ConfirmationModal from '../Modal/ConfirmationModal';

const BETS_BASE_URL = 'https://api-tt.onrender.com/api/apuestas/'
//const BETS_BASE_URL = 'http://localhost:3030/api/apuestas/'

const BetCard = (props) => {


  const { _id, status, racecourse, betName, stake, price, profit, date } = props

  const [ modalBets, showModalBets ] = useState(false)
  const [ modalDeleteBet, showModalDeleteBet ] = useState(false)
  const [ modalError, showModalError ] = useState(false)
  const [ errorMsg, updateErrorMsg ] = useState('')

  let bet = {
    _id: _id,
    status: status,
    racecourse: racecourse,
    betName: betName,
    stake: stake,
    price: price,
    profit: profit,
    date: date,
    betCode: props.betCode,
    race: props.race,
    position: props.position
  }

  let betstate = ""
  let border = ""

  if (status === "pending") {
      betstate = "card-p-pending"
      border = "border-pending"
  }
  if (status === "win") {
      betstate = "card-p-win"
      border = "border-win"
  }
  if (status === "loss") {
      betstate = "card-p-loss"
      border = "border-loss"
  }
  if (status === "void") {
      betstate = "card-p-void"
      border = "border-void"
  }

  let dateFormated = ""

  if (date) {
      dateFormated = new Date(date).toLocaleDateString()
  } 

  const openModal = () => {
    showModalBets(true)
  }
  const closeModalBets = () => {
    showModalBets(false)
  } 

  const openDeleteModal = () => {
    showModalDeleteBet(true)
  }

  const closeDeleteModal = () => {
    showModalDeleteBet(false)
  }

  const setBetStatus = e => {
    e.preventDefault()

    bet.status = e.target.value
    
    updateBetStatus()

  }

  const updateBetStatus = async () => {
    try {
      props.showSpinner(true)
      await axios.put(`${BETS_BASE_URL}detalle-apuesta/${props._id}/edit-status`, bet, {
        headers: {
          'auth-token': props.tokenId
        }
      })
      await props.reloadBets()
      props.showSpinner(false)      

    } catch (error) {
      console.log(error)
      updateErrorMsg((error.response && error.response.data && error.response.data.error) ? error.response.data.error : 'Hubo un error al conectar con la Base de Datos')
      showModalError(true)
      props.showSpinner(false)
    }
  }

  const deleteBet = async () => {
    try {
      props.showSpinner(true)
      await axios.delete(`${BETS_BASE_URL}detalle-apuesta/${props._id}/delete`, {
        headers: {
          'auth-token': props.tokenId
        }
      })
      await props.reloadBets()
      props.showSpinner(false)
      
    } catch (error) { 
      console.log(error)
      props.showSpinner(false)
      showModalError(true)
      updateErrorMsg(error.response.data ? error.response.data.error : 'Hubo un error al conectar con la Base de Datos')         
    }
  }

  const closeModalError = () => {
    showModalError(false)
  }


  return (
    <div className = {`card-container ${border}`}>

      <div className = "delete-btn-container">
        <p className = "card-date">{dateFormated}</p> 
        <button className = "delete-btn" onClick = { openDeleteModal }/>
      </div>
      <p className = "card-title center"><strong>{racecourse}</strong></p>
      <p className = "card-p card-p-limit-lines"><strong>{betName}</strong></p>
      <p className = "card-p">Stake: <strong>{stake}</strong></p>
      <p className = "card-p">Cuota: <strong>{price}</strong></p>
      <p className = "card-p">Ganancia: <strong className = {betstate}>{profit.toFixed(2)} Uds</strong></p>       

      <div className = "card-separator-container" />

      <div className = "card-status-btns">
        <button onClick = { setBetStatus } className = "btn-status color-win" value = "win"/>
        <button onClick = { setBetStatus } className = "btn-status color-loss" value = "loss"/>
        <button onClick = { setBetStatus } className = "btn-status color-void" value = "void"/>
        <button onClick = { setBetStatus } className = "btn-status color-pending" value = "pending"/>
      </div>  
      <div className = "card-admin-btns">
        <button className = "card-btn" onClick = { openModal }>Editar</button>
        <Link to={`/detalle-apuesta/${_id}`} className = "card-a"><button className = "card-btn">Detalles</button></Link>
      </div>

      <BetModal show = { modalBets } handleClose = {closeModalBets} {...props}/>

      <ConfirmationModal 
        show = { modalDeleteBet } 
        handleClose = { closeDeleteModal } 
        confirmBtn = { deleteBet } 
        ask = '¿Estás seguro de que quieres borrar esta apuesta?' 
        value = { betName } />

      <ErrorModal
        show = { modalError }
        handleClose = { closeModalError }
        msg = { errorMsg } />

    </div>
  );
}
 
export default BetCard;