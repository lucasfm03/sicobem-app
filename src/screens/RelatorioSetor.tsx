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

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function RelatorioSetor() {

  const [formato, setFormato] = useState<"pdf" | "excel" | null>(null);

  const [setoresSelecionados, setSetoresSelecionados] = useState<string[]>([]);

  const setores = [
    "Atendimento Previdenciário",
    "Diretoria Administrativa e Financeira",
    "Diretoria de Atendimento e Cadastro",
    "Gestão de Pessoas",
    "Diretoria de Fundo de Previdência",
    "Inativos"
  ];

  function toggleSetor(nome: string) {
    if (setoresSelecionados.includes(nome)) {
      setSetoresSelecionados(
        setoresSelecionados.filter(item => item !== nome)
      );
    } else {
      setSetoresSelecionados([...setoresSelecionados, nome]);
    }
  }

  function limparFiltros() {
    setFormato(null);
    setSetoresSelecionados([]);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>

      {/* LOGOUT */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      {/* LOGO */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* TÍTULO */}
      <Text style={styles.title}>RELATÓRIOS</Text>

      {/* FORMATO */}
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>SELECIONE A OPÇÃO</Text>

        <View style={styles.radioGroup}>

          {/* PDF */}
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setFormato("pdf")}
          >

            <Ionicons name="document-text" size={22} color="#2E6BE6" />

            <Text style={styles.radioText}>PDF</Text>

            <View
              style={[
                styles.radioCircle,
                formato === "pdf" && styles.radioSelected
              ]}
            />

          </TouchableOpacity>

          {/* EXCEL */}
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setFormato("excel")}
          >

            <Ionicons name="grid" size={22} color="#2E6BE6" />

            <Text style={styles.radioText}>EXCEL</Text>

            <View
              style={[
                styles.radioCircle,
                formato === "excel" && styles.radioSelected
              ]}
            />

          </TouchableOpacity>

        </View>

      </View>

      {/* SETORES */}
      <View style={styles.card}>

        <View style={styles.headerRow}>
          <Ionicons name="business" size={22} color="#62CB18" />
          <Text style={styles.cardTitle}>Setor</Text>
        </View>

        <ScrollView scrollEnabled={true}>

          {setores.map(setor => (

            <TouchableOpacity
              key={setor}
              style={styles.checkbox}
              onPress={() => toggleSetor(setor)}
            >

              <Ionicons
                name={
                  setoresSelecionados.includes(setor)
                    ? "checkbox"
                    : "square-outline"
                }
                size={22}
                color="#2E6BE6"
              />

              <Text style={styles.checkText}>{setor}</Text>

            </TouchableOpacity>

          ))}

        </ScrollView>

      </View>

      {/* BOTÕES */}
      <View style={styles.actions}>

        <TouchableOpacity
          style={styles.clearBtn}
          onPress={limparFiltros}
        >
          <Text style={styles.clearText}>LIMPAR FILTROS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.generateBtn}>
          <Text style={styles.generateText}>GERAR RELATÓRIO</Text>
        </TouchableOpacity>

      </View>

    </View>

    </KeyboardAvoidingView>
  );
}

/* ===================== */
/* ESTILOS */
/* ===================== */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },

  logoutContainer: {
    position: "absolute",
    top: 45,
    left: 20,
    zIndex: 10,
  },

  logo: {
    width: 380,
    height: 220,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  /* RADIO */

  radioGroup: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
  },

  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#2E6BE6",
  },

  radioSelected: {
    backgroundColor: "#2E6BE6",
  },

  radioText: {
    fontSize: 15,
    fontWeight: "500",
  },

  /* LISTA */

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  checkText: {
    fontSize: 15,
  },

  /* AÇÕES */

  actions: {
    marginTop: "auto",
  },

  clearBtn: {
    backgroundColor: "#DDD",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },

  clearText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },

  generateBtn: {
    backgroundColor: "#2E6BE6",
    padding: 14,
    borderRadius: 8,
  },

  generateText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF",
  },

});
