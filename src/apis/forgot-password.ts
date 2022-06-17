import axios from 'axios';
import { ForgotPassword } from 'types/user';
export { forgotPassword };
const forgotPassword = (email: string) => {
  return axios
    .post<ForgotPassword>('/api/user/forgot-password', {
      email: email,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
