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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

 async function handleLogin() {
  if (!cpf || !senha) {
    setShowError(true);
    return;
  }

  try {
    const response = await api.post('/login', {
      cpf,
      senha,
    });

    const { token, usuario } = response.data;

    // salvar token
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('usuario', JSON.stringify(usuario));

    // ir para home
    router.replace("/(tabs)/home");

  } catch (err:any) {
    let message = "Erro ao realizar login";

    if (err.type === "connection") {
      message = err.message;
    } else if (err.response?.status === 401) {
      message = "CPF ou senha inválidos";
    } else if (err.response?.data?.erro) {
      message = err.response.data.erro;
    }

    setErrorMsg(message);
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
          value={cpf}
          onChangeText={setCpf}
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

      {/* POPUP DE ERRO */}
      <Popup
        visible={showError}
        title="ERRO NO LOGIN"
        description={errorMsg}
        buttonText="VOLTAR"
        color="red"
        onClose={() => setShowError(false)}
      />


    </ScrollView>
  );
}

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