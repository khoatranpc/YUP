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
import LoadingStyle from 'Loading/LoadingStyle';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { verifyAccount } from '../../apis/verify-account';
import styles from './Resetpassword.module.scss';

const NoticeInvalidURL = () => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Your link is Invalid</h1>
        <Link to={'/auth/login'}>
          <u>Go to form login now!</u>
        </Link>
      </div>
    </>
  );
};
// custom hook
const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};
const ResetPassword = () => {
  // Message invalid
  const [InvalidURL, setInvalidURL] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
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
        setLoading(true);
        // let data;
        const data = await verifyAccount(verify);
        // đoạn này nếu API trả về Promise rùi, thì ở đây k thể tự catch được :(((())))
        if (data.status == 400) {
          throw new Error(data.data.message[0]);
        }
        setLoading(false);
      } catch (error: any) {
        // cần chỉnh sửa
        setLoading(false);
        ToastNotice(error.toString());
        setInvalidURL(true);
      }
    };
    res();
  }, []);
  // reset Password
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    newPassword: Yup.string()
      .min(6, 'Mininum 6 characters')
      .max(15, 'Maximum 15 characters')
      .required('Password is required!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], "Password's not match")
      .required('Confirm password is required!'),
  });
  const { handleSubmit, handleChange, handleBlur, values, errors } = useFormik({
    initialValues: {
      email: query.get('email'),
      newPassword: '',
      confirmPassword: '',
      verificationCode: query.get('verificationCode'),
    },
    validationSchema,
    onSubmit: async (value) => {
      try {
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
  if (loading) {
    return (
      <>
        <Helmet>
          <title>Reset Password | MindX Teaching Manager</title>
        </Helmet>
        <LoadingStyle />
      </>
    );
  }
  if (InvalidURL) {
    return (
      <>
        <Helmet>
          <title>Reset Password | MindX Teaching Manager</title>
        </Helmet>
        <NoticeInvalidURL />
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <Helmet>
          <title>Reset Password | MindX Teaching Manager</title>
        </Helmet>
        <div>
          <H2 style={{ textAlign: 'center' }}>Reset Password now!</H2>
          <Card
            interactive={true}
            elevation={Elevation.ONE}
            className={styles.resetpassword_Card}
          >
            <H3>Reset your password</H3>
            <form onSubmit={handleSubmit}>
              <FormGroup label="New password">
                <InputGroup
                  placeholder="Enter new password"
                  type="password"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.newPassword && (
                  <label style={{ color: 'red' }}>*{errors.newPassword}</label>
                )}
              </FormGroup>
              <FormGroup label="Confirm passwrod">
                <InputGroup
                  placeholder="Confirm password"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && (
                  <label style={{ color: 'red' }}>*{errors.confirmPassword}</label>
                )}
              </FormGroup>
              <Button intent={Intent.PRIMARY} type="submit" className={Classes.FILL}>
                Reset password
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
