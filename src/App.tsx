import './App.css';

import Login from '@components/Auth/Login';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />}></Route>
    </Routes>
  );
};

export default App;
