import { resetPassword } from '@apis/reset-password';
import {
  Button,
  Card,
  Classes,
  Elevation,
  FormGroup,
  H2,
  H3,
  InputGroup,
  Intent,
} from '@blueprintjs/core';
import { ToastNotice } from '@components/Toast/Toast';
import { useFormik } from 'formik';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';

import { verifyAccount } from '../../apis/verify-account';
import styles from './Resetpassword.module.scss';
// custom hook
const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};
const ResetPassword = () => {
  // redirect to login form
  const redirect = useNavigate();

  const query = useQuery();
  // get verify from email
  const verify = {
    email: query.get('email'),
    verificationCode: query.get('verificationCode'),
  };
  // call api verify email
  useEffect(() => {
    const res = async () => {
      try {
        const data = await verifyAccount(verify);
        if (data.status != 201) {
          throw new Error(data.response.data.message);
        }
      } catch (error: any) {
        ToastNotice(error.toString());
        const IdTimeOut = setTimeout(() => {
          redirect('/auth/login', { replace: true });
          return clearTimeout(IdTimeOut);
        }, 2000);
      }
    };
    res();
  }, []);
  // reset Password
  const { handleSubmit, handleChange, handleBlur, values } = useFormik({
    initialValues: {
      email: query.get('email'),
      newPassword: '',
      confirmPassword: '',
      verificationCode: query.get('verificationCode'),
    },
    onSubmit: async (value) => {
      try {
        if (!value.newPassword || !value.confirmPassword)
          throw new Error('Password or Re-type password must be not emtpy!');
        if (value.newPassword.length < 6)
          throw new Error('Password must be large 6 character!');
        if (value.newPassword != value.confirmPassword)
          throw new Error('Password is not match!');
        const user = {
          email: value.email,
          password: value.newPassword,
          verificationCode: query.get('verificationCode'),
        };
        // call API reset-password
        const data = await resetPassword(user);
        if (data.status != 200) {
          throw new Error(data.data.message);
        }
        ToastNotice(data.data.message.toString());
        // auto redirect do form login
        const IdTimeOut = setTimeout(() => {
          redirect('/auth/login', { replace: true });
          return clearTimeout(IdTimeOut);
        }, 2000);
      } catch (err: any) {
        ToastNotice(err.message.toString());
      }
    },
  });

  return (
    <>
      <div className={styles.container}>
        <H2>Reset your Password now!</H2>
        <Helmet>
          <title>Reset Password | MindX Teaching Manager</title>
        </Helmet>
        <Card
          interactive={true}
          elevation={Elevation.ONE}
          className={styles.resetpassword_Card}
        >
          <H3>Reset your password</H3>
          <form onSubmit={handleSubmit}>
            <FormGroup label="Password">
              <InputGroup
                placeholder="Enter password"
                type="password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormGroup>
            <FormGroup label="Re-type passwrod">
              <InputGroup
                placeholder="password"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormGroup>
            <Button intent={Intent.PRIMARY} type="submit" className={Classes.FILL}>
              Reset password
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};
export default ResetPassword;
