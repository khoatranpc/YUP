import 'normalize.css';
import './App.css';

import Login from '@components/Auth/Login';
import Home from '@components/Home';
import Layout from '@components/Layout';
import NotFoundPage from '@components/NotFoundPage';
import AuthProtect from '@components/shared/AuthProtect';
import Teacher from '@components/Teacher';
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
        <Route
          path="/"
          element={
            <AuthProtect>
              <Layout />
            </AuthProtect>
          }
        >
          <Route path="" element={<Home />} />
          <Route path="teacher" element={<Teacher />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
