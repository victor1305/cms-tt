import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const BETS_BASE_URL = 'https://api-tt.onrender.com/api/apuestas/'

const StatsByRacecourse = (props) => {

  const [ betList, loadBetList ] = useState([])
  const [ racecourses, updateRacecourses ] = useState({})
  const [ racecoursesList, updateRacecoursesList ] = useState([])
  const [ spinner, showSpinner ] = useState(true)

  const racecoursesTotalArray = Object.values(racecourses)
  const racecoursesArray = racecoursesTotalArray.filter(elm => (elm.bets > 0))
  racecoursesArray.sort((a, b) => b.profitUds - a.profitUds)

  let loopArray = []

  useEffect(() => {
    async function loadData() {
      try {
        showSpinner(true)
        const resBetList = await axios.get(`${BETS_BASE_URL}stats/${props.statYear}`)
        loadBetList(resBetList.data)
        const resRacecourses = await axios.get(`${BETS_BASE_URL}lista-hipodromos`)
        updateRacecoursesList(resRacecourses.data.data)
        showSpinner(false)
      } catch (error) {
        console.log(error)
        showSpinner(false)
      }
    }

    loadData()       
    // eslint-disable-next-line
  }, [])

  useEffect(() => {

    updateValues()       
    // eslint-disable-next-line
  }, [racecoursesList])   
  
  const updateValues = () => {

    for (let i = 0; i < racecoursesList.length; i++) {

      const arrayTotal = betList.filter(elm => (elm.racecourse === racecoursesList[i].racecourse))
      const arrayWin = betList.filter(elm => (elm.racecourse === racecoursesList[i].racecourse) && (elm.status === "win"))
      const arrayLoss = betList.filter(elm => (elm.racecourse === racecoursesList[i].racecourse) && (elm.status === "loss"))
      const arrayVoid = betList.filter(elm => (elm.racecourse === racecoursesList[i].racecourse) && (elm.status === "void"))
      const arrayStake = arrayTotal.reduce((acc, elm) => {
        return acc + elm.stake},0)
      const arrayProfit = arrayTotal.reduce((acc, elm) => {
        return acc + elm.profit},0)

      const obj = {
          bets: arrayTotal.length,
          wins: arrayWin.length,
          loss: arrayLoss.length,
          void: arrayVoid.length,
          percent: ((arrayWin.length / (arrayLoss.length + arrayWin.length)) * 100).toFixed(2),
          averageStake: (arrayStake / arrayTotal.length).toFixed(2),
          totalUds: arrayStake.toFixed(2),
          profitUds: arrayProfit.toFixed(2),
          yield: ((arrayProfit * 100) / arrayStake).toFixed(2),
          racecourse: racecoursesList[i].racecourse          
        }

      loopArray.push(obj)

    }

    updateRacecourses(loopArray)

  }

  return (
    <div className = "table-container-full">
      { spinner ?
        <div>
          <DotLoader 
            color={"#3860fb"} 
            loading={spinner} 
            css={override} 
            size={150} />
        </div>
        :
        <table className = "table-container-stats">
          <thead>
            <tr className = "stats-table-tr">
              <th>Hipódromo</th>
              {!props.isDesktop &&
              <th>Picks</th>}
              {!props.isDesktop &&
              <th><div className = "stats-th stats-th-win"></div></th>}
              {!props.isDesktop &&
              <th><div className = "stats-th stats-th-loss"></div></th>}
              {!props.isDesktop &&
              <th><div className = "stats-th stats-th-void"></div></th>}
              <th>Acierto</th>
              {!props.isDesktop &&
              <th>Stake Medio</th>}
              {!props.isDesktop &&
              <th>Uds Jugadas</th>}
              <th>Yield</th>
              <th>{props.isDesktop ? 'Profit' : 'Uds Ganadas'}</th>
            </tr>
          </thead>

          <tbody>
            {racecoursesArray.map((item => (
            <tr className = "stats-table-tr-body" key = {item.racecourse}>
              <td className = "stats-item-racecourse">{item.racecourse}</td>
              {!props.isDesktop &&
              <td>{item.bets}</td>}
              {!props.isDesktop &&
              <td>{item.wins}</td>}
              {!props.isDesktop &&
              <td>{item.loss}</td>}
              {!props.isDesktop &&
              <td>{item.void}</td>}
              <td>{item.percent !== "NaN" ? `${item.percent}%` : "N/A"}</td>
              {!props.isDesktop &&
              <td>{item.averageStake === "NaN" ? "0.00" : item.averageStake}</td>}
              {!props.isDesktop &&
              <td>{item.totalUds}</td>}
              <td className = {item.yield === "NaN" ? "stats-blue" : (item.yield < 0 ? "stats-red" : "stats-green")}>{item.yield !== "NaN" ? `${item.yield}%` : "N/A"}</td>
              <td className = {parseInt(item.profitUds) === 0 ? "stats-blue" : (item.profitUds > 0 ? "stats-green" : "stats-red")}>{item.profitUds}</td>
            </tr>
            )))}
          </tbody>
        </table>
      }
    </div>
  );
}
 
export default StatsByRacecourse;