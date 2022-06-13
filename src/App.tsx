import 'normalize.css';
import './App.css';

import ForgotPassword from '@components/Auth/ForgotPassword';
import Login from '@components/Auth/Login';
import ResetPassword from '@components/Auth/Resetpassword';
import Home from '@components/Home';
import Layout from '@components/Layout';
import NotFoundPage from '@components/NotFoundPage';
import AuthProtect from '@components/shared/AuthProtect';
import Teacher from '@components/Teacher';
import Users from '@components/User';
import AuthContext from 'contexts/auth';
import { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { User } from 'types/user';

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const authCtxValue = useMemo(
    () => ({
      user: currentUser,
      setUser: (user: User) => {
        setCurrentUser(user);
      },
    }),
    [currentUser],
  );

  return (
    <AuthContext.Provider value={authCtxValue}>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/user">
          <Route path="forgot-password" element={<ForgotPassword />}></Route>
          <Route path="reset-password" element={<ResetPassword />}></Route>
        </Route>
        <Route
          path="/"
          element={
            <AuthProtect>
              <Layout />
            </AuthProtect>
          }
        >
          <Route path="" element={<Home />} />
          <Route path="teachers" element={<Teacher />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
