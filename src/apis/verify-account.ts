import axios from 'axios';
export { verifyAccount };

const verifyAccount = (verifyAccount: any) => {
  return axios
    .post('/api/user/forgot-password/verify', verifyAccount)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
