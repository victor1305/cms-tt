import React from 'react';
import Modal from './Modal';

const ErrorModal = ({ show, handleClose, msg }) => {

  return (
    <Modal show = { show } handleClose = { handleClose }>
      <p className = "modal-error-p">{ msg }</p>
      <div className = "delete-modal-btn-container">
        <button className = "delete-cancel-btn-modal" onClick = { handleClose }>Aceptar</button>
      </div>
    </Modal>
  );
}
 
export default ErrorModal;