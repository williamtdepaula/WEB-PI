import { FC } from 'react';
import './style.css';

interface ModalProps {
    handleClose: () => void;
    show: boolean,
}

const Modal: FC<ModalProps> = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        {children}
      </div>
    </div>
  );
};

export default Modal;