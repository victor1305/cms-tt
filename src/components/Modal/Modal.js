import React from 'react'
import './modal.css'

const Modal = ({ handleClose, show, children }) => {

  const showHideClassName = show ? "modal display-block" : "modal display-none"
  
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button className = "delete-btn btn-delete-modal" type="button" onClick={handleClose} />
        {children}
      </section>
    </div>
  );
}
 
export default Modal;

