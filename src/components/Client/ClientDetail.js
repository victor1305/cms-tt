import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import { useMediaQuery } from 'react-responsive'

const CLIENTS_BASE_URL = 'https://api-tt.onrender.com/api/clientes/'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const ClientDetail = (props) => {

  const [ clientInfo, loadClientInfo ] = useState({})
  const [ spinner, showSpinner ] = useState(false)
  const [ dateFormated, updateDateFormated ] = useState('')

  const isDesktop = useMediaQuery({ query: '(max-width: 1024px)' })
  let id = props.match.params.id

  let month = ''
  let year = ''
  let monthNumber = ''

  let monthMap = ''
  let yearMap = ''
  let monthNumberMap = ''  

  let beneficiaryName = ''

  if (clientInfo.registerDate) {
    monthNumber = clientInfo.registerDate.slice(5,7)
    year = clientInfo.registerDate.slice(0,4)

    if (monthNumber === '01') {
      month = 'Enero'
    } else if (monthNumber === '02') {
      month = 'Febrero'
    } else if (monthNumber === '03') {
      month = 'Marzo'
    } else if (monthNumber === '04') {
      month = 'Abril'
    } else if (monthNumber === '05') {
      month = 'Mayo'
    } else if (monthNumber === '06') {
      month = 'Junio'
    } else if (monthNumber === '07') {
      month = 'Julio'
    } else if (monthNumber === '08') {
      month = 'Agosto'
    } else if (monthNumber === '09') {
      month = 'Septiembre'
    } else if (monthNumber === '10') {
      month = 'Octubre'
    } else if (monthNumber === '11') {
      month = 'Noviembre'
    } else {
      month = 'Diciembre'
    }
  }

  useEffect(() => {

    async function  loadClient() {
      try {
        showSpinner(true)
        let res = await axios.get(`${CLIENTS_BASE_URL}informacion-cliente/${id}`)
        loadClientInfo(res.data.data)
        showSpinner(false)
      } catch (error) {
        
      }
    }
    loadClient ()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    updateDateFormated(`${month}-${year}`)
    // eslint-disable-next-line
  }, [clientInfo])

  const formatDate = (date) => {
    monthNumberMap = date.slice(5,7)
    yearMap = date.slice(0,4)
    monthMap = ''

    if (monthNumberMap === '01') {
      monthMap = 'Enero'
    } else if (monthNumberMap === '02') {
      monthMap = 'Febrero'
    } else if (monthNumberMap === '03') {
      monthMap = 'Marzo'
    } else if (monthNumberMap === '04') {
      monthMap = 'Abril'
    } else if (monthNumberMap === '05') {
      monthMap = 'Mayo'
    } else if (monthNumberMap === '06') {
      monthMap = 'Junio'
    } else if (monthNumberMap === '07') {
      monthMap = 'Julio'
    } else if (monthNumberMap === '08') {
      monthMap = 'Agosto'
    } else if (monthNumberMap === '09') {
      monthMap = 'Septiembre'
    } else if (monthNumberMap === '10') {
      monthMap = 'Octubre'
    } else if (monthNumberMap === '11') {
      monthMap = 'Noviembre'
    } else {
      monthMap = 'Diciembre'
    }

    return `${monthMap}-${yearMap}`

  }

  const formatUser = (id) => {
    if ( id === '5fc8d746cd27b1586f3806f8') {
      beneficiaryName = 'Víctor'
    
    } else if (id === '60c78af70d2c7d19af2e6590') {
      beneficiaryName = 'Antonio'
    
    } else {
      beneficiaryName = 'Eduardo'
    }

    return beneficiaryName
  }



  return (

    <div className = "client-detail-body">
      <h1>Detalles de Cliente</h1>
      { spinner ?
      
        <div className = "spinnerContainer">
        <DotLoader 
          color={"#136F63"} 
          loading={spinner} 
          css={override} 
          size={150} />
        </div>
    
      :
        <div className = "client-detail-container">
          <div className = "titles-container-detail">
            { !isDesktop &&
            <h4 className = "titles-container-detail-h4">Historial de Pagos</h4>}
            <h4 className = "titles-container-detail-h4">Detalle de Cliente</h4>
          </div>
          
          <div className = "payments-history">

            <div className = "table-client-detail-container">
            { isDesktop &&
            <div className = "titles-container-detail titles-container-detail-mobile">
              <h4 className = "titles-container-detail-h4">Historial de Pagos</h4>
            </div>}
              <table className = "table-client-detail">
                <thead>
                  <tr className = "clients-table-tr">
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Cantidad</th>
                    { !isDesktop &&
                    <th>Método</th>}
                    <th>Estado</th>
                    { !isDesktop &&
                    <th>Recibe</th>}
                    { !isDesktop &&
                    <th>Notas</th>}
                  </tr>
                </thead>

                <tbody>            
                  { clientInfo.payments && (clientInfo.payments).length > 0 && (clientInfo.payments).map((item, index) => (
                    <tr key = {item._id}>
                      <td>{ index + 1 }</td>
                      <td>{ formatDate(item.date) }</td>
                      <td>{ item.price }€</td>
                      { !isDesktop &&
                      <td>{ item.type === 'Paysafecard' ? 'PSC' : item.type }</td>}
                      <td><div className = { item.status === 'Pagado' ?  "pay-status status-green" : item.status === 'Impago' ? "pay-status status-red" : "pay-status status-orange"}></div></td>
                      { !isDesktop &&
                      <td>{ formatUser(item.beneficiary) }</td>}
                      { !isDesktop &&
                      <td>{ item.information }</td>}
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>

            <div className = "client-detail-info-container">
              <p>Nombre: <span>{ clientInfo.name }</span></p>
              <p>Teléfono: <span>{ clientInfo.phone }</span></p>
              <p>Fecha de Registro: <span>{ dateFormated }</span></p>
              <p>Recomendado por: <span>{ clientInfo.referred ? clientInfo.referred : 'Sin recomendación' }</span></p>
            </div>

          </div>
        </div>
      }
      <div className = "margin-bottom-box"></div>
    </div>
  );
}
 
export default ClientDetail;