import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const BetPlanning = (props) => {
  let day = 0
  let arrayDays = []
  let month = []
  let monthNumberDays = 0
  let dayBets = []

  const [ monthDays, setMonthDays ] = useState([])
  const [ betsByDay, setBetsByDay ] = useState([])

  useEffect (() => {
    calculateNumberDaysOnMonth()
    formatArrayByDay()    
    process.nextTick(() => {
      const elm1 = document.querySelector('#planning-day-7')
      const elm2 = document.querySelector('#planning-day-14')
      const elm3 = document.querySelector('#planning-day-21')
      const elm4 = document.querySelector('#planning-day-28')
      const elm5 = document.querySelector('#planning-day-35')
      const elm6 = document.querySelectorAll('.planning-day')[document.querySelectorAll('.planning-day').length -1]
      elm1.style.borderRight = '1px solid rgb(34, 37, 49)'
      elm2.style.borderRight = '1px solid rgb(34, 37, 49)'
      elm3.style.borderRight = '1px solid rgb(34, 37, 49)'
      elm4.style.borderRight = '1px solid rgb(34, 37, 49)'
      elm5 && (elm5.style.borderRight = '1px solid rgb(34, 37, 49)')
      elm6.style.borderRight = '1px solid rgb(34, 37, 49)'
    })
    // eslint-disable-next-line
  }, [])

  const fechaComoCadena = `${props.year}-${props.month < 10 ? `0${props.month}` : props.month}-01 05:00:22`
  const beginingDay = new Date(fechaComoCadena).getDay()

  if (beginingDay === 1) {
    day = 1
  } else if (beginingDay === 2) {
    day = 0
  } else if (beginingDay === 3) {
    day = -1
  } else if (beginingDay === 4) {
    day = -2
  } else if (beginingDay === 5) {
    day = -3
  } else if (beginingDay === 6) {
    day = -4
  } else {
    day = -5
  }

  const calculateNumberDaysOnMonth = () => {
    monthNumberDays = new Date(props.year, props.month, 0).getDate()

    for(let i = day; i <= monthNumberDays; i++) {
      month.push(i)
    }

    setMonthDays(month)
  }

  const formatArrayByDay = () => {
    for (let i = 1; i <= month.length; i++) {
      dayBets = props.bets.filter(elm => (new Date(elm.date) > new Date(`${props.year}-${props.month < 10 ? `0${props.month}` : props.month}-${i < 10 ? `0${i}`: i}T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.year}-${props.month < 10 ? `0${props.month}` : props.month}-${i < 10 ? `0${i}`: i}T23:59:59.951+00:00`)))
      arrayDays.push(dayBets)
    }

    setBetsByDay(arrayDays)
  }

  return (
    <div className = "planning-container">

      <div className = "planning-days-container">
        <div className = "planning-days-container--day">Lunes</div>
        <div className = "planning-days-container--day">Martes</div>
        <div className = "planning-days-container--day">Miercoles</div>
        <div className = "planning-days-container--day">Jueves</div>
        <div className = "planning-days-container--day">Viernes</div>
        <div className = "planning-days-container--day">Sábado</div>
        <div className = "planning-days-container--day">Domingo</div>
      </div>

      <div className = "planning-days">

        { monthDays.length > 0 && monthDays.map((index) => (
          <div className = "planning-day" 
          key = {index} 
          id = { `planning-day-${beginingDay === 1 ? index : beginingDay === 2 ? index + 1 : beginingDay === 3 ? index + 2 : beginingDay === 4 ? index + 3 : beginingDay === 5 ? index + 4 : beginingDay === 6 ? index + 5 : index + 6}`}>

            { index > 0 && 
              <div>
                { betsByDay[index-1] && betsByDay[index-1].length > 0 ?
                  <p className = "planning-date"><span className = "planning-bets">{betsByDay[index-1].length} { betsByDay[index-1].length === 1 ? 'Apuesta' : 'Apuestas'}</span>{index > 0 && index}</p>
                :
                  <p className = "planning-date planning-date-without-bet">{index > 0 && index}</p>
                }
                { betsByDay[index-1] && betsByDay[index-1].length > 0 ?
                  <div>
                    <p className = { `planning-profit ${index > 0 && betsByDay.length > 0 && (betsByDay[index-1].reduce((acc, elm) => {
                      return acc + elm.profit},0)).toFixed(2) > 0 ? 'stats-green' : index > 0 && betsByDay.length > 0 && (betsByDay[index-1].reduce((acc, elm) => {
                      return acc + elm.profit},0)).toFixed(2) < 0 ? 'stats-red' : 'stats-blue' }` }>{ index > 0 && betsByDay.length > 0 && (betsByDay[index-1].reduce((acc, elm) => {
                      return acc + elm.profit},0)).toFixed(2) } Uds</p>
                    <Link to={{ pathname: `/detalle-dia`, data: { betsArray: betsByDay[index-1], racecourses: props.racecourses, stakes: props.stakes, betCodes: props.betCodes, reloadBets: props.reloadBets, deleteErrors: props.deleteErrors, showSpinner: props.showSpinner } }} className = "card-a"><button className = "card-btn">Detalle</button></Link>
                  </div>
                :
                  <div>
                    <p className = "stats-blue day-without-data">Sin Apuestas</p>
                  </div>
                }
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}
 
export default BetPlanning;