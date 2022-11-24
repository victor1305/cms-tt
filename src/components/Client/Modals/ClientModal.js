import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ErrorModal from '../../Modal/ErrorModal';
import Modal from '../../Modal/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CLIENTS_BASE_URL = 'https://api-tt.onrender.com/api/clientes/'

const ClientModal = (props) => {

  // HOOKS ----------------------------------
  const [ modalError, showModalError ] = useState(false)
  const [ errorMsg, updateErrorMsg ] = useState('')
  const [ errors, saveErrors ] = useState({})
  const [ startDate, setStartDate ] = useState(new Date())
  const [ clientState, addClientState ] = useState({})

  let validation = {}

  useEffect(() => {
    if(props.deleteErrors){
      saveErrors({})
    }
  }, [props])

  useEffect(() => {

    const setDate = () => {

      addClientState({
        ...clientState,
        registerDate: startDate.toISOString()
      })
    }

    setDate()
    // eslint-disable-next-line
  }, [startDate])


  // FUNCTIONS
  const updateClientState = e => {
    e.preventDefault()
    addClientState({
      ...clientState,
      [e.target.name] : e.target.value
    })
  }

  const validateForm = () => {
    validation = {}
    if (!clientState.name) {
      validation.name = 'Es necesario un nombre para el cliente'
    }
    if (!clientState.phone) {
      validation.phone = 'El número de teléfono es obligatorio'
    }
    if (!clientState.registerDate) {
      validation.registerDate = 'Necesito una fecha de alta'
    }

    saveErrors(validation)
  }

  const validateClient = e => {
    e.preventDefault()
    saveErrors({})
    validateForm()

    if (Object.values(validation).length > 0) {
      return
    } 

    createClient()

  }

  const createClient = async () => {
    try {
      props.handleClose()
      props.showSpinner(true)
      await axios.post(`${CLIENTS_BASE_URL}crear-cliente`, clientState, {
        headers: {
          'auth-token': props.tokenId
        }
      })
      props.reloadClientList()
      addClientState({})
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
    document.getElementById('client-form').reset()
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
        <h4 className = "form-title">Añadir Cliente</h4>
        <form className = "form-container" id = "client-form" onSubmit = { validateClient }>

          <div className = "form-group">
            <label className = "form-label">Nombre *:</label>
            <input className = "form-input" type="text" name="name" onChange = { updateClientState } />
            { errors.name && <p className = "form-error">{errors.name}</p> }
          </div>

          <div className = "form-group">
            <label className = "form-label">Número Teléfono *:</label>
            <input className = "form-input" type="number" name="phone" onChange = { updateClientState } />
            { errors.phone && <p className = "form-error">{errors.phone}</p> }
          </div>

          <div className = "form-group">
            <label className = "form-label">Fecha Registro *:</label>
            <DatePicker 
              className = "form-input" 
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
              selected={ startDate } 
              onChange={ (date) => setStartDate(date) } 
              showPopperArrow={false}/>
            { errors.registerDate && <p className = "form-error">{errors.registerDate}</p> }
          </div>

          <div className = "form-group">
            <label className = "form-label">Referido :</label>
            <input className = "form-input" type="text" name="referred" onChange = { updateClientState } />
          </div>

          <div className = "form-btn-container">
            <button className = "form-btn" type="submit">Añadir</button>
          </div>

        </form>
      </Modal>
    </div>
  );
}
 
export default ClientModal;