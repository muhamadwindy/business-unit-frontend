import axios from 'axios';
import API_ENDPOINT from '../globals/api-endpoint';

const AuthServices = () => {
  const showResponseMessage = (param) => {
    return param;
  };
  const Login = async (username, password) => {
    try {
      const response = await axios.post(API_ENDPOINT.AUTH_LOGIN, {
        username,
        password,
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      showResponseMessage(error);
    }
  };
};

export default AuthServices;
