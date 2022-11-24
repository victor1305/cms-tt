import React, { useEffect, useState } from 'react';

import Modal from '../../Modal/Modal'
import axios from 'axios'
import ConfirmationModal from '../../Modal/ConfirmationModal';
import ErrorModal from '../../Modal/ErrorModal'

const BETS_BASE_URL = 'https://api-tt.onrender.com/api/apuestas/'

const ParameterModal = ({ show, handleClose, showSpinner, reloadBets, tokenId }) => {
  // HOOKS
  const [ parameter, addParameter ] = useState({
    value: '',
    type: ''
  })
  const [ parameterModal, showParameterModal ] = useState(false)
  const [ modalError, showModalError ] = useState(false)
  const [ errorMsg, updateErrorMsg ] = useState('')
  const [ errors, updateError ] = useState('')

  useEffect(() => {
    if(errors) {
      updateError('')
    }
    // eslint-disable-next-line
  }, [handleClose])

  // FUNCTIONS

  const updateParameters = e => {
    addParameter({
      ...parameter,
      [e.target.name] : e.target.value
    })
  }

  const validateModal = e => {
    e.preventDefault()
    validation()
  }

  const validation = () => {
    if(!parameter.value || !parameter.type) {
      updateError('Es necesario rellenar los 2 campos')
    } else {
      confirmationModal()
    }
  }

  const confirmationModal = () => {
    handleClose()
    showParameterModal(true)
  }

  const closeConfirmationModal = () => {
    showParameterModal(false)
  }

  const saveParameter = async () => {
    try {
      showSpinner(true)
      showParameterModal(false)
      await axios.post(`${BETS_BASE_URL}crear-parametro`, parameter, {
        headers: {
          'auth-token': tokenId
        }
      })
      await reloadBets() 
      showSpinner(false)
      
    } catch (error) {
      console.log(error)
      showParameterModal(false)
      showSpinner(false)
      updateErrorMsg(error.response.data ? error.response.data.error : 'Hubo un error al conectar con la Base de Datos')
      showModalError(true)
    } 
  }

  const closeModalError = () => {
    showModalError(false)
  }

  return (
    <div>
      <Modal show = { show } handleClose = { handleClose }>
        <h4 className = "form-title">Añadir parámetro apuestas</h4>
        <form className = "form-container" id = "parameters-form" onSubmit = { validateModal }>

          <div className = "form-group">
            <label className = "form-label">Nombre:</label>
            <input className = "form-input" type="text" name="value" onChange = { updateParameters } />
          </div>

          <div className = "form-group">
            <label className = "form-label">Tipo:</label>
            <select className = "form-input" type="text" name="type" onChange = { updateParameters } >
              <option>-----Selecciona un Parámetro-----</option>
              <option>Hipódromo</option>
              <option>Código</option>
              <option>Stake</option>
            </select>
          </div>

          {errors && <p className = "form-error">{errors}</p>}

          <div className = "form-btn-container">
            <button className = "form-btn" type="submit">Crear</button>
          </div>

        </form>
      </Modal>

      <ConfirmationModal
        show = { parameterModal }
        ask = {`¿Quieres añadir este ${ parameter.type }`}
        value = { parameter.value }
        confirmBtn = { saveParameter }
        handleClose = { closeConfirmationModal }/>

      <ErrorModal 
        show = { modalError }
        handleClose = { closeModalError }
        msg = { errorMsg }/>
    </div>
  );
}
 
export default ParameterModal;