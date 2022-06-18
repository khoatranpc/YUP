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
import { ToastNotice } from '@components/Toast/Toast';
import AuthContext from 'contexts/auth';
import { useFormik } from 'formik';
import LoadingStyle from 'Loading/LoadingStyle';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate } from 'react-router-dom';
import * as Yup from 'yup';

import { login } from '../../apis/auth';
import styles from './Login.module.scss';

const Login = () => {
  // toggle  Notification
  const [Loading, setLoading] = useState<boolean>(false);
  const authCtx = useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validate schema
    validationSchema,
    onSubmit: async (value) => {
      const user = {
        email: value.email,
        password: value.password,
      };
      setLoading(true);
      const data = await login(user);
      if (data) setLoading(false);
      switch (data.user.isVerified) {
        case false:
          // await forgotPassword(value.email);
          ToastNotice(
            'Your account has not been verified, we have sent the verification address to your email!',
          );
          break;
        case true:
          alert('Đăng nhập thành công');
          break;
        default:
          break;
      }
      // call Apis Login
      // authCtx.setUser({
      //   username: value.username,
      // });
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
          <FormGroup label="Email">
            <InputGroup
              placeholder="Enter your email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <span style={{ color: 'red' }}>*{errors.email}</span>
            )}
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

          {Loading ? (
            <div>
              <LoadingStyle />
            </div>
          ) : (
            <Button intent={Intent.PRIMARY} type="submit" className={Classes.FILL}>
              Login
            </Button>
          )}

          <Link to="/user/forgot-password">
            <u>Forgot password?</u>
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default Login;
