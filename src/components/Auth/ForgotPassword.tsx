// import APIs
import { forgotPassword } from '@apis/forgot-password';
import {
  Button,
  Classes,
  FormGroup,
  Spinner,
  InputGroup,
  Intent,
} from '@blueprintjs/core';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';

import Logo from '../../assets/images/favicon.png';
import { ToastNotice } from '../Toast/Toast';
import styles from './ForgotPassword.module.scss';
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required!'),
});
const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMesssage] = useState<boolean>(false);
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (value) => {
      try {
        const email = value.email;
        setLoading(true);
        const res = await forgotPassword(email);
        // console.log(res);
        if (res.statusCode && res.statusCode == 404) {
          throw new Error(res.message);
        }
        setLoading(false);
        setMesssage(true);
      } catch (error: any) {
        setLoading(false);
        ToastNotice(error.message);
      }
    },
  });
  if (message) {
    return (
      <div className={styles.typeEmail}>
        <Helmet>
          <title>Forgot Password | MindX Teaching Manager</title>
        </Helmet>
        <div className={styles.form} style={{ textAlign: 'center' }}>
          <div className={styles.intro}>
            <img src={Logo} className={styles.logo} alt="MindX" id="logo-mindx" />
            <h2>MindX Technology</h2>
            <p>
              Please, check email {values.email}, We have sent link reset your password!
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={styles.typeEmail}>
        <Helmet>
          <title>Forgot Password | MindX Teaching Manager</title>
        </Helmet>
        <div className={styles.form}>
          <div className={styles.intro}>
            <img src={Logo} className={styles.logo} alt="MindX" id="logo-mindx" />
            <h1>RESET YOUR PASSWORD</h1>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <p>
                Enter your user account&apos;s verified email address and we will send you
                a password reset link.
              </p>
              <form onSubmit={handleSubmit}>
                <FormGroup label="Email" labelFor="text-input" labelInfo="(required)">
                  <InputGroup
                    id="text-input"
                    placeholder="example@email.com"
                    type="email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    className={errors.email && touched.email ? 'bp4-intent-danger' : ''}
                  />
                  {errors.email && touched.email && (
                    <span style={{ color: 'red' }}>{errors.email}</span>
                  )}
                </FormGroup>
                <Button intent={Intent.PRIMARY} type="submit" className={Classes.FILL}>
                  Confirm
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
