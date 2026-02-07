import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Popup from "../../src/components/Popup";
import { api } from "../../src/services/api";

export default function EditarSetor() {
  const { idSetor } = useLocalSearchParams();
  const [nome, setNome] = useState("");
  const [abreviacao, setAbreviacao] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    carregarSetor();
  }, [idSetor]);

  async function carregarSetor() {
    try {
      if (!idSetor) {
        setErrorMessage("ID do setor não fornecido");
        setShowError(true);
        return;
      }

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setErrorMessage("Token não encontrado");
        setShowError(true);
        return;
      }

      const response = await api.get(`/setores/${idSetor}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNome(response.data.nome || "");
      setAbreviacao(response.data.abreviacao || "");
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.erro || 
        "Não foi possível carregar os dados do setor"
      );
      setShowError(true);
    }
  }

  async function salvarAlteracoes() {
    if (!nome.trim()) {
      setErrorMessage("Nome do setor é obrigatório");
      setShowError(true);
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setErrorMessage("Token não encontrado");
        setShowError(true);
        return;
      }

      await api.put(`/setores/${idSetor}`, {
        nome: nome.trim(),
        abreviacao: abreviacao.trim(),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowSuccess(true);
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.erro || "Erro ao atualizar o setor");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* TOPO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>EDITAR SETOR</Text>

        <View style={{ width: 26 }} />
      </View>

      {/* FORM */}
      <View style={styles.form}>

        <Text style={styles.label}>Nome do setor:</Text>
        <TextInput
          placeholder="Nome completo do setor"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          editable={!loading}
        />

        <Text style={styles.label}>Abreviação:</Text>
        <TextInput
          placeholder="Abreviação"
          style={styles.input}
          value={abreviacao}
          onChangeText={setAbreviacao}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={salvarAlteracoes}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "SALVANDO..." : "SALVAR"}
          </Text>
        </TouchableOpacity>

      </View>

      <Popup
        visible={showError}
        title="Erro"
        description={errorMessage}
        buttonText="OK"
        color="red"
        onClose={() => setShowError(false)}
      />

      <Popup
        visible={showSuccess}
        title="Sucesso"
        description="Setor atualizado com sucesso!"
        buttonText="OK"
        color="green"
        onClose={() => {
          setShowSuccess(false);
          router.replace("/home");
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 20,
  },

  logo: {
    width: 380,
    height: 220,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  form: {
    marginTop: 10,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#0B5ED7",
    padding: 14,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },

  buttonDisabled: {
    backgroundColor: "#CCCCCC",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  }

});