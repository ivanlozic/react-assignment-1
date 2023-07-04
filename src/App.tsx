import { Link } from 'react-router-dom'
import styles from './App.module.scss'
const App = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h1 className={styles.text}>Welcome to App</h1>
      <Link to='/posts'>
        <button className={styles.button}>See Posts</button>
      </Link>
    </div>
  )
}

export default App
