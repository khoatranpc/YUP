import axios from 'axios';
import { VerifyAccount } from 'types/user';
export { verifyAccount };

const verifyAccount = (verifyAccount: any) => {
  // need type to safe
  return axios
    .post<VerifyAccount>('/api/user/forgot-password/verify', verifyAccount)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err.response;
    });
};
