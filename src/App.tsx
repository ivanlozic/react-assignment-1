import { Link } from 'react-router-dom'
import './App.scss'
import HelloComponent from './components/HelloComponent'

const App = (): JSX.Element => {
  HelloComponent('Hello from', 'App')

  return (
    <div className='app-container'>
      <h1 className='app-container__text'>Welcome to App</h1>
      <Link to='/posts'>
        <button className='app-container__button'>See Posts</button>
      </Link>
    </div>
  )
}

export default App
