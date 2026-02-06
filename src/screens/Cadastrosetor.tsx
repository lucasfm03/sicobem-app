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

export default function CadastroSetorScreen() {

  const [nome, setNome] = useState("");
  const [abreviacao, setAbreviacao] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isTokenError, setIsTokenError] = useState(false);

  async function handleCadastrar() {

    setShowError(false);
    setShowSuccess(false);

    if (!nome || !abreviacao) {
      setErrorMessage("Preencha todos os campos obrigatórios");
      setShowError(true);
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setErrorMessage(
          "Ocorreu um erro ao acessar esta página.\nCódigo: ERR-NOTTOK"
        );
        setIsTokenError(true);
        setShowError(true);
        return;
      }

      await api.post(
        "/setores",
        { nome, abreviacao },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTimeout(() => {
        setShowSuccess(true);
      }, 100);

    } catch (err: any) {

      setErrorMessage(
        err?.response?.data?.erro ||
        err?.message ||
        "Servidor indisponível no momento"
      );
      setShowError(true);

    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

      {/* Scroll ocupa a tela toda */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >

        {/* CONTEÚDO PRINCIPAL */}
        <View style={{ flex: 1 }}>

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

          <Text style={styles.title}>CADASTRO DE SETOR</Text>

          {/* FORM */}
          <View style={styles.form}>

            <Text style={styles.label}>
              Nome do setor <Text style={styles.required}>*</Text>
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex: Recursos Humanos"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>
              Abreviação <Text style={styles.required}>*</Text>
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex: RH"
              value={abreviacao}
              onChangeText={setAbreviacao}
              maxLength={10}
              autoCapitalize="characters"
            />

            <TouchableOpacity
              style={[
                styles.button,
                loading && { opacity: 0.7 },
              ]}
              onPress={handleCadastrar}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "SALVANDO..." : "CADASTRAR"}
              </Text>
            </TouchableOpacity>

          </View>

        </View>

        {/* RODAPÉ FIXADO */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 App Sicobem</Text>
          <Text style={styles.footerText}>
            Desenvolvido pelos capangas do Alan
          </Text>
        </View>

      </ScrollView>

      {/* POPUPS */}

      <Popup
        visible={showError}
        title="Erro"
        description={errorMessage}
        buttonText="OK"
        color="red"
        onClose={() => {
          setShowError(false);
          if (isTokenError) {
            setIsTokenError(false);
            router.replace("/login");
          }
        }}
      />

      <Popup
        visible={showSuccess}
        title="Setor cadastrado com sucesso"
        buttonText="Voltar para início"
        color="green"
        onClose={() => {
          setShowSuccess(false);
          router.replace("/home");
        }}
      />

    </KeyboardAvoidingView>
  );
}

/* =======================
   STYLES
======================= */
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

  /* LOGO MAIOR */
  logo: {
    width: 380,
    height: 220,
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
    backgroundColor: "#62CB18",
    padding: 12,
    alignItems: "center",
  },

  footerText: {
    color: "#FFF",
    fontSize: 12,
  },

});

