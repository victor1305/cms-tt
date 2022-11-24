import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { css } from "@emotion/react";
import axios from 'axios'
import DotLoader from "react-spinners/DotLoader";
import ClientModal from './Modals/ClientModal'
import PayModal from './Modals/PayModal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmationModal from '../Modal/ConfirmationModal'
import ErrorModal from '../Modal/ErrorModal'
import { useMediaQuery } from 'react-responsive'
import { Line, defaults } from 'react-chartjs-2'

import './clients.css'

const CLIENTS_BASE_URL = 'https://api-tt.onrender.com/api/clientes/'
//const CLIENTS_BASE_URL = 'http://localhost:3030/api/clientes/'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const Clients = (props) => {

  // HOOKS

  const [ modalClient, showModalClient ] = useState(false)
  const [ modalPay, showModalPay ] = useState(false)
  const [ modalEditPay, showModalEditPay ] = useState(false)
  const [ confirmationModal, showConfirmationModal ] = useState(false)
  const [ modalError, showModalError ] = useState(false)
  const [ errors, deleteErrors ] = useState(false)
  const [ errorMsg, updateErrorMsg ] = useState('')
  const [ spinner, showSpinner ] = useState(false)
  const [ clientsList, loadClientsList ] = useState([])
  const [ adminsList, loadAdminsList ] = useState([])
  const [ paysList, loadPaysList ] = useState([])
  const [ payInfo, loadPayInfo ] = useState({})
  const [ startDate, setStartDate ] = useState(new Date())
  const [ chartData, setChartData ] = useState({})
  const [ chartPaymentsData, setChartPaymentsData ] = useState({})
  const [ clientsByMonth, setClientsByMonth ] = useState([])

  // VARIABLES

  const isDesktop = useMediaQuery({ query: '(max-width: 1024px)' })

  const monthNumber = startDate.getMonth()
  let monthFormated = monthNumber + 1
  
  if (monthFormated < 10) monthFormated = `0${monthFormated}`

  let year = startDate.getFullYear()
  let month = ''
  let listClientsChart = []
  let listPaymentsChart = []

  let januaryCli = ''
  let februaryCli = ''
  let marchCli = ''
  let aprilCli = ''
  let mayCli = ''
  let juneCli = ''
  let julyCli = ''
  let augostCli = ''
  let septemberCli = ''
  let octoberCli = ''
  let novemberCli = ''
  let decemberCli = ''

  let januaryPays = ''
  let februaryPays = ''
  let marchPays = ''
  let aprilPays = ''
  let mayPays = ''
  let junePays = ''
  let julyPays = ''
  let augostPays = ''
  let septemberPays = ''
  let octoberPays = ''
  let novemberPays = ''
  let decemberPays = ''

  let totalPayments = paysList.length > 0 && paysList.reduce((acc, elm) => {
    return acc + elm.price},0)

  const paymentsAntonioArr = paysList.length > 0 && paysList.filter(elm => (elm.beneficiary[0] === 'Antonio'))
  const paymentsAntonio = paymentsAntonioArr.length > 0 && paymentsAntonioArr.reduce((acc, elm) => {
    return acc + elm.price},0)

  const paymentsEduArr = paysList.length > 0 && paysList.filter(elm => (elm.beneficiary[0] === 'Eduardo'))
  const paymentsEdu = paymentsEduArr.length > 0 && paymentsEduArr.reduce((acc, elm) => {
    return acc + elm.price},0)    

  const paymentsVictorArr = paysList.length > 0 && paysList.filter(elm => (elm.beneficiary[0] === 'Víctor'))
  const paymentsVictor = paymentsVictorArr.length > 0 && paymentsVictorArr.reduce((acc, elm) => {
    return acc + elm.price},0)

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

  defaults.color = 'white'
  defaults.scale.grid.color = 'rgb(34, 37, 49)'
  defaults.scale.beginAtZero = true
  defaults.animation.delay = 1000

  useEffect(() => {
    async function loadData() {
      try {
        showSpinner(true)
        const resClients = await axios.get(`${CLIENTS_BASE_URL}lista-clientes`)
        loadClientsList(resClients.data)
        const resAdmins = await axios.get(`${CLIENTS_BASE_URL}lista-administradores`)
        loadAdminsList(resAdmins.data)
        const resPays = await axios.get(`${CLIENTS_BASE_URL}lista-pagos/${year}/${monthFormated}`)
        loadPaysList(resPays.data.data)
        const resClientsByMonth = await axios.get(`${CLIENTS_BASE_URL}lista-pagos-anual/${year}`)
        setClientsByMonth(resClientsByMonth.data.data)
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
    async function updatePaysByMonth() {
      try {
        showSpinner(true)
        const resPays = await axios.get(`${CLIENTS_BASE_URL}lista-pagos/${year}/${monthFormated}`)
        loadPaysList(resPays.data.data)
        showSpinner(false)
      } catch (error) {
        console.log(error)
        showSpinner(false)
      }
    }

    updatePaysByMonth()
    // eslint-disable-next-line
  }, [startDate])

  useEffect(() => {
    formatChartInfo()
    // eslint-disable-next-line
  }, [clientsByMonth])

  // FUNCTIONS

  const chart = () => {
    setChartData({
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Número Clientes',
          data: listClientsChart,
          backgroundColor: 'linear-gradient(to right, #20f08b, #07dfb1)',
          borderColor: '#3860fb',
          borderWidth: 2
        }
      ],
    })

    setChartPaymentsData({
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Ingresos Mensuales',
          data: listPaymentsChart,
          backgroundColor: 'linear-gradient(to right, #20f08b, #07dfb1)',
          borderColor: '#3860fb',
          borderWidth: 2
        }
      ],      
    })

  }

  const formatChartInfo = () => {

    januaryCli = clientsByMonth.filter(elm => (elm.date >= `${year}-01-01T00:00:00.000Z` && elm.date <= `${year}-01-31T24:00:00.000Z` && elm.price >= 0)).length
    januaryPays = clientsByMonth.filter(elm => (elm.date >= `${year}-01-01T00:00:00.000Z` && elm.date <= `${year}-01-31T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)
    februaryCli = clientsByMonth.filter(elm => (elm.date >= `${year}-02-01T00:00:00.000Z` && elm.date <= `${year}-02-28T24:00:00.000Z` && elm.price >= 0)).length
    februaryPays = clientsByMonth.filter(elm => (elm.date >= `${year}-02-01T00:00:00.000Z` && elm.date <= `${year}-02-28T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)
    marchCli = clientsByMonth.filter(elm => (elm.date >= `${year}-03-01T00:00:00.000Z` && elm.date <= `${year}-03-31T24:00:00.000Z` && elm.price >= 0)).length
    marchPays = clientsByMonth.filter(elm => (elm.date >= `${year}-03-01T00:00:00.000Z` && elm.date <= `${year}-03-31T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)
    aprilCli = clientsByMonth.filter(elm => (elm.date >= `${year}-04-01T00:00:00.000Z` && elm.date <= `${year}-04-30T24:00:00.000Z` && elm.price >= 0)).length
    aprilPays = clientsByMonth.filter(elm => (elm.date >= `${year}-04-01T00:00:00.000Z` && elm.date <= `${year}-04-30T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)
    mayCli = clientsByMonth.filter(elm => (elm.date >= `${year}-05-01T00:00:00.000Z` && elm.date <= `${year}-05-31T24:00:00.000Z` && elm.price >= 0)).length
    mayPays = clientsByMonth.filter(elm => (elm.date >= `${year}-05-01T00:00:00.000Z` && elm.date <= `${year}-05-31T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)
    juneCli = clientsByMonth.filter(elm => (elm.date >= `${year}-06-01T00:00:00.000Z` && elm.date <= `${year}-06-30T24:00:00.000Z` && elm.price >= 0)).length
    junePays = clientsByMonth.filter(elm => (elm.date >= `${year}-06-01T00:00:00.000Z` && elm.date <= `${year}-06-30T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)
    julyCli = clientsByMonth.filter(elm => (elm.date >= `${year}-07-01T00:00:00.000Z` && elm.date <= `${year}-07-31T24:00:00.000Z` && elm.price >= 0)).length
    julyPays = clientsByMonth.filter(elm => (elm.date >= `${year}-07-01T00:00:00.000Z` && elm.date <= `${year}-07-31T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)
    augostCli = clientsByMonth.filter(elm => (elm.date >= `${year}-08-01T00:00:00.000Z` && elm.date <= `${year}-08-31T24:00:00.000Z` && elm.price >= 0)).length
    augostPays = clientsByMonth.filter(elm => (elm.date >= `${year}-08-01T00:00:00.000Z` && elm.date <= `${year}-08-31T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)
    septemberCli = clientsByMonth.filter(elm => (elm.date >= `${year}-09-01T00:00:00.000Z` && elm.date <= `${year}-09-30T24:00:00.000Z` && elm.price >= 0)).length
    septemberPays = clientsByMonth.filter(elm => (elm.date >= `${year}-09-01T00:00:00.000Z` && elm.date <= `${year}-09-30T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)
    octoberCli = clientsByMonth.filter(elm => (elm.date >= `${year}-10-01T00:00:00.000Z` && elm.date <= `${year}-10-31T24:00:00.000Z` && elm.price >= 0)).length
    octoberPays = clientsByMonth.filter(elm => (elm.date >= `${year}-10-01T00:00:00.000Z` && elm.date <= `${year}-10-31T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)
    novemberCli = clientsByMonth.filter(elm => (elm.date >= `${year}-11-01T00:00:00.000Z` && elm.date <= `${year}-11-30T24:00:00.000Z` && elm.price >= 0)).length
    novemberPays = clientsByMonth.filter(elm => (elm.date >= `${year}-11-01T00:00:00.000Z` && elm.date <= `${year}-11-30T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)
    decemberCli = clientsByMonth.filter(elm => (elm.date >= `${year}-12-01T00:00:00.000Z` && elm.date <= `${year}-12-31T24:00:00.000Z` && elm.price >= 0)).length
    decemberPays = clientsByMonth.filter(elm => (elm.date >= `${year}-12-01T00:00:00.000Z` && elm.date <= `${year}-12-31T24:00:00.000Z`)).reduce((acc, elm) => {
      return acc + elm.price},0)

    if (year === 2021) {
      januaryCli = 57
      januaryPays = 0
      februaryCli = 57
      februaryPays = 0
      marchCli = 48
      marchPays = 0
      aprilCli = 48
      aprilPays = 0
      mayCli = 44
      mayPays = 0
    }

    if (month === 'Enero') {
      listClientsChart.push(januaryCli)
      listPaymentsChart.push(januaryPays)
    } else if (month === 'Febrero') {
      listClientsChart.push(januaryCli, februaryCli)
      listPaymentsChart.push(januaryPays, februaryPays)
    } else if (month === 'Marzo') {
      listClientsChart.push(januaryCli, februaryCli, marchCli)
      listPaymentsChart.push(januaryPays, februaryPays, marchPays)
    } else if (month === 'Abril') {
      listClientsChart.push(januaryCli, februaryCli, marchCli, aprilCli)
      listPaymentsChart.push(januaryPays, februaryPays, marchPays, aprilPays)
    } else if (month === 'Mayo') {
      listClientsChart.push(januaryCli, februaryCli, marchCli, aprilCli, mayCli)
      listPaymentsChart.push(januaryPays, februaryPays, marchPays, aprilPays, mayPays)
    } else if (month === 'Junio') {
      listClientsChart.push(januaryCli, februaryCli, marchCli, aprilCli, mayCli, juneCli)
      listPaymentsChart.push(januaryPays, februaryPays, marchPays, aprilPays, mayPays, junePays)
    } else if (month === 'Julio') {
      listClientsChart.push(januaryCli, februaryCli, marchCli, aprilCli, mayCli, juneCli, julyCli)
      listPaymentsChart.push(januaryPays, februaryPays, marchPays, aprilPays, mayPays, junePays, julyPays)
    } else if (month === 'Agosto') {
      listClientsChart.push(januaryCli, februaryCli, marchCli, aprilCli, mayCli, juneCli, julyCli, augostCli)
      listPaymentsChart.push(januaryPays, februaryPays, marchPays, aprilPays, mayPays, junePays, julyPays, augostPays)
    } else if (month === 'Septiembre') {
      listClientsChart.push(januaryCli, februaryCli, marchCli, aprilCli, mayCli, juneCli, julyCli, augostCli, septemberCli)
      listPaymentsChart.push(januaryPays, februaryPays, marchPays, aprilPays, mayPays, junePays, julyPays, augostPays, septemberPays)
    } else if (month === 'Octubre') {
      listClientsChart.push(januaryCli, februaryCli, marchCli, aprilCli, mayCli, juneCli, julyCli, augostCli, septemberCli, octoberCli)
      listPaymentsChart.push(januaryPays, februaryPays, marchPays, aprilPays, mayPays, junePays, julyPays, augostPays, septemberPays, octoberPays)
    } else if (month === 'Noviembre') {
      listClientsChart.push(januaryCli, februaryCli, marchCli, aprilCli, mayCli, juneCli, julyCli, augostCli, septemberCli, octoberCli, novemberCli)
      listPaymentsChart.push(januaryPays, februaryPays, marchPays, aprilPays, mayPays, junePays, julyPays, augostPays, septemberPays, octoberPays, novemberPays)
    } else  {
      listClientsChart.push(januaryCli, februaryCli, marchCli, aprilCli, mayCli, juneCli, julyCli, augostCli, septemberCli, octoberCli, novemberCli, decemberCli)
      listPaymentsChart.push(januaryPays, februaryPays, marchPays, aprilPays, mayPays, junePays, julyPays, augostPays, septemberPays, octoberPays, novemberPays, decemberPays)
    } 

    chart()
  }

  const openModalClient = () => {
    document.getElementById('client-form').reset()
    showModalClient(true)

  }
  const closeModalClients = () => {
    showModalClient(false)
    document.getElementById('client-form').reset()
    deleteErrors(true)
  }

  const openModalPay = () => {
    showModalPay(true)
  }
  const closeModalPay = () => {
    showModalPay(false)
    document.getElementById('pay-form').reset()
    deleteErrors(true)
  }

  const closeModalEditPay = () => {
    showModalEditPay(false)
    document.getElementById('pay-form').reset()
    deleteErrors(true)
  }

  const reloadPayList = async () => {
    try {
      showSpinner(true)
      const res = await axios.get(`${CLIENTS_BASE_URL}lista-pagos/${year}/${monthFormated}`)
      loadPaysList(res.data.data)
      showSpinner(false)

    } catch (error) {
      console.log(error)
      showSpinner(false)
    }
  }

  const reloadClientList = async () => {
    try {
      showSpinner(true)
      const resClients = await axios.get(`${CLIENTS_BASE_URL}lista-clientes`)
      loadClientsList(resClients.data)
      showSpinner(false)
    } catch (error) {
      console.log(error)
      showSpinner(false)
    }
  }

  const editPay = (e) => {
    loadPayInfo(JSON.parse(e.target.value))
    showModalEditPay(true)
  }

  const openDeleteModal = (e) => {
    loadPayInfo(JSON.parse(e.target.value))
    showConfirmationModal(true)
  }

  const closeConfirmationModal = () => {
    showConfirmationModal(false)
  }

  const deletePay = async () => {
    try {
      showSpinner(true)
      closeConfirmationModal()
      await axios.delete(`${CLIENTS_BASE_URL}borrar-pago/${payInfo._id}/${payInfo.clientId}/${payInfo.beneficiaryId}`, {
        headers: {
          'auth-token': props.tokenId
        }
      })
      await reloadPayList()
      showSpinner(false)

    } catch (error) {
      console.log(error)
      showSpinner(false)
      updateErrorMsg(error.response.data ? error.response.data.error : 'Hubo un error al conectar con la Base de Datos')
      showModalError(true)
    }
  }

  const closeModalError = () => {
    showModalError(false)
  }

  return (
    <div className = "clients-container">
      <h1>Gestión de Clientes</h1>

      <ErrorModal 
        show = { modalError }
        handleClose = { closeModalError }
        msg = { errorMsg }/>

      <ConfirmationModal 
        show = { confirmationModal }
        handleClose = { closeConfirmationModal }
        ask = { '¿Estás seguro de que quieres borrar el pago de este cliente?' }
        value = { payInfo.client && payInfo.client[0] }
        confirmBtn = { deletePay }/>

      <ClientModal 
        show = { modalClient }
        handleClose = { closeModalClients }
        deleteErrors = { errors }
        showSpinner = { showSpinner }
        reloadClientList = { reloadClientList }
        { ...props }/>

      <PayModal 
        show = { modalPay }
        handleClose = { closeModalPay }
        deleteErrors = { errors }
        reloadPayList = { reloadPayList }
        showSpinner = { showSpinner }
        clientsList = { clientsList }
        adminsList = { adminsList }
        { ...props }/>

      <PayModal 
        show = { modalEditPay }
        handleClose = { closeModalEditPay }
        deleteErrors = { errors }
        reloadPayList = { reloadPayList }
        showSpinner = { showSpinner }
        clientsList = { clientsList }
        adminsList = { adminsList }
        payInfo = { payInfo }
        { ...props }/>

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
            <div className = "principal-button-container">
              <button className = "principal-button" onClick = { openModalClient }>Nuevo Cliente</button>
            </div>
            <div className = "principal-button-container">
              <button className = "principal-button" onClick = { openModalPay }>Añadir Pago</button>
            </div>
          </div>

          <div className = "payments-container">
            <h4 className = "payments-month">Estado Pagos { month } { year }
              <span>Selecciona otro mes:<DatePicker 
                className = "date-input" 
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                selected={ startDate } 
                onChange={ (date) => setStartDate(date) } 
                showPopperArrow={false}/></span>
            </h4>

            { paysList.length > 0 ?
              <div className = "tables-container">

                <table className = "table-clients">
                  <thead>
                    <tr className = "clients-table-tr">
                      <th>#</th>
                      <th>Cliente</th>
                      <th>Estado</th>
                      {!isDesktop &&
                      <th>Método</th>}
                      {!isDesktop &&
                      <th>Cantidad</th>}
                      {!isDesktop &&
                      <th>Recibe</th>}
                      {!isDesktop &&
                      <th>Notas</th>}
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {paysList.length > 0 && paysList.map((item, index) => (
                      <tr key = { item._id }>
                        <td>{ index + 1 }</td>
                        <td className = "td-name"><Link to = { `/detalle-cliente/${item.clientId}` }>{ item.client[0] }</Link></td>
                        <td><div className = { item.status === 'Pagado' ?  "pay-status status-green" : item.status === 'Impago' ? "pay-status status-red" : "pay-status status-orange"}></div></td>
                        {!isDesktop &&
                        <td>{ item.type === 'Paysafecard' ? 'PSC' : item.type }</td>}
                        {!isDesktop &&
                        <td>{ item.price } €</td>}
                        {!isDesktop &&
                        <td>{ item.beneficiary[0] }</td>}
                        {!isDesktop &&
                        <td>{ item.information }</td>}
                        <td><button onClick = { editPay } value = { JSON.stringify(item) } className = "table-client-btn edit-client-btn"/></td>
                        <td><button onClick = { openDeleteModal } value = { JSON.stringify(item) } className = "table-client-btn delete-client-btn"/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className = "table-admins-container">
                  <p className = "total-resume">Total recaudación { month } { year }: <span>{ totalPayments }€</span></p>

                  <h5 className = "admins-table-title">Reparto Pagos</h5>
                  <table className = "table-admins">
                    <thead>
                      <tr className = "clients-table-tr">
                        <th>Nombre</th>
                        <th>Recibido</th>
                        <th>Objetivo</th>
                        <th>Diferencia</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Antonio</td>
                        <td>{ paymentsAntonio }</td>
                        <td>{ Math.round(totalPayments * 0.25) }</td>
                        <td>{paymentsAntonio - totalPayments * 0.25 > 0 ? 'Sobran' : 'Faltan'} { Math.abs(Math.round(paymentsAntonio - totalPayments * 0.25)) }€</td>
                      </tr>
                      <tr>
                        <td>Eduardo</td>
                        <td>{ paymentsEdu }</td>
                        <td>{ Math.round(totalPayments * 0.45) }</td>
                        <td>{paymentsEdu - totalPayments * 0.45 > 0 ? 'Sobran' : 'Faltan'} { Math.abs(Math.round(paymentsEdu - totalPayments * 0.45)) }€</td>
                      </tr>
                      <tr>
                        <td>Víctor</td>
                        <td>{ paymentsVictor }</td>
                        <td>{ Math.round(totalPayments * 0.3) }</td>
                        <td>{paymentsVictor - totalPayments * 0.3 > 0 ? 'Sobran' : 'Faltan'} { Math.abs(Math.round(paymentsVictor - totalPayments * 0.3)) }€</td>
                      </tr>
                    </tbody>
                  </table>

                  <div>
                    <p className = "total-resume">Resúmen Clientes Año</p>
                    <Line 
                      data = { chartData }
                      />
                  </div>

                  <div>
                    <p className = "total-resume">Resúmen Ingresos Año</p>
                    <Line 
                      data = { chartPaymentsData }
                      />
                  </div>
                </div>

              </div>

            :
            
              <div>
                <p className = "clients-msg">No hay pagos que mostrar para {`${month}-${year}`}</p>
              </div>

            }

          </div>
          <div className = "margin-bottom-box"></div>
        </div>
      
      }
    </div>
  );
}
 
export default Clients;