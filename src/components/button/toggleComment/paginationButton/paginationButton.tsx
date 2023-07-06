import { PaginationButtonProps } from '../../../../constants/interfaces'
import styles from '../../../pagination/Pagination.module.scss'

const PaginationButton = ({ onClick, disabled, children }:PaginationButtonProps): JSX.Element => {
  return (
    <button
      className={styles.paginationButton}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default PaginationButton
