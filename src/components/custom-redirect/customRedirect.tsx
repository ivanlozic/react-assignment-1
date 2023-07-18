import React from 'react';
import { Link } from 'react-router-dom';

interface CustomRedirectProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const CustomRedirect = ({
  to,
  children,
  className,
}: CustomRedirectProps): JSX.Element => {
  const handleRedirect = () => {
    window.location.href = to;
  };

  return (
    <Link to={to} className={className} onClick={handleRedirect}>
      {children}
    </Link>
  );
};

export default CustomRedirect;
