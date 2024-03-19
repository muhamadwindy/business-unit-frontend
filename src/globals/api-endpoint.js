import CONFIG from './config';

const API_ENDPOINT = {
  AUTH_LOGIN: `${CONFIG.BASE_URL}auth/login`,
  AUTH_REGISTER: `${CONFIG.BASE_URL}auth/register`,
  DOC_GET: `${CONFIG.BASE_URL}document/get`,
  DOC_UPLOAD: `${CONFIG.BASE_URL}document/upload`,
  DOC_DOWNLOAD: (id) => `${CONFIG.BASE_URL}document/download/${id}`,
};

export default API_ENDPOINT;
