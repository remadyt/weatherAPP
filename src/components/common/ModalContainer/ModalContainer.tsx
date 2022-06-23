import Modal from 'react-modal';
import classNames from 'classnames';

import styles from './ModalContainer.module.scss';

type Props = {
  children?: JSX.Element | JSX.Element[];
  handleClose?: () => void;
  isOpen: boolean;
  customStyles?: string;
};

export const ModalContainer = ({ children, handleClose, isOpen, customStyles }: Props) => {
  const style = {
    overlay: {
      background: 'rgba(11, 11, 11, 0.5)',
    },
  };

  return (
    <Modal
      style={style}
      className={classNames(styles.modal, customStyles)}
      isOpen={isOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};