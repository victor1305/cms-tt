import React from 'react';
import Modal from './Modal';

const ConfirmationModal = ({ show, handleClose, ask, value, confirmBtn }) => {

  return (
    <Modal show = { show } handleClose = { handleClose }>
      <p className = "delete-modal-title">{ ask }</p>
      <p className = "confirm-modal-value">{ value }</p>
      <div className = "delete-modal-btn-container">
        <button className = "delete-confirm-btn-modal" onClick = { confirmBtn }>Confirmar</button>
        <button className = "delete-cancel-btn-modal" onClick = { handleClose }>Cancelar</button>
      </div>
    </Modal>
  );
}
 
export default ConfirmationModal;