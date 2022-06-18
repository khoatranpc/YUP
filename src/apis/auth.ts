import axios from 'axios';
import { AuthLogin, User } from 'types/user';
export { login };

const login = (auth: AuthLogin) => {
  return axios
    .post<{ user: User; accessToken: string }>('/api/user/login', auth)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err.response;
    });
};
