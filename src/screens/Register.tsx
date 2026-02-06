import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../components/Input";
import Popup from "../components/Popup";
import { api } from "../services/api";

/* ===================== */
/* FUNÇÕES AUXILIARES */
/* ===================== */

function formatCPF(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, "");

  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++)
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cleaned.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cleaned.substring(10, 11))) return false;

  return true;
}

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/* ===================== */
/* COMPONENTE */
/* ===================== */

export default function Register() {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleRegister() {

    if (!nome || !cpf || !email || !senha || !confirmarSenha) {
      setErrorMsg("Preencha todos os campos");
      setShowError(true);
      return;
    }

    if (!isValidCPF(cpf)) {
      setErrorMsg("CPF inválido");
      setShowError(true);
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMsg("Email inválido");
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
        cpf: cpf.replace(/\D/g, ""),
        email,
        senha,
      });

      // 🔥 FORÇA RE-RENDER DO POPUP
      setTimeout(() => {
        setShowSuccess(true);
      }, 100);

    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.erro || "Erro ao realizar cadastro"
      );
      setShowError(true);
    }
  }

  return (
    <View style={styles.container}>

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
          keyboardType="numeric"
          value={cpf}
          onChangeText={(text: string) => setCpf(formatCPF(text))}
        />

        <Input
          placeholder="Email"
          keyboardType="email-address"
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
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

        {/* LOGIN */}
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

      {/* POPUP */}
      <Popup
        visible={showError}
        title="ERRO NO CADASTRO"
        description={errorMsg}
        buttonText="OK"
        color="red"
        onClose={() => setShowError(false)}
      />

      <Popup
        visible={showSuccess}
        title="Cadastrado feito com sucesso"
        buttonText="Voltar para início"
        color="pink"
        onClose={() => {
          setShowSuccess(false);
          router.replace("/login");
        }}
      />

    </View>
  );
}

/* ===================== */
/* ESTILOS */
/* ===================== */

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
