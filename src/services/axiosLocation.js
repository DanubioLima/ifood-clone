import axios from 'axios';

const axiosLocation = axios;

axiosLocation.defaults.baseURL = 'https://maps.googleapis.com'
axiosLocation.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axiosLocation.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default axiosLocation;