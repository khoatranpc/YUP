import axios from 'axios';
export { forgotPassword };
const forgotPassword = (email: string) => {
  return axios.post('/api/user/forgot-password', {
    email: email,
  });
};
