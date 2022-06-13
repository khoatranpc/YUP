// import APIs
import { forgotPassword } from '@apis/forgot-password';
import { Button, Classes, FormGroup, H5, InputGroup, Intent } from '@blueprintjs/core';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

import Logo from '../../assets/images/favicon.png';
import { ToastNotice } from '../Toast/Toast';
import styles from './ForgotPassword.module.scss';

const ForgotPassword = () => {
  const { handleSubmit, handleChange, handleBlur, values } = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (value) => {
      try {
        const email = value.email;
        if (!email) throw new Error('Email is require!');
        await forgotPassword(email);
        ToastNotice(`Chúng tao đã gửi email cho mày rồi. Check đi ${values.email}`);
      } catch (error: any) {
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
            <label htmlFor="logo-mindx">RESET YOUR PASSWORD</label>
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
            </FormGroup>
            <Button intent={Intent.PRIMARY} type="submit" className={Classes.FILL}>
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
