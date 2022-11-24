import React, { useState, useEffect } from 'react'
import './bets.css'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import { Link } from 'react-router-dom'
import axios from 'axios'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const BETS_BASE_URL = 'https://api-tt.onrender.com/api/apuestas/'

const BetDetail = (props) => {

  // SPINNER

  const [ spinner, showSpinner ] = useState(true)

  const [ betDetail, loadBetDetail ] = useState({})

  const id = props.match.params.id

  useEffect(() => {

    const loadBetInfo = async () => {
      try {
        showSpinner(true)
        const res = await axios.get(`${BETS_BASE_URL}detalle-apuesta/${id}`)
        loadBetDetail(res.data)
        showSpinner(false)
        
      } catch (error) {
        console.log(error)
        showSpinner(false)
      }
    }

    loadBetInfo()
    // eslint-disable-next-line
  }, [id])

  let { date, status, bookie, racecourse, race, betName, stake, price, profit, betCode, position } = betDetail

  let statusClient = ""
  let statusClass = ""

  if (status === "win") {
      statusClient = "Ganada"
      statusClass = "detail-status-win"
  }
  if (status === "loss") {
      statusClient = "Perdida"
      statusClass = "detail-status-loss"
  }
  if (status === "void") {
      statusClient = "Nula"
      statusClass = "detail-status-void"
  }
  if (status === "pending") {
      statusClient = "Pendiente"
      statusClass = "detail-status-pending"
  }

  let dateFormated = ""

  if (date) {
      dateFormated = new Date(date).toLocaleDateString()
  } 

  if (profit) {
      profit = profit.toFixed(2)
  }

  return (
    <div className = "bet-detail-container">
      <h1 className = "detail-title">Detalle de apuesta</h1>

      {spinner ?
        <div className = "spinnerContainer">
        <DotLoader 
          color={"#136F63"} 
          loading={spinner} 
          css={override} 
          size={150} />
        </div>
      :

      <div className = "detail-container">
        <p><strong>Bookie</strong>: {bookie}</p>
        <p><strong>Hipódromo: </strong>{racecourse}</p>
        <p><strong>Carrera: </strong>{race}</p>
        <p><strong>Apuesta: </strong>{betName}</p>
        <p><strong>Cuota: </strong>{price}</p>
        <p><strong>Stake: </strong>{stake}</p>   
        <p><strong>Resultado: </strong>{position}</p>
        <p><strong>Beneficio: </strong>{profit} Uds</p>
        <p><strong>Fecha: </strong>{dateFormated}</p>
        <p><strong>Código: </strong>{betCode}</p> 
        <p><strong>Estado: </strong><span className = {statusClass}>{statusClient}</span></p>
      </div>

      }

      <div className = "center">
        <Link to="/apuestas" className = "card-a"><button className = "principal-button">Atrás</button></Link>
      </div>
      <div className = "margin-bottom-box"></div>
    </div>
  );
}
 
export default BetDetail;