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
import { api } from "../services/api";

export default function Register() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleRegister() {
    if (!nome || !cpf || !email || !senha || !confirmarSenha) {
      setErrorMsg("Preencha todos os campos");
      setShowError(true);
      return;
    }

    if (senha !== confirmarSenha) {
      setErrorMsg("As senhas não coincidem");
      setShowError(true);
      return;
    }

    try {
      await api.post("/cadastro", {
        nome,
        cpf,
        email,
        senha,
      });

      // sucesso → volta pro login
      router.replace("/login");

    } catch (err) {
      setErrorMsg(
        err.response?.data?.erro || "Erro ao realizar cadastro"
      );
      setShowError(true);
    }
  }


  return (
    <View style={styles.container}>

      {/* CONTEÚDO COM SCROLL */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* TOPO */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        {/* TÍTULO */}
        <Text style={styles.title}>CADASTRO</Text>

        {/* FORMULÁRIO */}
        <Input
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
        />

        <Input
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
        />

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Crie uma senha"
          secure
          value={senha}
          onChangeText={setSenha}
        />

        <Input
          placeholder="Repita a senha"
          secure
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        {/* BOTÃO */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

        {/* LINK LOGIN */}
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginLink}>
            Já tem uma conta? <Text style={styles.login}>Login</Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 App Sicobem. Todos os direitos reservados.{"\n"}
          Desenvolvido pela equipe WLL
        </Text>
      </View>

    <Popup
      visible={showError}
      title="ERRO NO CADASTRO"
      description={errorMsg}
      buttonText="OK"
      color="red"
      onClose={() => setShowError(false)}
    />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
  },

  content: {
    padding: 24,
    flexGrow: 1,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  back: {
    position: "absolute",
    left: 0,
    fontSize: 28,
  },

  logo: {
    width: 380,
    height: 220,
    resizeMode: "contain",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  label: {
    marginBottom: 4,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#1E90FF",
    height: 45,
    width: 120,
    marginHorizontal: "auto",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  loginLink: {
    textAlign: "center",
    marginTop: 16,
  },

  login: {
    color: "#1E90FF",
    fontWeight: "bold",
  },

  footer: {
    backgroundColor: "#62CB18",
    padding: 12,
  },

  footerText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
  },
});