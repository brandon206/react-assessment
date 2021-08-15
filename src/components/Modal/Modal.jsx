const Modal = ({ reset, hideModal }) => {
  return (
    <div className="modal">
      <div>
        <p>Are you sure you want to delete all items?</p>
        <div className="modal-button-container">
          <button onClick={reset} className="modal-delete">
            Confirm
          </button>
          <button onClick={hideModal} className="modal-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;