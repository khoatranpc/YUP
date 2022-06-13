import axios from 'axios';
export { resetPassword };
interface ResetPassword {
  email: string | null;
  password: string | null;
  verificationCode: string | null;
}
const resetPassword = (resetPassword: ResetPassword) => {
  return axios
    .put('/api/user/reset-password', resetPassword)
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((err) => {
      return err;
    });
};
