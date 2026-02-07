import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../components/Input";

export default function ForgotPassword() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView 
        scrollEnabled={true}
        contentContainerStyle={styles.scrollContent}
      >

        {/* TOPO */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#000" />
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        {/* TÍTULO */}
        <Text style={styles.title}>RECUPERAÇÃO DE SENHA</Text>

        {/* FORMULÁRIO */}
        <View style={styles.form}>

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

        </View>

      </ScrollView>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 App Sicobem. Todos os direitos reservados.{"\n"}
          Desenvolvido pela equipe WLL
        </Text>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },

  backButton: {
    position: "absolute",
    left: 20,
    top: 0,
    zIndex: 10,
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

  form: {
    width: "85%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "flex-start",
  },

  button: {
    backgroundColor: "#0A67B3",
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "70%",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
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