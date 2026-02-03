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

export default function ForgotPassword() {
  return (
    <View style={styles.container}>

      {/* CONTEÚDO */}
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
        <Text style={styles.title}>RECUPERAÇÃO DE SENHA</Text>

        {/* CPF */}
        <Text style={styles.label}>Digite seu CPF:</Text>
        <Input placeholder="CPF" />

        {/* NOVA SENHA */}
        <Text style={styles.label}>Nova senha:</Text>
        <Input placeholder="Crie uma nova senha" secure />

        {/* CONFIRMAR SENHA */}
        <Text style={styles.label}>Confirmar senha:</Text>
        <Input placeholder="Repita a senha" secure />

        {/* BOTÃO */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ALTERAR SENHA</Text>
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
    paddingBottom: 40,
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
    marginBottom: 30,
  },

  label: {
    marginBottom: 4,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#1E90FF",
    height: 45,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
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