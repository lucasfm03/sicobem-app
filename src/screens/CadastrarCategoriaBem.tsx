import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Popup from "../components/Popup";
import { api } from "../services/api";

export default function CadastrarCategoriaBem() {

  const [categoria, setCategoria] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupColor, setPopupColor] = useState<"red" | "green">("green");

  async function handleCadastrar() {
    if (!categoria.trim()) {
      setPopupMessage("Informe a categoria de bem.");
      setPopupColor("red");
      setShowPopup(true);
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setPopupMessage("Erro ao acessar o servidor");
        setPopupColor("red");
        setShowPopup(true);
        return;
      }

      await api.post(
        "/categorias",
        { nome: categoria },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPopupMessage("Categoria cadastrada com sucesso!");
      setPopupColor("green");
      setShowPopup(true);
    } catch (err: any) {
      setPopupMessage(
        err?.response?.data?.erro || "Erro ao cadastrar categoria"
      );
      setPopupColor("red");
      setShowPopup(true);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >

        {/* CONTEÚDO PRINCIPAL */}
        <View style={{ flex: 1 }}>

          {/* HEADER */}
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

        </View>

        {/* RODAPÉ FIXADO */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 App Sicobem. Todos os direitos reservados
          </Text>
          <Text style={styles.footerText}>
            Desenvolvido pelos capangas do Alan
          </Text>
        </View>

      </ScrollView>

      <Popup
        visible={showPopup}
        title={popupMessage}
        buttonText={popupColor === "green" ? "VOLTAR" : "FECHAR"}
        color={popupColor}
        onClose={() => {
          setShowPopup(false);
          if (popupColor === "green") {
            router.back();
          }
        }}
      />

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 40,
  },

  /* LOGO MAIOR */
  logo: {
    width: 380,
    height: 220,
    resizeMode: "contain",
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
    backgroundColor: "#62CB18",
    paddingVertical: 12,
    alignItems: "center",
  },

  footerText: {
    color: "#FFF",
    fontSize: 12,
  },

});
