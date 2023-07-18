import { useEffect, useState } from 'react'
import { axiosRoutes } from '../../constants/constants'
import { User } from '../../constants/interfaces'
import useFetch from '../useFetch/useFetch'

const useUser = () => {
  const [users, setUsers] = useState<User[]>([])
  const { data: fetchedUsers } = useFetch<User[]>(axiosRoutes.user.USERS)

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers)
    }
  }, [fetchedUsers])

  const getUserName = (userId: number) => {
    const user = users.find((user) => user.id === userId)
    return user ? user.name : ''
  }

  return { users, getUserName }
}

export default useUser
