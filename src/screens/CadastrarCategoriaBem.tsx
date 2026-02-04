import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function CadastrarCategoriaBem() {

  const [categoria, setCategoria] = useState("");

  function handleCadastrar() {
    if (!categoria.trim()) {
      alert("Informe a categoria de bem.");
      return;
    }

    alert("Categoria cadastrada com sucesso!");
    router.back();
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>

        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

      </View>

      {/* TÍTULO */}
      <Text style={styles.title}>
        CADASTRO DE CATEGORIA DE BEM
      </Text>

      {/* FORMULÁRIO */}
      <View style={styles.form}>

        <Text style={styles.label}>
          Adicione uma categoria de bem:
          <Text style={styles.required}> *</Text>
        </Text>

        <TextInput
          placeholder="Ex: Monitor, computador, mesa..."
          style={styles.input}
          value={categoria}
          onChangeText={setCategoria}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCadastrar}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

      </View>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 App Sicobem. Todos os direitos reservados
        </Text>
        <Text style={styles.footerText}>
          Desenvolvido pelos capangas do Alan
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingTop: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  logo: {
    width: 280,
    height: 120,
    resizeMode: "contain",
    marginLeft: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },

  form: {
    paddingHorizontal: 20,
  },

  label: {
    fontSize: 15,
    marginBottom: 8,
  },

  required: {
    color: "red",
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#1E90FF",
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  footer: {
    marginTop: "auto",
    backgroundColor: "#62CB18",
    paddingVertical: 12,
    alignItems: "center",
  },

  footerText: {
    color: "#FFF",
    fontSize: 12,
  },

});