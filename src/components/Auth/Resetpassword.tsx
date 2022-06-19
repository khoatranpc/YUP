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
  Spinner,
} from '@blueprintjs/core';
import { ToastNotice } from '@components/Toast/Toast';
import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { verifyAccount } from '../../apis/verify-account';
import Logo from '../../assets/images/favicon.png';
import styles from './Resetpassword.module.scss';
const NoticeInvalidURL = () => {
  return (
    <>
      <div className={styles.messageInvalidLink}>
        <Helmet>
          <title>Invalid Link | MindX Teaching Manager</title>
        </Helmet>
        <div className={styles.invalid} style={{ textAlign: 'center' }}>
          <div className={styles.intro}>
            <img src={Logo} className={styles.logo} alt="MindX" id="logo-mindx" />
            <h3>Your link is invalid</h3>
            <Link to={'/auth/login'}>
              <u>Redirect to Login here</u>
            </Link>
          </div>
        </div>
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
  const [spinner, setSpinner] = useState<boolean>(false);
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
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
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
        setSpinner(true);
        await resetPassword(user);
        setSpinner(false);
        ToastNotice('Reset password successful!');
        // auto redirect do form login
        const IdTimeOut = setTimeout(() => {
          redirect('/auth/login', { replace: true });
          return clearTimeout(IdTimeOut);
        }, 3000);
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
        <Spinner className={styles.spinner} />
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
          <Card
            interactive={true}
            elevation={Elevation.ONE}
            className={styles.resetpassword_Card}
          >
            <H3 style={{ textAlign: 'center' }}>Reset your password</H3>
            <form onSubmit={handleSubmit}>
              <FormGroup label="New password">
                <InputGroup
                  placeholder="Enter new password"
                  type="password"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.newPassword && touched.newPassword ? 'bp4-intent-danger' : ''
                  }
                />
                {errors.newPassword && touched.newPassword && (
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
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? 'bp4-intent-danger'
                      : ''
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <label style={{ color: 'red' }}>*{errors.confirmPassword}</label>
                )}
              </FormGroup>
              {spinner ? (
                <Spinner />
              ) : (
                <Button intent={Intent.PRIMARY} type="submit" className={Classes.FILL}>
                  Reset password
                </Button>
              )}
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
