import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.7.24.163:3000",
  timeout: 10000,
});

// interceptor de erro
api.interceptors.response.use(
  response => response,
  error => {
    // não conseguiu conectar
    if (!error.response) {
      return Promise.reject({
        message: "Não foi possível conectar ao servidor. Verifique sua internet ou tente novamente."
      });
    }

    return Promise.reject(error);
  }
);