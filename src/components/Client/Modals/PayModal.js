import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ErrorModal from '../../Modal/ErrorModal';
import Modal from '../../Modal/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CLIENTS_BASE_URL = 'https://api-tt.onrender.com/api/clientes/'
//const CLIENTS_BASE_URL = 'http://localhost:3030/api/clientes/'

const PayModal = (props) => {

  // HOOKS ----------------------------------
  const [ modalError, showModalError ] = useState(false)
  const [ errorMsg, updateErrorMsg ] = useState('')
  const [ errors, saveErrors ] = useState({})
  const [ startDate, setStartDate ] = useState(new Date())
  const [ payState, addPayState ] = useState({})

  let validation = {}

  useEffect(() => {
    if(props.payInfo && props.payInfo._id) {
      addPayState({
        client: props.payInfo.clientId[0],
        status: props.payInfo.status,
        date: props.payInfo.date,
        price: props.payInfo.price,
        information: props.payInfo.information,
        type: props.payInfo.type,
        beneficiary: props.payInfo.beneficiaryId[0]
      })
    }
    if(props.deleteErrors){
      saveErrors({})
    }
  }, [props])

  useEffect(() => {

    const setDate = () => {

      addPayState({
        ...payState,
        month: startDate.toISOString()
      })
    }

    setDate()
    // eslint-disable-next-line
  }, [startDate])

  // FUNCTIONS
  const updatePayState = e => {
    e.preventDefault()
    addPayState({
      ...payState,
      [e.target.name] : e.target.value
    })
  }

  const validateForm = () => {
    validation = {}
    if (!payState.client) {
      validation.client = 'Pero... Quien paga??'
    }
    if (!payState.beneficiary) {
      validation.beneficiary = 'A quien se lo asignamos??'
    }
    if (!payState.month) {
      validation.month = 'Necesito saber a que mes corresponde el pago'
    }
    if (!payState.type) {
      validation.type = 'El metodo de pago es bastante importante'
    }

    saveErrors(validation)
  }

  const validatePay = e => {
    e.preventDefault()
    saveErrors({})
    validateForm()

    if (Object.values(validation).length > 0) {
      return
    } 

    createPay()

  }

  const createPay = async () => {
    try {
      props.handleClose()
      props.showSpinner(true)
      await axios.post(`${CLIENTS_BASE_URL}crear-informacion-pago`, payState, {
        headers: {
          'auth-token': props.tokenId
        }
      })
      await props.reloadPayList()
      addPayState({})
      deleteInputs()
      props.showSpinner(false)

    } catch (error) {
      console.log(error)
      props.handleClose()
      props.showSpinner(false)
      updateErrorMsg(error.response.data ? error.response.data.error : 'Hubo un error al conectar con la Base de Datos')
      showModalError(true)
    }
  }

  const editPay = async (e) => {
    e.preventDefault()
    try {
      props.handleClose()
      props.showSpinner(true)
      await axios.put(`${CLIENTS_BASE_URL}editar-informacion-pago/${props.payInfo._id}/${props.payInfo.beneficiaryId[0]}`, payState, {
        headers: {
          'auth-token': props.tokenId
        }
      })
      await props.reloadPayList()
      addPayState({})
      deleteInputs()
      props.showSpinner(false)

    } catch (error) {
      console.log(error)
      props.handleClose()
      props.showSpinner(false)
      updateErrorMsg(error.response.data ? error.response.data.error : 'Hubo un error al conectar con la Base de Datos')
      showModalError(true)
    }
  }

  const deleteInputs = () => {
    document.getElementById('pay-form').reset()
  }

  const closeModalError = () => {
    showModalError(false)
  }

  return (
    <div>
      <ErrorModal
        show = { modalError }
        handleClose = { closeModalError }
        msg = { errorMsg }/>

      <Modal show = { props.show } handleClose = { props.handleClose }>
        <h4 className = "form-title">
          {props.payInfo && props.payInfo.client ? `Editar el pago de ${props.payInfo.client[0]}` : 'Añadir Pago'}
        </h4>
        <form className = "form-container" id = "pay-form" onSubmit = { props.payInfo ? editPay : validatePay }>

          {!props.payInfo && 
            <div className = "form-group">
              <label className = "form-label">Cliente *:</label>
              <select 
                className = "form-input" 
                name="client" 
                onChange = { updatePayState }>
                <option>--- Selecciona un Cliente ---</option>
              { props.clientsList.data && props.clientsList.data.map(elm => (
                <option key = {elm._id} value = {elm._id}>{elm.name}</option>
              )) }
              </select>            
              { errors.client && <p className = "form-error">{errors.client}</p> }
            </div>
          }

          <div className = "form-group">
            <label className = "form-label">Estado:</label>
            <select 
              className = "form-input" 
              name="status" 
              onChange = { updatePayState } 
              value = { props.payInfo && payState.status} >
              <option>--- Selecciona un Estado ---</option>
              <option>Pendiente</option>
              <option>Pagado</option>
              <option>Impago</option>
            </select>
          </div>

          {!props.payInfo &&
            <div className = "form-group">
              <label className = "form-label">Mes del Pago *:</label>
              <DatePicker 
                className = "form-input" 
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                selected={ startDate } 
                onChange={ (date) => setStartDate(date) } 
                showPopperArrow={false}/>
              { errors.month && <p className = "form-error">{errors.month}</p> }
            </div>
          } 

          <div className = "form-group">
            <label className = "form-label">Precio :</label>
            <input className = "form-input" type="number" name="price" onChange = { updatePayState } defaultValue = { props.payInfo && props.payInfo.price}/>
          </div>

          <div className = "form-group">
            <label className = "form-label">Forma Pago *:</label>
            <select 
              className = "form-input" 
              name="type" 
              onChange = { updatePayState } 
              value = { props.payInfo && payState.type}>
              <option>--- Selecciona un Método de pago ---</option>
              <option>Bizum</option>
              <option>Paypal</option>
              <option>Paysafecard</option>
              <option>Efectivo</option>
              <option>Transferencia</option>
            </select>
            { errors.type && <p className = "form-error">{errors.type}</p> }
          </div>

          <div className = "form-group">
            <label className = "form-label">Asignación de Pago *:</label>
            <select 
              className = "form-input" 
              name="beneficiary" 
              onChange = { updatePayState }
              value = { props.payInfo && payState.beneficiary}>
              <option>--- Asigna el Pago ---</option>
            { props.adminsList.data && props.adminsList.data.map(elm => (
              <option key = {elm._id} value = {elm._id}>{elm.name}</option>
            )) }
            </select>
            { errors.beneficiary && <p className = "form-error">{errors.beneficiary}</p> }
          </div>

          <div className = "form-group">
            <label className = "form-label">Notas :</label>
            <input className = "form-input" type="text" name="information" onChange = { updatePayState } defaultValue = {payState.information }/>
          </div>

          <div className = "form-btn-container">
            <button className = "form-btn" type="submit">{props.payinfo ? 'Editar' : 'Añadir'}</button>
          </div>

        </form>
      </Modal>
    </div>
  );
}
 
export default PayModal;