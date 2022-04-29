import {
  Button,
  Card,
  Classes,
  Elevation,
  FormGroup,
  H3,
  InputGroup,
  Intent,
} from '@blueprintjs/core';
import AuthContext from 'contexts/auth';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';

import styles from './Login.module.scss';

const Login = () => {
  const authCtx = useContext(AuthContext);
  const { handleSubmit, handleChange, handleBlur, values } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (value) => {
      authCtx.setUser({
        username: value.username,
      });
    },
  });

  if (authCtx.user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Login | MindX Teaching Manager</title>
      </Helmet>
      <Card interactive={true} elevation={Elevation.ONE} className={styles.loginCard}>
        <H3>MindX Teaching Manager</H3>
        <form onSubmit={handleSubmit}>
          <FormGroup label="Username">
            <InputGroup
              placeholder="Enter username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup label="Password">
            <InputGroup
              placeholder="Enter password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormGroup>
          <Button intent={Intent.PRIMARY} type="submit" className={Classes.FILL}>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
