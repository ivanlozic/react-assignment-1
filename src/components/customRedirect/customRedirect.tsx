import React from 'react'
import PropTypes from 'prop-types'

interface CustomRedirectProps {
  to: string
  children: React.ReactNode
  className?: string
}

const CustomRedirect = ({
  to,
  children,
  className
}: CustomRedirectProps): JSX.Element => {
  const handleRedirect = () => {
    window.location.href = to
  }

  return (
    <div className={className} onClick={handleRedirect}>
      {children}
    </div>
  )
}

CustomRedirect.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default CustomRedirect
