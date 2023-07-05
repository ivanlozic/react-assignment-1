import React from 'react'
import styles from './Pagination.module.scss'
import HelloComponent from '../helloComponent/HelloComponent'

interface PaginationProps {
  currentPage: number
  totalPages: number
  // eslint-disable-next-line no-unused-vars
  onPageChange: (pageNumber: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) => {
  const handlePreviousPage = () => {
    onPageChange(currentPage - 1)
  }

  const handleNextPage = () => {
    onPageChange(currentPage + 1)
  }

  return (
    <div className={styles.pagination}>
      <button className={styles.paginationButton} onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span className={styles.currentPage}>{currentPage}</span>
      <button className={styles.paginationButton}  onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}

export default HelloComponent(Pagination)
