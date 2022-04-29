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
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (value) => {
      console.log(value);
      navigate('/');
    },
  });
  return (
    <div className={styles.container}>
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
