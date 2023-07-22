import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { history, router } from './routes';

const App = (): JSX.Element => {
  useEffect(() => {
    if (window.location.pathname === '/') {
      history.push('/posts');
    }
  }, []);
  return (
    <div>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
};

export default App;
