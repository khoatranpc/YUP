import 'normalize.css';
import './App.css';

import Login from '@components/Auth/Login';
import Home from '@components/Home';
import Layout from '@components/Layout';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
