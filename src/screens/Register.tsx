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

export default function Register() {
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
        <Text style={styles.label}>Nome completo</Text>
        <Input placeholder="Nome completo" />

        <Text style={styles.label}>CPF</Text>
        <Input placeholder="CPF" />

        <Text style={styles.label}>Email</Text>
        <Input placeholder="Email" />

        <Text style={styles.label}>Senha</Text>
        <Input placeholder="Crie uma senha" secure />

        <Text style={styles.label}>Confirmar senha</Text>
        <Input placeholder="Repita a senha" secure />

        {/* BOTÃO */}
        <TouchableOpacity style={styles.button}>
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