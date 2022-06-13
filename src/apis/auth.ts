import axios from 'axios';
import { AuthLogin } from 'types/user';
export { login };
const login = (auth: AuthLogin) => {
  return axios
    .post('/api/user/login', auth)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err.response;
    });
};
