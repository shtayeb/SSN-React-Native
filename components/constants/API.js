import axios from "axios";

export default axios.create({
  baseURL: `http://192.168.43.12:80/`,
  // withCredentials: true,
});

// export const SITE_URL = "http://localhost:8000/api/";
