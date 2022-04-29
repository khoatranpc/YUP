import { EMPTY_FUNC } from '@utils/types';
import { createContext } from 'react';
import { User } from 'types/user';

const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
}>({
  user: null,
  setUser: EMPTY_FUNC,
});

export default AuthContext;
