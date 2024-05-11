import axios from "axios";
import { getItem } from "@/helpers/persistens-storage";

// axios.defaults.baseURL = "https://akmal-plast-invest.onrender.com/api";
axios.defaults.baseURL = "https://troubled-deer-jodhpurs.cyclic.app/api";

// test local storage
// axios.defaults.baseURL = "http://localhost:8008/api";

axios.interceptors.request.use((config) => {
  const token = getItem("token");
  const authorization = token ? `Token ${token}` : "";
  config.headers.Authorization = authorization;
  return config;
});

export default axios;
