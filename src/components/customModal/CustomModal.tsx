import React, { useEffect } from 'react';
import styles from './CustomModal.module.scss'


interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  useEffect(() => {
    const handleEscKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onRequestClose();
      }
    };

    window.addEventListener('keydown', handleEscKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [isOpen, onRequestClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.customModalOverlay} onClick={onRequestClose}>
      <div className={styles.customModal}onClick={(e) => e.stopPropagation()}>
        <button className={styles.customModalCloseButton} onClick={onRequestClose}>
          &times;
        </button>
        <div className={styles.customModalContent}>{children}</div>
      </div>
    </div>
  );
};



export default CustomModal;
