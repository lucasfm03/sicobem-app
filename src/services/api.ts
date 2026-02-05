import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.7.24.113:3000",
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  error => {
    // timeout
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        type: "connection",
        message: "O servidor demorou para responder. Tente novamente."
      });
    }

    // servidor fora / sem resposta
    if (!error.response) {
      return Promise.reject({
        type: "connection",
        message: "Não foi possível conectar ao servidor. Verifique a conexão."
      });
    }

    // erro normal da API (401, 400, 500...)
    return Promise.reject(error);
  }
);
