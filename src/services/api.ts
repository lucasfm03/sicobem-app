import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.3.8:3000",
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  error => {
    // servidor não respondeu (timeout, servidor off, rede)
    if (!error.response) {
      return Promise.reject({
        isConnectionError: true,
        message: "Não foi possível conectar ao servidor. Tente novamente."
      });
    }

    return Promise.reject(error);
  }
);
