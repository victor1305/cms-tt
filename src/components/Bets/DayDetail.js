import React, { useState, useEffect } from 'react';
import BetCard from './BetCard';
import { Link, useHistory } from 'react-router-dom'


const DayDetail = (props) => {
  const [ dayBets, setDayBets ] = useState([])
  const [ date, setDate ] = useState({ day: '', month: '', year: '' })

  const history = useHistory()

  useEffect (() => {
    if (props.location.data) {
      setDayBets(props.location.data.betsArray)    
      setDate({      
        year: props.location.data.betsArray[0].date.slice(0,4),
        month: props.location.data.betsArray[0].date.slice(5,7),
        day: props.location.data.betsArray[0].date.slice(8,10)
      })
    } else {
      history.push('/apuestas')
    }
    // eslint-disable-next-line
  }, [props])

  return (  
    <div className = "bets-page-container">
      <div className = "btn-go-back-container">
        <Link to={`/apuestas`} className = "card-a"><button className = "principal-button">Volver</button></Link>
      </div>
      <h1> Apuestas del día {date.day}-{date.month}-{date.year} </h1>
      <div className = "bet-list-container bets-list">
        { dayBets.map((item => ( 
          <BetCard 
            key = {item._id} 
            {...item} 
            {...props} 
            racecourses = { props.location.data.racecourses } 
            stakes = { props.location.data.stakes }
            betCodes = { props.location.data.betCodes }
            reloadBets = { props.location.data.reloadBets } 
            deleteErrors = { props.location.data.errors } 
            showSpinner = { props.location.data.showSpinner }/>
        )))
        }
      </div>
      <div className = "margin-bottom-box"></div>
    </div>
  );
}
 
export default DayDetail;