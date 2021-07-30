import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/Variables";

// Next we make an 'instance' of it
const getToken = async () => {
  try {
    return await AsyncStorage.getItem("@AuthToken");
  } catch (e) {
    console.log(e);
  }
};

getToken().then(async (res) => {
  // console.log(res);
  API.defaults.headers.common["Authorization"] = "Bearer " + res;
});

const API = axios.create({
  baseURL: API_URL,
});

export default API;
