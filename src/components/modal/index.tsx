import { FC } from 'react';
import './style.css';

interface ModalProps {
  handleClose: () => void;
  show: boolean;
  title: string;
  message: string;
}

const Modal: FC<ModalProps> = ({ handleClose, show, title, message }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div className='CloseModalContainer' onClick={handleClose}>
          x
        </div>
        <div className="TitleBaseModal">
          {title}
        </div>
        <div className='ModalContentContainer'>
          <div className="MessageBaseModal">
            {message}
          </div>
        </div>

        <div className="ButtonClose" onClick={handleClose}>
          Fechar
        </div>
      </div>
    </div>
  );
};

export default Modal;