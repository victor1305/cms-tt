import React, { useState, useEffect } from 'react'
import './bets.css'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BetCard from './BetCard'
import BetModal from './Modals/BetModal'
import BetPlanning from './BetPlanning'
import ParameterModal from './Modals/ParameterModal'
import axios from 'axios'

const BETS_BASE_URL = 'https://api-tt.onrender.com/api/apuestas/'
//const BETS_BASE_URL = 'http://localhost:3030/api/apuestas/'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const Bets = (props) => {

  // HOOKS ---------------------------------------------------------------------

  // MODALS-----------------------------

  const [ modalBets, showModalBets ] = useState(false)
  const [ modalParameter, showModalParameter ] = useState(false)
  const [ betCodes, loadBetCodes ] = useState([])
  const [ racecourses, loadRacecourses ] = useState([])
  const [ stakes, loadStakes ] = useState([])
  const [ errors, deleteErrors ] = useState(false)
  const [ planning, setPlanning ] = useState(true)
  const [ startDate, setStartDate ] = useState(new Date())

  // SPINNER

  const [ spinner, showSpinner ] = useState(true)

  // GETS

  const [ betList, loadBetList ] = useState([])
  const [ betsByMonth, loadBetsByMonth ] = useState([])
  const [ totalBet, loadTotalBetList ] = useState(0)

  // PAGES
  // eslint-disable-next-line
  const [ limit, setLimit ] = useState(42);
  const [ skip, setSkip ] = useState(0);

  const monthNumber = startDate.getMonth()
  let monthFormated = monthNumber + 1
  
  if (monthFormated < 10) monthFormated = `0${monthFormated}`

  let year = startDate.getFullYear()
  let month = ''

  if (monthNumber === 0) {
    month = 'Enero'
  } else if (monthNumber === 1) {
    month = 'Febrero'
  } else if (monthNumber === 2) {
    month = 'Marzo'
  } else if (monthNumber === 3) {
    month = 'Abril'
  } else if (monthNumber === 4) {
    month = 'Mayo'
  } else if (monthNumber === 5) {
    month = 'Junio'
  } else if (monthNumber === 6) {
    month = 'Julio'
  } else if (monthNumber === 7) {
    month = 'Agosto'
  } else if (monthNumber === 8) {
    month = 'Septiembre'
  } else if (monthNumber === 9) {
    month = 'Octubre'
  } else if (monthNumber === 10) {
    month = 'Noviembre'
  } else {
    month = 'Diciembre'
  }  

  useEffect(() => {
    async function loadBets() {
      try {
        showSpinner(true)
        const resNumber = await axios.get(`${BETS_BASE_URL}lista-apuestas/total`)
        loadTotalBetList(resNumber.data)
        const resBets = await axios.get(`${BETS_BASE_URL}lista-apuestas?limit=${limit}&skip=${skip}`)
        loadBetList(resBets.data)
        const resStakes = await axios.get(`${BETS_BASE_URL}lista-stakes`)
        loadStakes(resStakes.data)
        const resRacecourses = await axios.get(`${BETS_BASE_URL}lista-hipodromos`)
        loadRacecourses(resRacecourses.data)
        const resBetCodes = await axios.get(`${BETS_BASE_URL}lista-codigos`)
        loadBetCodes(resBetCodes.data)
        const resBetsByMonth = await axios.get(`${BETS_BASE_URL}lista-apuestas-mes?month=${monthNumber + 1}&year=${year}`)
        loadBetsByMonth(resBetsByMonth.data.data)
        showSpinner(false)
        
      } catch (error) {
        console.log(error)
        showSpinner(false)
      }

    }
    loadBets()
    // eslint-disable-next-line
  }, [])

  useEffect(() => { 
    async function updatePlanning() {
      try {
        showSpinner(true)
        const resBetsByMonth = await axios.get(`${BETS_BASE_URL}lista-apuestas-mes?month=${monthNumber + 1}&year=${year}`)
        loadBetsByMonth(resBetsByMonth.data.data)
        showSpinner(false)
      } catch (error) {
        console.log(error)
        showSpinner(false)
      }
    }

    updatePlanning()
    // eslint-disable-next-line
  }, [startDate])
  

  //------------------------------------------------------------------------------------------

  // MODALS FUNCIONALITIES

  const openModalBets = () => {
    showModalBets(true)
  }

  const closeModalBets = () => {
    showModalBets(false)
    document.getElementById('bets-form').reset()
    deleteErrors(true)
  } 

  const openModalParameter = () => {
    showModalParameter(true)
  }

  const closeModalParameter = () => {
    showModalParameter(false)
    document.getElementById('parameters-form').reset()
  } 

  //------------------------------------------------------------------------------------------

  // FUNCTIONS

  const reloadBets = async () => {

    try {
      showSpinner(true)
      const res = await axios.get(`${BETS_BASE_URL}lista-apuestas?limit=${limit}&skip=${skip}`)
      loadBetList(res.data)
      const resBetsByMonth = await axios.get(`${BETS_BASE_URL}lista-apuestas-mes?month=${monthNumber + 1}&year=${year}`)
      loadBetsByMonth(resBetsByMonth.data.data)
      showSpinner(false)
      
    } catch (error) {
      console.log(error)
      showSpinner(false)
    }
  }

  const nextPage = async () => {
    setSkip(skip + limit)
    let betsSkip = skip + limit
    try {
      showSpinner(true)
      const resBets = await axios.get(`${BETS_BASE_URL}lista-apuestas?limit=${limit}&skip=${betsSkip}`)
      loadBetList(resBets.data)
      showSpinner(false)
    } catch (error) {
      console.log(error)
      showSpinner(false)
    }

  }

  const previousPage = async () => {
    setSkip(skip - limit)
    let betsSkip = skip - limit
    try {
      showSpinner(true)
      const resBets = await axios.get(`${BETS_BASE_URL}lista-apuestas?limit=${limit}&skip=${betsSkip}`)
      loadBetList(resBets.data)
      showSpinner(false)
    } catch (error) {
      console.log(error)
      showSpinner(false)
    }
  }

  const modifyDisplay = () => {
    setPlanning(!planning)
  }

  const page = skip/limit

  let totalPage = 0

  if (totalBet % limit === 0) {
    totalPage = (totalBet / limit) -1
  
  } else {
    totalPage = Math.floor(totalBet / limit)
  }


  return (
    <div className = "bets-page-container">
      <h1>Gestión de Apuestas</h1>

      <BetModal 
        show = { modalBets } 
        handleClose = { closeModalBets } 
        deleteErrors = {errors} 
        reloadBets = { reloadBets } 
        showSpinner = { showSpinner } 
        racecourses = { racecourses } 
        stakes = { stakes }
        betCodes = { betCodes }
        {...props}/>

      <ParameterModal 
        show = { modalParameter } 
        handleClose = { closeModalParameter } 
        showSpinner = { showSpinner }
        reloadBets = { reloadBets }
        tokenId = { props.tokenId } />

      { spinner ?
        <div className = "spinnerContainer">
        <DotLoader 
          color={"#3860fb"} 
          loading={spinner} 
          css={override} 
          size={150} />
        </div>
      :
        <div>
          <div className = "btns-container">
            <div className = "aux-button-container">
              <button className = "principal-button" onClick = { openModalParameter }>Añadir Parámetro</button>
            </div>
            <div className = "aux-button-container">
              <button className = "principal-button" onClick = { modifyDisplay }>{ planning ? 'Ver Apuestas' : 'Ver Planning'}</button>
            </div>
            <div className = "principal-button-container">
              <button className = "principal-button" onClick = { openModalBets }>Crear Apuesta</button>
            </div>
          </div>

          { planning ?
            <div className = "bets-planning-container">
              <h4 className = "payments-month">Fecha: { month } { year }
                <span>Selecciona otro mes:<DatePicker 
                  className = "date-input" 
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  showFullMonthYearPicker
                  selected={ startDate } 
                  onChange={ (date) => setStartDate(date) } 
                  showPopperArrow={false}/></span>
              </h4>

              <BetPlanning 
                month = {monthNumber + 1}
                year = {year}
                bets = {betsByMonth}
                racecourses = { racecourses } 
                stakes = { stakes }
                betCodes = { betCodes }
                reloadBets = { reloadBets } 
                deleteErrors = {errors} 
                showSpinner = { showSpinner }/>
            </div>
          :
            <div className = "bet-list-container">
              <div className = "bet-list-header">
                {page > 0 &&
                  <button onClick={previousPage} className = "previous-page"/>
                }
                {totalPage > 0 &&
                  <span className = "bet-page-span">Página {page + 1} de {totalPage + 1}</span>
                }
                {page < totalPage &&
                  <button onClick={nextPage} className = "next-page"/> 
                }
              </div>
              <div className = "bets-list">
                {betList.map((item => ( 
                  <BetCard 
                    key = {item._id} 
                    {...item} 
                    {...props} 
                    racecourses = { racecourses } 
                    stakes = { stakes }
                    betCodes = { betCodes }
                    reloadBets = { reloadBets } 
                    deleteErrors = {errors} 
                    showSpinner = { showSpinner }/>
                )))
                }
              </div>
            </div>
          }
          <div className = "margin-bottom-box"></div>
        </div>
      }
    </div>
  );
}
 
export default Bets;