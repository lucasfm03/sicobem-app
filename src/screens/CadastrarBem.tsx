import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function CadastrarBem() {

  const [tombo, setTombo] = useState("");
  const [origem, setOrigem] = useState("");
  const [categoria, setCategoria] = useState("");
  const [setor, setSetor] = useState("");
  const [valor, setValor] = useState("");
  const [usuario, setUsuario] = useState("");
  const [descricao, setDescricao] = useState("");

  function handleCadastrar() {

    if (!tombo || !origem || !categoria || !setor || !valor) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    alert("Bem cadastrado com sucesso!");
    router.back();
  }

  return (
    <ScrollView style={styles.container}>

      {/* TOPO */}
      <View style={styles.topBar}>

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>CADASTRO DE BENS</Text>

        <View style={{ width: 26 }} />

      </View>

      {/* TOMBO */}
      <Text style={styles.label}>Tombo *</Text>
      <TextInput
        placeholder="Ex: 01-000000"
        style={styles.input}
        value={tombo}
        onChangeText={setTombo}
      />

      {/* ORIGEM */}
      <Text style={styles.label}>Origem do tombo *</Text>
      <TextInput
        placeholder="Ex: SEAD, SEFAZ..."
        style={styles.input}
        value={origem}
        onChangeText={setOrigem}
      />

      {/* CATEGORIA */}
      <Text style={styles.label}>Categoria *</Text>
      <TouchableOpacity style={styles.select}>
        <Text style={styles.selectText}>
          {categoria || "Ex: Monitor, computador..."}
        </Text>
        <Ionicons name="chevron-down" size={18} />
      </TouchableOpacity>

      {/* SETOR */}
      <Text style={styles.label}>Setor atual *</Text>
      <TouchableOpacity style={styles.select}>
        <Text style={styles.selectText}>
          {setor || "Ex: Financeiro, adm..."}
        </Text>
        <Ionicons name="chevron-down" size={18} />
      </TouchableOpacity>

      {/* SITUAÇÃO */}
      <Text style={styles.label}>Situação</Text>

      <View style={styles.radioGroup}>
        <TouchableOpacity style={styles.radioItem}>
          <Ionicons name="radio-button-on" size={18} />
          <Text> Ativo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.radioItem}>
          <Ionicons name="radio-button-off" size={18} />
          <Text> Não encontrado</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.radioItem}>
          <Ionicons name="radio-button-off" size={18} />
          <Text> Inservível</Text>
        </TouchableOpacity>
      </View>

      {/* VALOR */}
      <Text style={styles.label}>Valor *</Text>
      <TextInput
        placeholder="Ex: R$ 1,00"
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      {/* USUÁRIO */}
      <Text style={styles.label}>Usuário atual</Text>
      <TextInput
        placeholder="Nome do usuário"
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
      />

      {/* DESCRIÇÃO */}
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        placeholder="Observações"
        style={[styles.input, { height: 90 }]}
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      {/* BOTÃO */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleCadastrar}
      >
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

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

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  label: {
    fontSize: 13,
    marginBottom: 4,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 12,
  },

  select: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectText: {
    color: "#999",
  },

  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  radioItem: {
    flexDirection: "row",
    alignItems: "center",
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
  },

});