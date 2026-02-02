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

export default function Login() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.welcome}>Bem vindo!</Text>
      <Text style={styles.loginTitle}>LOGIN</Text>

      <View style={styles.form}>
        <Input placeholder="CPF" />
        <Input placeholder="Senha" secure />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <Text style={styles.or}>ou</Text>

        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 App Sicobem. Todos os direitos reservados.
        </Text>
        <Text style={styles.footerText}>
          Desenvolvido pela equipe WLL
        </Text>
      </View>
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
    width: 350,
    height: 280,
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

  buttonSecondary: {
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