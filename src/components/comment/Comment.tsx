import { CommentProps } from '../../constants/interfaces'
import HelloComponent from '../hoc/helloComponent/HelloComponent'
import styles from './Comment.module.scss'

const Comment = ({ name, body, email }: CommentProps): JSX.Element => {
  return (
    <div className={styles.comment}>
      <h4 className={styles.name}>Name: {name}</h4>
      <p className={styles.email}>Email: {email}</p>
      <p className={styles.body}>{body}</p>
    </div>
  )
}

export default HelloComponent(Comment)
