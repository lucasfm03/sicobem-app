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

export default function CadastroSetorScreen() {
  return (
    <View style={styles.container}>

      {/* TOPO */}
      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>

        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

        <View style={{ width: 26 }} />

      </View>

      {/* TÍTULO */}
      <Text style={styles.title}>CADASTRO DE SETOR</Text>

      {/* FORM */}
      <View style={styles.form}>

        <Text style={styles.label}>
          Nome do setor <Text style={styles.required}>*</Text>
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: Recursos Humanos"
        />

        <Text style={styles.label}>
          Abreviação <Text style={styles.required}>*</Text>
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: RH"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

      </View>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 App Sicobem
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
    backgroundColor: "#F4F4F4",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 40,
  },

  logo: {
    width: 220,
    height: 120,
    resizeMode: "contain",
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },

  form: {
    paddingHorizontal: 20,
  },

  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },

  required: {
    color: "red",
  },

  input: {
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#CCC",
  },

  button: {
    backgroundColor: "#2E6BE6",
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

  footer: {
    marginTop: "auto",
    backgroundColor: "#62CB18",
    padding: 12,
    alignItems: "center",
  },

  footerText: {
    color: "#FFF",
    fontSize: 12,
  },

});