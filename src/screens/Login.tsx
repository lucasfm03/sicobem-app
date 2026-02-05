import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import Input from "../components/Input";
import { router } from "expo-router";
import Popup from "../components/Popup";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

export default function Login() {

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Credenciais inválidas"); //<----

  /* ================= CPF ================= */

  function formatCPF(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function isValidCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    for (let i = 1; i <= 10; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  /* ================= LOGIN ================= */

  async function handleLogin() {

    if (!cpf || !senha) {
      setErrorMessage("Preencha todos os campos");
      setShowError(true);
      return;
    }

    if (!isValidCPF(cpf)) {
      setErrorMessage("CPF inválido");
      setShowError(true);
      return;
    }

    try {
      const response = await api.post("/login", {
        cpf: cpf.replace(/\D/g, ""),
        senha,
      });

      const { token, usuario } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("usuario", JSON.stringify(usuario));

      router.replace("/(tabs)/home");

    } catch (err: any) {
      // erro de conexão (timeout / servidor off)
      if (err.isConnectionError) {
        setErrorMessage("Servidor indisponível no momento");
        setShowError(true);
        return;
      }

      // erro HTTP vindo da API (401, 400, etc)
      if (err.response) {
        setErrorMessage(err.response.data?.message || "Credenciais inválidas");
        setShowError(true);
        return;
      }

      // erro genérico
      setErrorMessage("Erro inesperado. Tente novamente.");
      setShowError(true);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      {/* TÍTULOS */}
      <Text style={styles.welcome}>Bem vindo!</Text>
      <Text style={styles.loginTitle}>LOGIN</Text>

      {/* FORM */}
      <View style={styles.form}>

        <Input
          placeholder="CPF"
          keyboardType="numeric"
          value={cpf}
          onChangeText={(text: string) => setCpf(formatCPF(text))}
          maxLength={14}
        />

        <Input
          placeholder="Senha"
          secure
          value={senha}
          onChangeText={setSenha}
        />

        {/* BOTÃO ENTRAR */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <Text style={styles.or}>ou</Text>

        {/* BOTÃO CADASTRAR */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

        {/* ESQUECI SENHA */}
        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text style={styles.forgot}>Esqueci minha senha</Text>
        </TouchableOpacity>

      </View>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 App Sicobem. Todos os direitos reservados.
        </Text>
        <Text style={styles.footerText}>
          Desenvolvido pela equipe WLL
        </Text>
      </View>

     <Popup
        visible={showError}
        title={errorMessage}
        buttonText="VOLTAR"
        color="red"
        onClose={() => setShowError(false)}
      />


    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
    paddingTop: 40,
    justifyContent: "space-between",
  },

  logoContainer: {
    marginBottom: 10,
  },

  logo: {
    width: 380,
    height: 220,
    resizeMode: "contain",
  },

  welcome: {
    fontSize: 16,
    color: "#333",
  },

  loginTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  form: {
    width: "85%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },

  button: {
    width: "100%",
    height: 42,
    backgroundColor: "#1E90FF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  or: {
    marginTop: 10,
    marginBottom: 5,
    color: "#555",
  },

  forgot: {
    marginTop: 10,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },

  footer: {
    marginTop: 30,
    backgroundColor: "#62CB18",
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },

  footerText: {
    color: "#FFF",
    fontSize: 12,
  },

});
