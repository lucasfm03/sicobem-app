import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function BemDetalhes() {
  const params = useLocalSearchParams();

  const [status, setStatus] = useState("Ativo");
  const [observacoes, setObservacoes] = useState("");

  // Converter parâmetros para string de forma segura
  const getParamAsString = (value: string | string[] | undefined, fallback: string) => {
    if (Array.isArray(value)) return value[0] || fallback;
    return value || fallback;
  };

  function handleSalvar() {
    alert("Bem atualizado com sucesso!");
    router.back();
  }

  return (
    <ScrollView style={styles.container}>

      {/* TOPO */}
      <View style={styles.topBar}>
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
      <Text style={styles.title}>DETALHES DO BEM</Text>

      {/* CARD */}
      <View style={styles.card}>

        {/* TOMBO */}
        <Text style={styles.label}>Tombo</Text>
        <TextInput
          style={styles.input}
          value={getParamAsString(params.tombo, "00-000000")}
          editable={false}
        />

        {/* DESCRIÇÃO */}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={getParamAsString(params.descricao, "Monitor Lenovo")}
          editable={false}
        />

        {/* CATEGORIA */}
        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          value={getParamAsString(params.categoria, "Monitores")}
          editable={false}
        />

        {/* SETOR ATUAL */}
        <Text style={styles.label}>Setor atual</Text>
        <TextInput
          style={styles.input}
          value={getParamAsString(params.setor, "Atendimento")}
          editable={false}
        />

        {/* STATUS DO BEM */}
        <Text style={styles.label}>Status do bem</Text>

        <View style={styles.statusContainer}>
          {/* ATIVO */}
          <TouchableOpacity
            style={[
              styles.statusButton,
              styles.statusGreen,
              status === "Ativo" && styles.statusSelected,
            ]}
            onPress={() => setStatus("Ativo")}
          >
            <Ionicons name="checkmark" size={18} color="#FFF" />
            <Text style={styles.statusText}>Ativo</Text>
          </TouchableOpacity>

          {/* NÃO ENCONTRADO */}
          <TouchableOpacity
            style={[
              styles.statusButton,
              styles.statusRed,
              status === "Não encontrado" && styles.statusSelected,
            ]}
            onPress={() => setStatus("Não encontrado")}
          >
            <Ionicons name="close" size={18} color="#FFF" />
            <Text style={styles.statusText}>Não encontrado</Text>
          </TouchableOpacity>

          {/* INSERVÍVEL */}
          <TouchableOpacity
            style={[
              styles.statusButton,
              styles.statusRed,
              status === "Inservível" && styles.statusSelected,
            ]}
            onPress={() => setStatus("Inservível")}
          >
            <Ionicons name="close" size={18} color="#FFF" />
            <Text style={styles.statusText}>Inservível</Text>
          </TouchableOpacity>
        </View>

        {/* OBSERVAÇÕES */}
        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={[styles.input, styles.observacaoInput]}
          placeholder="Adicionar observações"
          placeholderTextColor="#CCC"
          multiline
          value={observacoes}
          onChangeText={setObservacoes}
        />

        {/* BOTÃO SALVAR */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSalvar}
        >
          <Text style={styles.buttonText}>SALVAR</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    padding: 20,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  logo: {
    width: 220,
    height: 130,
    resizeMode: "contain",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
    color: "#333",
  },

  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 12,
    color: "#333",
    fontSize: 13,
  },

  statusContainer: {
    flexDirection: "column",
    gap: 10,
    marginTop: 10,
  },

  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },

  statusGreen: {
    backgroundColor: "#90EE90",
  },

  statusRed: {
    backgroundColor: "#FFB6C6",
  },

  statusSelected: {
    borderWidth: 2,
    borderColor: "#333",
  },

  statusText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 13,
  },

  observacaoInput: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#0A67B3",
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },

});