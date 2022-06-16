import axios from 'axios';
import { AuthLogin } from 'types/user';
export { login };
interface response {
  data: {
    accessToken: string;
    user: {
      email: string;
      id: string;
      isVerified: boolean;
      role: string[];
    };
  };
}
const login = (auth: AuthLogin) => {
  return axios
    .post('/api/user/login', auth)
    .then((result: response) => {
      console.log(result);
      
      return result.data;
    })
    .catch((err) => {
      return err.response;
    });
};
