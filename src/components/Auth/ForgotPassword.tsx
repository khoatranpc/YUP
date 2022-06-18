// import APIs
import { forgotPassword } from '@apis/forgot-password';
import { Button, Classes, FormGroup, H5, InputGroup, Intent } from '@blueprintjs/core';
import { useFormik } from 'formik';
import LoadingStyle from 'Loading/LoadingStyle';
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
  const [Loading, setLoading] = useState<boolean>(false);
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
        ToastNotice(res.message);
      } catch (error: any) {
        setLoading(false);
        ToastNotice(error.message);
      }
    },
  });
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
          <H5>
            Enter your user account&apos;s verified email address and we will send you a
            password reset link.
          </H5>
          <form onSubmit={handleSubmit}>
            <FormGroup
              label="Type your Email"
              labelFor="text-input"
              labelInfo="(required)"
            >
              <InputGroup
                id="text-input"
                placeholder="example@email.com"
                type="email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email && (
                <span style={{ color: 'red' }}>{errors.email}</span>
              )}
            </FormGroup>
            {Loading ? (
              <LoadingStyle />
            ) : (
              <Button intent={Intent.PRIMARY} type="submit" className={Classes.FILL}>
                Confirm
              </Button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
