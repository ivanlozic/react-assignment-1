import { useCallback, useEffect, useState } from 'react';
import { axiosRoutes } from '../../constants/constants';
import useFetch from '../useFetch/useFetch';
import { User } from '../../constants/interfaces';

const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { data: fetchedUsers } = useFetch<User[]>(axiosRoutes.user.USERS);

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);

  const getUserName = useCallback(
    (userId: number) => {
      const user = users.find((user) => user.id === userId);
      return user ? user.name : '';
    },
    [users]
  );

  return { users, getUserName };
};

export default useUser;
