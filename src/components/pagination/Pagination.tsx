import React from 'react'
import styles from './Pagination.module.scss'
import HelloComponent from '../hoc/helloComponent/HelloComponent'
import { PaginationButton } from '../button/pagination-button'

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
      <PaginationButton
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </PaginationButton>
      <span className={styles.currentPage}>{currentPage}</span>
      <PaginationButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </PaginationButton>
    </div>
  )
}

export default HelloComponent(Pagination)
