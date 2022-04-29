import AuthContext from 'contexts/auth';
import { ReactElement, useContext } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, any> | null;
}

const AuthProtect = (props: Props) => {
  const authCtx = useContext(AuthContext);
  if (!authCtx.user) {
    return <Navigate to="/auth/login" replace />;
  }
  return props.children;
};

export default AuthProtect;
