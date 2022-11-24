import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { css } from "@emotion/react";
import axios from 'axios'
import DotLoader from "react-spinners/DotLoader";
import DatePicker from "react-datepicker";
import { useMediaQuery } from 'react-responsive'
import "react-datepicker/dist/react-datepicker.css";
import './profile.css'

const CLIENTS_BASE_URL = 'https://api-tt.onrender.com/api/clientes/'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`


const Profile = (props) => {

  const [ payments, updatePayments ] = useState([])
  const [ startDate, setStartDate ] = useState(new Date())
  const [ spinner, showSpinner ] = useState(false)

  const id = props.tokenInfo && props.tokenInfo.id
  const isDesktop = useMediaQuery({ query: '(max-width: 1024px)' })

  const monthNumber = startDate.getMonth()
  let monthFormated = monthNumber + 1
  
  if (monthFormated < 10) monthFormated = `0${monthFormated}`

  let year = startDate.getFullYear()
  let month = ''

  const bizumPayments = payments.filter(elm => elm.type === 'Bizum' )
  const paypalPayments = payments.filter(elm => elm.type === 'Paypal' )
  const pscPayments = payments.filter(elm => elm.type === 'Paysafecard' )
  const cashPayments = payments.filter(elm => elm.type === 'Efectivo' )
  const transferPayments = payments.filter(elm => elm.type === 'Transferencia' )
  const totalReceipt = payments.reduce((acc, elm) => {
    return acc + elm.price}, 0)

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
    async function loadData() {
      try {
        showSpinner(true)
        const res = await axios.get(`${CLIENTS_BASE_URL}lista-apuestas-perfil/${id}/${year}/${monthFormated}`)
        //updatePayments(res.data.data)
        console.log(res.data.data)
        showSpinner(false)

      } catch (error) {
        console.log(error)
        showSpinner(false)
      }
    }
    loadData ()
    // eslint-disable-next-line
  }, [])

  useEffect(() => { 
    async function updatePaysByMonth() {
      try {
        showSpinner(true)
        const resPays = await axios.get(`${CLIENTS_BASE_URL}lista-apuestas-perfil/${id}/${year}/${monthFormated}`)
        updatePayments(resPays.data.data)
        showSpinner(false)
      } catch (error) {
        console.log(error)
        showSpinner(false)
      }
    }

    updatePaysByMonth()
    // eslint-disable-next-line
  }, [startDate])


  return (
    <div className = "profile-big-container">
      <h1>Perfil</h1>
      <h2 className = "profile-name">Hola { props.tokenInfo.name }!</h2>
      
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
          <div className = "profile-container">
            
            <h4 className = "profile-title">Previsión pagos a tu nombre { month } { year }
              <span>Si quieres ver los de otro mes, dale sin miedo!
              <DatePicker 
                className = "date-input" 
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                selected={ startDate } 
                onChange={ (date) => setStartDate(date) } 
                showPopperArrow={false}/></span></h4>
            
            <div>
              
              {payments.length > 0 ?      
                <div className = "table-container">
                  <table className = "profile-table">
                    <thead>
                      <tr className = "clients-table-tr">
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Estado</th>
                        { !isDesktop &&
                        <th>Método</th>}
                        <th>Cantidad</th>
                        { !isDesktop &&
                        <th>Notas</th>}
                      </tr>
                    </thead>   

                    <tbody>
                      {payments.length > 0 && payments.map((item, index) => (
                        <tr key = { item._id }>
                          <td>{ index + 1 }</td>
                          <td className = "td-name"><Link to = { `/detalle-cliente/${item.clientId}` }>{ item.client[0] }</Link></td>
                          <td><div className = { item.status === 'Pagado' ?  "pay-status status-green" : item.status === 'Impago' ? "pay-status status-red" : "pay-status status-orange"}></div></td>
                          { !isDesktop &&
                          <td>{ item.type === 'Paysafecard' ? 'PSC' : item.type }</td>}
                          <td>{ item.price } €</td>
                          { !isDesktop &&
                          <td>{ item.information }</td>}
                        </tr>
                      ))}
                    </tbody>      
                  </table>

                  <div className = "profile-resume-container">
                    <p className = "resume-title">Resumen:</p>
                    <ul>
                      {bizumPayments.length > 0 &&
                      <li>Bizum: <span>{ bizumPayments.length }</span></li>}
                      {paypalPayments.length > 0 &&
                      <li>Paypal: <span>{ paypalPayments.length }</span></li>}
                      {pscPayments.length > 0 &&
                      <li>Paysafecard: <span>{ pscPayments.length }</span></li>}
                      {cashPayments.length > 0 &&
                      <li>Efectivo: <span>{ cashPayments.length }</span></li>}
                      {transferPayments.length > 0 &&
                      <li>Transferencia: <span>{ transferPayments.length }</span></li>}
                    </ul>
                    <p className = "resume-title">Total Recibido: {totalReceipt}€</p>
                  </div>
                </div>
              :
                <div>
                  <p className = "clients-msg">No hay pagos que mostrar para {`${month}-${year}`}</p>
                </div>
              }
            </div>
          </div>
          <div className = "margin-bottom-box"></div>
        </div>
      }
    </div>
  );
}
 
export default Profile;