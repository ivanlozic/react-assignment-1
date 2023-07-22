import React from 'react';
import styles from '../../pagination/Pagination.module.scss';

interface PaginationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
}

const PaginationButton = ({
  onClick,
  disabled,
  children,
}: PaginationButtonProps): JSX.Element => {
  return (
    <button
      className={styles.paginationButton}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
