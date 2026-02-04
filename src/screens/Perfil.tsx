import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Perfil() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  function handleAtualizar() {
    if (!nome || !email) {
      alert("Preencha todos os campos.");
      return;
    }

    alert("Perfil atualizado com sucesso!");
  }

  return (
    <View style={styles.container}>

      {/* BOTÃO SAIR */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Ionicons name="log-out-outline" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      {/* LOGO */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* TÍTULO */}
      <Text style={styles.title}>Perfil</Text>

      {/* ÍCONE CENTRAL */}
      <View style={styles.avatar}>
        <Ionicons name="people" size={70} color="#999" />
      </View>

      {/* FORMULÁRIO */}
      <View style={styles.form}>

        <Text style={styles.label}>Nome completo</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={18} color="#777" />
          <TextInput
            placeholder="Nome completo"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <Text style={styles.label}>Email</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={18} color="#777" />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleAtualizar}
        >
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    paddingTop: 40,
  },

  /* LOGOUT */
  logoutContainer: {
    position: "absolute",
    top: 45,
    right: 20,
    zIndex: 10,
  },

  logo: {
    width: 380,
    height: 220,
    resizeMode: "contain",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    marginBottom: 20,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#E6E6E6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  form: {
    width: "85%",
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    marginLeft: 8,
  },

  button: {
    backgroundColor: "#0A67B3",
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

});