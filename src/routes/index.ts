import { createBrowserRouter } from 'react-router-dom';
import routesList from './routesList';
import { createBrowserHistory } from '@remix-run/router';

const router = createBrowserRouter(routesList);
const history = createBrowserHistory();

export { router, history };
