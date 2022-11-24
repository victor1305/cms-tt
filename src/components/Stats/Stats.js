import React, { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import DatePicker from "react-datepicker";
import StatsByMonth from './StatsBy/StatsByMonth'
import StatsByCategory from './StatsBy/StatsByCategory'
import StatsByRacecourse from './StatsBy/StatsByRacecourse'
import StatsByStake from './StatsBy/StatsByStake'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import './stats.css'
import { useMediaQuery } from 'react-responsive'

const BETS_BASE_URL = 'https://api-tt.onrender.com/api/apuestas/'
//const BETS_BASE_URL = 'http://localhost:3030/api/apuestas/'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const Stats = (props) => {

  const today = new Date()

  // HOOKS
  const [ spinner, showSpinner ] = useState(false)
  const [ dateRange, setDateRange ] = useState([null, null])
  const [ startDate, endDate ] = dateRange
  const [ year, updateYear ] = useState(today.getFullYear())
  const [ type, updateType ] = useState('month')
  const [ todayResume, updateLastDay ] = useState(0)
  const [ yesterday, updateYesterday ] = useState(0)
  const [ lastSevenDays, updateLastSevenDays ] = useState(0)
  const [ daysRange, updateDaysRange ] = useState(0)

  // VARIABLES

  const isDesktop = useMediaQuery({ query: '(max-width: 1024px)' })
  let typeSpanish = 'Mes'
  let startDateFormated = ''
  let endDateFormated = ''

  if (type === 'month') {
    typeSpanish = 'Mes'
  } else if (type === 'racecourse') {
    typeSpanish = 'Hipódromo'
  } else if (type === 'category') {
    typeSpanish = 'Categoría'
  } else {
    typeSpanish = 'Stake'
  }

  useEffect(() => {

    async function updateTrends () {
      try {
        showSpinner(true)
        const resLastDay = await axios.get(`${BETS_BASE_URL}balance-diario`)
        resLastDay.data.data.length > 0 && updateLastDay(resLastDay.data.data[0].balance)
        const resYesterday = await axios.get(`${BETS_BASE_URL}balance-dia-anterior`)
        resYesterday.data.data.length > 0 && updateYesterday(resYesterday.data.data[0].balance)
        const resLastSevenDays = await axios.get(`${BETS_BASE_URL}balance-semana`)
        resLastSevenDays.data.data.length > 0 && updateLastSevenDays(resLastSevenDays.data.data[0].balance)
        showSpinner(false)
      } catch (error) {
        console.log(error)
        showSpinner(false)
      }
    }

    updateTrends()
    // eslint-disable-next-line
  }, [])

  const getRangeBalance = async () => {
    if ((startDate || endDate) === null) {
      return
    }

    startDateFormated =  startDate.toISOString()
    endDateFormated = endDate.toISOString()

    try {
      showSpinner(true)
      const resRangeDays = await axios.get(`${BETS_BASE_URL}balance-rango/${startDateFormated}/${endDateFormated}`)
      resRangeDays.data.data.length > 0 && updateDaysRange(resRangeDays.data.data[0].balance)
      showSpinner(false)
    } catch (error) {
      console.log(error)
      showSpinner(false)
    }
  }


  return (
    <div className = "stats-page-container">
      <h1>Stats</h1>
      { spinner ?
      
        <div className = "spinnerContainer">
          <DotLoader 
            color={"#3860fb"} 
            loading={spinner} 
            css={override} 
            size={150} />
        </div>
      
      :
        <div className = "stats-container">

          <div className = "stats-title-container">
            <p className = "stats-title">Estadísticas y Tendencias</p>
          </div>

          <div className = "option-container">
            <p>Año:
              <button 
                className = { year === 2016 ? 'stats-year-btn year-color' : 'stats-year-btn' }
                onClick = {() => updateYear(2016)}>2016</button>
              <button 
                className = { year === 2017 ? 'stats-year-btn year-color' : 'stats-year-btn' }
                onClick = {() => updateYear(2017)}>2017</button>
              <button 
                className = { year === 2018 ? 'stats-year-btn year-color' : 'stats-year-btn' }
                onClick = {() => updateYear(2018)}>2018</button>
              <button 
                className = { year === 2019 ? 'stats-year-btn year-color' : 'stats-year-btn' }
                onClick = {() => updateYear(2019)}>2019</button>
              <button 
                className = { year === 2020 ? 'stats-year-btn year-color' : 'stats-year-btn' }
                onClick = {() => updateYear(2020)}>2020</button>
              <button 
                className = { year === 2021 ? 'stats-year-btn year-color' : 'stats-year-btn' }
                onClick = {() => updateYear(2021)}>2021</button>
              <button 
                className = { year === 2022 ? 'stats-year-btn year-color' : 'stats-year-btn' }
                onClick = {() => updateYear(2022)}>2022</button>
            </p>

            <p>Tipo: 
              <button
                className = { type === 'month' ? 'stats-year-btn year-color' : 'stats-year-btn' }
                onClick = {() => updateType('month')}>Mes</button>
              <button
                className = { type === 'racecourse' ? 'stats-year-btn year-color' : 'stats-year-btn' }
                onClick = {() => updateType('racecourse')}>Hipódromo</button>
              <button
                className = { type === 'stake' ? 'stats-year-btn year-color' : 'stats-year-btn' }
                onClick = {() => updateType('stake')}>Stake</button>
              <button
                className = { type === 'category' ? 'stats-year-btn year-color' : 'stats-year-btn' }
                onClick = {() => updateType('category')}>Categoría</button>
            </p>
            
          </div>

          <h2 className = "stats-subtitle">Estadísticas por { typeSpanish }, Año { year }</h2>

          <div className = "tables-body">  
            
            { year > 2020 && type === 'month' &&
              <StatsByMonth statYear = { year } isDesktop = { isDesktop }/>}
            { year > 2020 && type === 'category' &&  
              <StatsByCategory statYear = { year } isDesktop = { isDesktop }/>}
            { year > 2020 && type === 'racecourse' && 
              <StatsByRacecourse statYear = { year } isDesktop = { isDesktop }/>}
            { year > 2020 && type === 'stake' && 
              <StatsByStake statYear = { year } isDesktop = { isDesktop }/>}      


            <div className = "trends-container">
              <div className = "trends-title-container">
                <p className = "stats-title">Tendencias</p>
              </div>

              <div className = "trends-body">
                <p>Hoy: <span className = { todayResume === 0.00 ? 'stats-blue' : (todayResume > 0.00 ? 'stats-green' : 'stats-red')}>{todayResume.toFixed(2)} Uds</span></p>
                <p>Ayer: <span className = { yesterday === 0.00 ? 'stats-blue' : (yesterday > 0.00 ? 'stats-green' : 'stats-red')}>{yesterday.toFixed(2)} Uds</span></p>
                <p>Últimos 7 Días (Contando Hoy): <span className = { lastSevenDays === 0.00 ? 'stats-blue' : (lastSevenDays > 0.00 ? 'stats-green' : 'stats-red')}>{lastSevenDays.toFixed(2)} Uds</span></p>
                <p>Rango Personalizado: <span className = { daysRange === 0.00 ? 'stats-blue' : (daysRange > 0.00 ? 'stats-green' : 'stats-red')}>{daysRange.toFixed(2)} Uds</span></p>
                <div className = "stats-date-input-container">
                  <DatePicker
                  className = "stats-date-input" 
                  dateFormat="dd/MM/yyyy"
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  isClearable={true} />
                <button className = "card-btn" onClick = {getRangeBalance}>Enviar</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      }
      <div className = "margin-bottom-box"></div>
    </div>
  );
}
 
export default Stats;