import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.7.24.52:3000",
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
