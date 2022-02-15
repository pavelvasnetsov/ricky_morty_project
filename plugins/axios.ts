import axios from "axios";

const instance = axios.create({
  // withCredentials: true,
  // headers: {
  //   "Access-Control-Allow-Origin": "*"
  // },
  //  baseURL: 'localhost'
});

export default instance;
