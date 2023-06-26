import HelloComponent from "./HelloComponent"

interface CommentProps {
  postId: number
  id: number
  name: string
  body: string
  email: string
}

const Comment = ({
  postId,
  id,
  name,
  body,
  email
}: CommentProps): JSX.Element => {

    HelloComponent('Hello from', 'Comment')
  return (
    <div className='comment'>
      <h4 className='comment__name'>Name: {name}</h4>
      <p className='comment__email'>Email: {email}</p>
      <p className='comment__body'>{body}</p>
    </div>
  )
}

export default Comment


