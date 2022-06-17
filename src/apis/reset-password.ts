import axios from 'axios';
export { resetPassword };
interface ResetPassword {
  email: string | null;
  password: string | null;
  verificationCode: string | null;
}
const resetPassword = (resetPassword: ResetPassword) => {
  return axios
    .put<ResetPassword>('/api/user/reset-password', resetPassword)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};
